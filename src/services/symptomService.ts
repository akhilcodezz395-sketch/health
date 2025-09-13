
import { toast } from "@/hooks/use-toast";

interface SymptomAnalysisResult {
  possibleConditions: Array<{ 
    name: string; 
    probability: string; 
    description: string;
  }>;
  recommendations: string[];
  suggestedMedicines: Array<{
    name: string;
    purpose: string;
  }>;
}

// Function to analyze symptoms using Gemini API
export const analyzeSymptoms = async (symptoms: string): Promise<SymptomAnalysisResult> => {
  try {
    // Log the symptoms for debugging
    console.log("Analyzing symptoms:", symptoms);
    
    const API_KEY = "AIzaSyDJl02dS2jyepfYK9XaUeLowoX7CBjEPuw";
    // Updated to use the correct API version
    const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
    
    // Create the prompt for Gemini
    const prompt = `A patient is experiencing the following symptoms: ${symptoms}. 
    Provide a detailed medical analysis with the following structure:
    1. Possible Conditions: List 2-4 potential medical conditions that match these symptoms. For each condition include:
       - Name of the condition
       - Probability (High, Medium, or Low)
       - Brief description (1-2 sentences)
    2. Recommendations: Provide 3-5 specific recommendations or next steps
    3. Suggested Medicines: List 2-3 over-the-counter medications that might help with these symptoms, including:
       - Name of the medicine
       - Purpose/what symptoms it addresses
    Format your response as a JSON object with these exact fields: "possibleConditions" (array of objects with "name", "probability", "description"), "recommendations" (array of strings), "suggestedMedicines" (array of objects with "name", "purpose").
    Do not include any markdown, explanations, or text outside of the JSON structure.`;

    // Make the API request
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API response error:", errorText);
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log("Gemini API response:", data);
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error("No candidates in response");
      throw new Error("Invalid response from API: No candidates returned");
    }
    
    // Extract the text content from Gemini response
    const responseText = data.candidates[0].content.parts[0].text;
    console.log("Response text:", responseText);
    
    // Parse the JSON response
    let parsedResponse;
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        responseText.match(/\{[\s\S]*\}/);
      
      const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : responseText;
      console.log("Attempting to parse:", jsonStr);
      parsedResponse = JSON.parse(jsonStr);
      
      // Validate and ensure the response has the expected structure
      if (!parsedResponse.possibleConditions || 
          !parsedResponse.recommendations || 
          !parsedResponse.suggestedMedicines) {
        console.warn("Response missing expected fields, extracting structured data");
        // If missing fields, generate a structured response from text
        parsedResponse = extractStructuredData(responseText);
      }
    } catch (e) {
      console.error("Error parsing Gemini response:", e);
      // Fallback to structured extraction
      parsedResponse = extractStructuredData(responseText);
    }
    
    console.log("Parsed response:", parsedResponse);
    return parsedResponse;
    
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    toast({
      variant: "destructive",
      title: "Analysis failed",
      description: "Failed to analyze your symptoms. Please try again later."
    });
    
    // In case of error, return a fallback response
    return provideFallbackResponse(symptoms);
  }
};

