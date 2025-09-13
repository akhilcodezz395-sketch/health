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

// Toggle mock mode with an env variable (add USE_MOCK=true in .env.local if needed)
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// Correct Gemini endpoint
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

// Function to analyze symptoms using Gemini API (or mock if enabled)
export const analyzeSymptoms = async (symptoms: string): Promise<SymptomAnalysisResult> => {
  if (USE_MOCK) {
    console.log("⚡ Using mock response instead of Gemini for symptoms:", symptoms);
    return mockSymptomAnalysis(symptoms);
  }

  try {
    console.log("Analyzing symptoms:", symptoms);

    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // move your key to .env
    if (!API_KEY) {
      throw new Error("Gemini API key is missing. Set NEXT_PUBLIC_GEMINI_API_KEY in env.");
    }

    const prompt = `A patient is experiencing the following symptoms: ${symptoms}.
Provide a detailed medical analysis with the following structure:
{
  "possibleConditions": [
    { "name": "", "probability": "", "description": "" }
  ],
  "recommendations": [""],
  "suggestedMedicines": [
    { "name": "", "purpose": "" }
  ]
}
Do not include any text outside of this JSON.`

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        // 👇 ensures Gemini only outputs JSON
        responseMimeType: "application/json",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("Gemini API response:", data);

    if (!data.candidates?.length) {
      throw new Error("Invalid response: No candidates returned");
    }

    // Parse directly since we forced JSON output
    const parsedResponse: SymptomAnalysisResult = JSON.parse(
      data.candidates[0].content.parts[0].text
    );

    return parsedResponse;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    toast({
      variant: "destructive",
      title: "Analysis failed",
      description: "Failed to analyze your symptoms. Showing fallback advice."
    });

    return provideFallbackResponse(symptoms);
  }
};

// ---------------- MOCK + FALLBACK ----------------

// Mock for development/testing
const mockSymptomAnalysis = (symptoms: string): SymptomAnalysisResult => {
  return {
    possibleConditions: [
      {
        name: "Common Cold",
        probability: "High",
        description: "A viral infection causing cough, mild fever, and fatigue."
      },
      {
        name: "Seasonal Allergy",
        probability: "Medium",
        description: "Triggered by pollen or dust, with sneezing and watery eyes."
      }
    ],
    recommendations: [
      "Stay hydrated and rest",
      "Monitor your temperature daily",
      "Use a humidifier to ease congestion",
      "Consult a doctor if symptoms persist beyond 7 days"
    ],
    suggestedMedicines: [
      { name: "Paracetamol", purpose: "Fever and pain relief" },
      { name: "Cetirizine", purpose: "Relieves allergy symptoms" }
    ]
  };
};

// Fallback if API fails
const provideFallbackResponse = (symptoms: string): SymptomAnalysisResult => {
  const hasFever = /fever|temperature|chills/i.test(symptoms);
  const hasCough = /cough|chest/i.test(symptoms);

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
      "Consult with a healthcare provider for proper diagnosis"
    ],
    suggestedMedicines: [
      { name: "Acetaminophen (Tylenol)", purpose: "For pain relief and fever reduction" }
    ]
  };

  if (hasFever) {
    result.possibleConditions.push({
      name: "Viral Infection",
      probability: "Medium",
      description: "An infection that may include fever, fatigue, and body aches."
    });
  }

  return result;
};