// Function to extract structured data from unstructured text response
const extractStructuredData = (text: string): SymptomAnalysisResult => {
  console.log("Extracting structured data from:", text);
  const result: SymptomAnalysisResult = {
    possibleConditions: [],
    recommendations: [],
    suggestedMedicines: []
  };
  
  try {
    // Look for possible conditions section
    const conditionsMatch = text.match(/Possible Conditions:?([\s\S]*?)(?:Recommendations|Suggested Medicines|$)/i);
    if (conditionsMatch && conditionsMatch[1]) {
      const conditionsText = conditionsMatch[1];
      console.log("Conditions text found:", conditionsText);
      
      // Extract conditions using pattern matching
      const conditionMatches = Array.from(conditionsText.matchAll(/(?:^|\n)[\d\s-]*([^:\n]+)(?::|-)?\s*(?:(High|Medium|Low)\s*(?:probability|confidence))?[:\s-]*(.*?)(?=(?:\n[\d\s-]*[^:\n]+:|$))/gi));
      
      for (const match of conditionMatches) {
        const name = match[1]?.trim();
        let probability = match[2]?.trim() || "Medium";
        let description = match[3]?.trim();
        
        if (name) {
          // If probability is not in the expected format, extract it from the description
          if (!["High", "Medium", "Low"].includes(probability)) {
            const probMatch = description?.match(/(High|Medium|Low)\s*(?:probability|confidence|likelihood)/i);
            if (probMatch) {
              probability = probMatch[1];
              description = description.replace(probMatch[0], "").trim();
            } else {
              probability = "Medium";
            }
          }
          
          result.possibleConditions.push({
            name,
            probability,
            description: description || "No description provided"
          });
        }
      }
    }
    
    // Look for recommendations section
    const recommendationsMatch = text.match(/Recommendations:?([\s\S]*?)(?:Suggested Medicines|$)/i);
    if (recommendationsMatch && recommendationsMatch[1]) {
      const recommendations = recommendationsMatch[1]
        .split(/\n+/)
        .map(line => line.replace(/^[\d\s-]*/, "").trim())
        .filter(line => line.length > 5); // Filter out short or empty lines
        
      result.recommendations = recommendations;
    }
    
    // Look for suggested medicines section
    const medicinesMatch = text.match(/Suggested Medicines:?([\s\S]*?)(?:$)/i);
    if (medicinesMatch && medicinesMatch[1]) {
      const medicinesText = medicinesMatch[1];
      
      // Extract medicines using pattern matching
      const medicineMatches = Array.from(medicinesText.matchAll(/(?:^|\n)[\d\s-]*([^:\n]+)(?::|-)?\s*(.*?)(?=(?:\n[\d\s-]*[^:\n]+:|$))/gi));
      
      for (const match of medicineMatches) {
        const name = match[1]?.trim();
        const purpose = match[2]?.trim();
        
        if (name && name.length > 1) {
          result.suggestedMedicines.push({
            name,
            purpose: purpose || "Symptom relief"
          });
        }
      }
    }
    
    // Ensure we have at least minimum content
    if (result.possibleConditions.length === 0) {
      result.possibleConditions.push({
        name: "Unspecified Condition",
        probability: "Medium",
        description: "The AI was unable to identify specific conditions from your symptoms."
      });
    }
    
    if (result.recommendations.length === 0) {
      result.recommendations.push(
        "Consult with a healthcare provider for proper diagnosis",
        "Rest and stay hydrated",
        "Monitor your symptoms closely"
      );
    }
    
    if (result.suggestedMedicines.length === 0) {
      result.suggestedMedicines.push({
        name: "Acetaminophen (Tylenol)",
        purpose: "For pain relief and fever reduction"
      });
    }
    
    return result;
  } catch (e) {
    console.error("Error extracting structured data:", e);
    return provideFallbackResponse("");
  }
};

// Fallback response in case of API failure
const provideFallbackResponse = (symptoms: string): SymptomAnalysisResult => {
  // Basic symptom patterns for fallback
  const hasFever = /fever|temperature|hot|chills/i.test(symptoms);
  const hasCough = /cough|phlegm|chest/i.test(symptoms);
  const hasHeadache = /headache|head pain|migraine/i.test(symptoms);
  const hasPain = /pain|ache|hurt|sore/i.test(symptoms);
  
  const result: SymptomAnalysisResult = {
    possibleConditions: [
      {
        name: "Common Cold",
        probability: hasCough ? "Medium" : "Low",
        description: "A viral infection affecting the upper respiratory tract."
      }
    ],
    recommendations: [
      "Rest and stay hydrated",
      "Monitor your symptoms closely",
      "Consult with a healthcare provider for proper diagnosis",
      "Take over-the-counter medication as needed for symptom relief"
    ],
    suggestedMedicines: [
      {
        name: "Acetaminophen (Tylenol)",
        purpose: "For pain relief and fever reduction"
      }
    ]
  };
  
  if (hasFever) {
    result.possibleConditions.push({
      name: "Viral Infection",
      probability: "Medium",
      description: "An infection caused by a virus that may include fever, fatigue, and body aches."
    });
    
    result.suggestedMedicines.push({
      name: "Ibuprofen (Advil)",
      purpose: "For fever reduction and inflammation"
    });
  }
  
  if (hasHeadache) {
    result.possibleConditions.push({
      name: "Tension Headache",
      probability: "Medium",
      description: "A common headache characterized by mild to moderate pain often described as feeling like a tight band around the head."
    });
  }
  
  return result;
};
