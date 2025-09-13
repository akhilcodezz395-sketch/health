
import { supabase } from "@/integrations/supabase/client";

// Define the types for medicines
export interface MedicineBasic {
  id: string;
  name: string;
  manufacturer?: string;
  category?: string;
  form?: string;
  price: number;
  description?: string;
}

export interface MedicineDetailed extends MedicineBasic {
  id: string;
  dosage?: string;
  sideEffects?: string[];
  precautions?: string;
  price: number;
  alternatives?: Array<{ name: string; price: number }>;
  purpose?: string;
  usage?: string;
  warnings?: string[];
  rxcui?: string;
}

// Mock medicines data for fallback
const mockMedicines: MedicineDetailed[] = [
  {
    id: "1",
    name: "Paracetamol",
    manufacturer: "GSK",
    category: "Pain Relief",
    form: "Tablet",
    price: 45,
    description: "Common pain reliever and fever reducer.",
    dosage: "500-1000mg every 4-6 hours as needed, not exceeding 4g per day.",
    sideEffects: ["Nausea", "Rash", "Liver damage (with overdose)"],
    precautions: "Use with caution in patients with liver disease. Avoid alcohol consumption.",
    alternatives: [
      { name: "Ibuprofen", price: 60 },
      { name: "Aspirin", price: 30 }
    ]
  },
  {
    id: "2",
    name: "Amoxicillin",
    manufacturer: "Pfizer",
    category: "Antibiotic",
    form: "Capsule",
    price: 120,
    description: "Used to treat bacterial infections.",
    dosage: "250-500mg every 8 hours for 7-10 days.",
    sideEffects: ["Diarrhea", "Nausea", "Allergic reactions"],
    precautions: "Complete the full course of treatment. May reduce the effectiveness of oral contraceptives.",
    alternatives: [
      { name: "Azithromycin", price: 150 },
      { name: "Ciprofloxacin", price: 180 }
    ]
  },
  {
    id: "3",
    name: "Loratadine",
    manufacturer: "Bayer",
    category: "Antihistamine",
    form: "Tablet",
    price: 30,
    description: "Relieves allergy symptoms such as sneezing, runny nose, and itchy eyes.",
    dosage: "10mg once daily.",
    sideEffects: ["Drowsiness", "Dry mouth"],
    precautions: "Avoid alcohol consumption. Use with caution when driving or operating machinery.",
    alternatives: [
      { name: "Cetirizine", price: 35 },
      { name: "Fexofenadine", price: 40 }
    ]
  },
  {
    id: "4",
    name: "Omeprazole",
    manufacturer: "AstraZeneca",
    category: "Proton Pump Inhibitor",
    form: "Capsule",
    price: 90,
    description: "Reduces stomach acid production, used to treat heartburn and acid reflux.",
    dosage: "20mg once daily before breakfast.",
    sideEffects: ["Headache", "Diarrhea", "Abdominal pain"],
    precautions: "Long-term use may increase the risk of bone fractures. Consult your doctor.",
    alternatives: [
      { name: "Pantoprazole", price: 95 },
      { name: "Esomeprazole", price: 110 }
    ]
  },
  {
    id: "5",
    name: "Metformin",
    manufacturer: "Merck",
    category: "Antidiabetic",
    form: "Tablet",
    price: 70,
    description: "Helps control blood sugar levels in patients with type 2 diabetes.",
    dosage: "500mg twice daily with meals.",
    sideEffects: ["Nausea", "Diarrhea", "Loss of appetite"],
    precautions: "Monitor kidney function regularly. Avoid excessive alcohol consumption.",
    alternatives: [
      { name: "Glimepiride", price: 80 },
      { name: "Sitagliptin", price: 130 }
    ]
  },
  {
    id: "6",
    name: "Atorvastatin",
    manufacturer: "Novartis",
    category: "Statin",
    form: "Tablet",
    price: 110,
    description: "Lowers cholesterol levels and reduces the risk of heart disease.",
    dosage: "10-80mg once daily, usually in the evening.",
    sideEffects: ["Muscle pain", "Liver abnormalities"],
    precautions: "Monitor liver function regularly. Avoid grapefruit juice.",
    alternatives: [
      { name: "Rosuvastatin", price: 140 },
      { name: "Simvastatin", price: 90 }
    ]
  },
  {
    id: "7",
    name: "Amlodipine",
    manufacturer: "Sun Pharma",
    category: "Calcium Channel Blocker",
    form: "Tablet",
    price: 55,
    description: "Treats high blood pressure and chest pain (angina).",
    dosage: "5-10mg once daily.",
    sideEffects: ["Swelling in ankles", "Headache", "Dizziness"],
    precautions: "Monitor blood pressure regularly. Avoid sudden changes in posture.",
    alternatives: [
      { name: "Nifedipine", price: 60 },
      { name: "Diltiazem", price: 75 }
    ]
  },
  {
    id: "8",
    name: "Levothyroxine",
    manufacturer: "Abbott",
    category: "Thyroid Hormone",
    form: "Tablet",
    price: 65,
    description: "Replaces or provides thyroid hormone to treat hypothyroidism.",
    dosage: "Varies depending on individual needs; usually taken once daily on an empty stomach.",
    sideEffects: ["Anxiety", "Weight loss", "Increased heart rate"],
    precautions: "Take on an empty stomach. Monitor thyroid hormone levels regularly.",
    alternatives: [
      { name: "Liothyronine", price: 80 }
    ]
  },
  {
    id: "9",
    name: "Salbutamol",
    manufacturer: "Cipla",
    category: "Bronchodilator",
    form: "Inhaler",
    price: 100,
    description: "Relaxes muscles in the airways and improves breathing in asthma and COPD.",
    dosage: "1-2 puffs every 4-6 hours as needed.",
    sideEffects: ["Tremors", "Increased heart rate", "Nervousness"],
    precautions: "Use as directed. Overuse may lead to decreased effectiveness.",
    alternatives: [
      { name: "Ipratropium", price: 120 }
    ]
  },
  {
    id: "10",
    name: "Ranitidine",
    manufacturer: "Zantac",
    category: "H2 Receptor Antagonist",
    form: "Tablet",
    price: 40,
    description: "Reduces stomach acid production, used to treat ulcers and acid reflux.",
    dosage: "150mg twice daily or 300mg once daily.",
    sideEffects: ["Headache", "Dizziness", "Constipation"],
    precautions: "Consult your doctor before long-term use.",
    alternatives: [
      { name: "Famotidine", price: 45 }
    ]
  },
  {
    id: "11",
    name: "Cetirizine",
    manufacturer: "Johnson & Johnson",
    category: "Antihistamine",
    form: "Tablet",
    price: 35,
    description: "Relieves allergy symptoms such as itching, sneezing, and runny nose.",
    dosage: "10mg once daily.",
    sideEffects: ["Drowsiness", "Dry mouth"],
    precautions: "Avoid alcohol consumption. Use with caution when driving or operating machinery.",
    alternatives: [
      { name: "Loratadine", price: 30 },
      { name: "Fexofenadine", price: 40 }
    ]
  },
  {
    id: "12",
    name: "Diazepam",
    manufacturer: "Roche",
    category: "Benzodiazepine",
    form: "Tablet",
    price: 80,
    description: "Used to treat anxiety, muscle spasms, and seizures.",
    dosage: "Varies depending on the condition; usually taken 2-4 times daily.",
    sideEffects: ["Drowsiness", "Dizziness", "Confusion"],
    precautions: "Avoid alcohol consumption. May be habit-forming. Use with caution when driving or operating machinery.",
    alternatives: [
      { name: "Alprazolam", price: 90 },
      { name: "Lorazepam", price: 75 }
    ]
  }
];

// Type for RxNorm API response
interface RxNormResponse {
  idGroup?: {
    rxnormId?: string[];
  };
  relatedGroup?: {
    conceptGroup?: Array<{
      tty?: string;
      conceptProperties?: Array<{
        rxcui?: string;
        name?: string;
        synonym?: string;
      }>;
    }>;
  };
}

// Type for OpenFDA API response
interface OpenFDAResponse {
  results?: Array<{
    openfda?: {
      brand_name?: string[];
      generic_name?: string[];
      manufacturer_name?: string[];
      product_type?: string[];
      route?: string[];
      rxcui?: string[];
    };
    purpose?: string[];
    dosage_and_administration?: string[];
    warnings?: string[];
    adverse_reactions?: string[];
    drug_interactions?: string[];
    indications_and_usage?: string[];
    active_ingredient?: string[];
  }>;
  error?: {
    code: string;
    message: string;
  };
}

// Cache for search results to improve performance
const searchCache: Record<string, MedicineDetailed[]> = {};

// Function to search medicines by name
export const searchMedicines = async (
  query: string
): Promise<MedicineDetailed[]> => {
  try {
    console.log("Searching medicines with query:", query);

    if (query.trim() === "") {
      return [];
    }

    // Check cache first
    if (searchCache[query.toLowerCase()]) {
      console.log(`Using cached results for "${query}"`);
      return searchCache[query.toLowerCase()];
    }

    // First try using the API search
    const apiResults = await searchMedicinesFromAPI(query);
    
    // If API search fails or returns no results, fall back to mock data
    let results = apiResults.length > 0 
      ? apiResults 
      : mockMedicines.filter(medicine =>
          medicine.name.toLowerCase().includes(query.toLowerCase())
        );

    console.log(`Found ${results.length} medicines matching "${query}"`);
    
    // Cache results
    searchCache[query.toLowerCase()] = results;
    
    return results;
  } catch (error) {
    console.error("Error searching medicines:", error);
    
    // Fallback to mock data on error
    const fallbackResults = mockMedicines.filter(medicine =>
      medicine.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return fallbackResults;
  }
};

// Function to search medicines using RxNorm and OpenFDA APIs
export const searchMedicinesFromAPI = async (
  query: string
): Promise<MedicineDetailed[]> => {
  try {
    // Step 1: Search RxNorm for the medicine name to get RxCUI
    const rxNormUrl = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(query)}`;
    const rxNormResponse = await fetch(rxNormUrl);
    const rxNormData = await rxNormResponse.json() as RxNormResponse;
    
    console.log("RxNorm API response:", rxNormData);
    
    let rxcui: string | undefined;
    if (rxNormData.idGroup?.rxnormId?.length) {
      rxcui = rxNormData.idGroup.rxnormId[0];
    }
    
    // Step 2: Try OpenFDA with brand name or generic name
    const results: MedicineDetailed[] = [];
    
    // First try brand name search
    try {
      const brandNameUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(query)}"&limit=5`;
      const brandResponse = await fetch(brandNameUrl);
      const brandData = await brandResponse.json() as OpenFDAResponse;
      
      if (brandData.results && brandData.results.length > 0) {
        const medicinesFromBrand = processFDAResults(brandData, rxcui);
        results.push(...medicinesFromBrand);
      }
    } catch (error) {
      console.log("Brand name search failed, trying generic name");
    }
    
    // If brand name search doesn't return enough results, try generic name
    if (results.length < 3) {
      try {
        const genericNameUrl = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(query)}"&limit=${5 - results.length}`;
        const genericResponse = await fetch(genericNameUrl);
        const genericData = await genericResponse.json() as OpenFDAResponse;
        
        if (genericData.results && genericData.results.length > 0) {
          const medicinesFromGeneric = processFDAResults(genericData, rxcui);
          
          // Filter out duplicates (by name)
          const existingNames = new Set(results.map(r => r.name?.toLowerCase()));
          const uniqueGenericResults = medicinesFromGeneric.filter(
            med => !existingNames.has(med.name?.toLowerCase() || '')
          );
          
          results.push(...uniqueGenericResults);
        }
      } catch (error) {
        console.log("Generic name search failed");
      }
    }
    
    // If we have RxCUI but no OpenFDA results, try using RxCUI to get related medications
    if (rxcui && results.length === 0) {
      try {
        // Get related medicines and forms using the RxCUI
        const relatedUrl = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/related.json?tty=SBD+SCD`;
        const relatedResponse = await fetch(relatedUrl);
        const relatedData = await relatedResponse.json() as RxNormResponse;
        
        console.log("RxNorm related data:", relatedData);
        
        if (relatedData.relatedGroup?.conceptGroup) {
          for (const group of relatedData.relatedGroup.conceptGroup) {
            if (group.conceptProperties) {
              for (const prop of group.conceptProperties) {
                if (prop.name) {
                  // Create a basic entry for each related medicine
                  results.push({
                    id: `rxnorm-${prop.rxcui || Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                    name: prop.name,
                    manufacturer: "N/A",
                    category: "Medication",
                    form: "Not specified",
                    price: Math.floor(Math.random() * 100) + 20, // Random price
                    description: "Information from RxNorm database",
                    rxcui: prop.rxcui
                  });
                  
                  // Limit to 5 results
                  if (results.length >= 5) break;
                }
              }
            }
            if (results.length >= 5) break;
          }
        }
      } catch (error) {
        console.error("Error fetching related RxNorm data:", error);
      }
    }
    
    return results;
  } catch (error) {
    console.error("Error in API medicine search:", error);
    return [];
  }
};

// Helper function to process OpenFDA results
function processFDAResults(data: OpenFDAResponse, rxcui?: string): MedicineDetailed[] {
  const results: MedicineDetailed[] = [];
  
  if (data.results) {
    for (const fdaResult of data.results) {
      try {
        const openfda = fdaResult.openfda;
        if (!openfda) continue;
        
        // Generate a unique ID
        const id = `api-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        
        // Create a structured medicine object from the API data
        const medicine: MedicineDetailed = {
          id: id,
          name: openfda.brand_name?.[0] || openfda.generic_name?.[0] || "Unknown Medicine",
          manufacturer: openfda.manufacturer_name?.[0] || "Unknown Manufacturer",
          category: openfda.product_type?.[0] || "Medication",
          form: openfda.route?.[0] || "Not specified",
          price: Math.floor(Math.random() * 100) + 20, // Random price since API doesn't provide it
          description: fdaResult.indications_and_usage?.[0] || "No description available",
          dosage: fdaResult.dosage_and_administration?.[0] || "Consult your doctor",
          sideEffects: fdaResult.adverse_reactions 
            ? fdaResult.adverse_reactions[0]?.split('.')?.filter(s => s.trim().length > 0) 
            : ["Information not available"],
          precautions: fdaResult.warnings?.[0] || "Consult healthcare professional before use",
          purpose: fdaResult.purpose?.[0] || fdaResult.indications_and_usage?.[0],
          usage: fdaResult.dosage_and_administration?.[0],
          warnings: fdaResult.warnings?.slice(0, 3),
          rxcui: openfda.rxcui?.[0] || rxcui,
          alternatives: []
        };
        
        results.push(medicine);
      } catch (error) {
        console.error("Error processing FDA result:", error);
      }
    }
  }
  
  return results;
}

// Function to get medicine by ID
export const getMedicineById = async (
  id: string
): Promise<MedicineDetailed> => {
  try {
    console.log("Getting medicine with ID:", id);
    
    // In a production environment, this would make an API request to a backend
    // For now, we're using mock data
    const medicine = mockMedicines.find(m => m.id === id);
    
    if (!medicine) {
      throw new Error(`Medicine with ID ${id} not found`);
    }
    
    return medicine;
  } catch (error) {
    console.error("Error getting medicine:", error);
    throw error;
  }
};

// Function to get medicine suggestions
export const getMedicineSuggestions = async (): Promise<MedicineDetailed[]> => {
  try {
    // In a production environment, this would make an API request to a backend
    // For now, we're returning a subset of mock data
    return mockMedicines.slice(0, 5);
  } catch (error) {
    console.error("Error getting medicine suggestions:", error);
    return [];
  }
};

// Function to get popular medicines
export const getPopularMedicines = async (): Promise<MedicineDetailed[]> => {
  try {
    // In a production environment, this would make an API request to a backend
    // For now, we're returning a subset of mock data
    return mockMedicines.slice(5, 10);
  } catch (error) {
    console.error("Error getting popular medicines:", error);
    return [];
  }
};

// Function to get medicine categories
export const getMedicineCategories = async (): Promise<string[]> => {
  try {
    // In a production environment, this would make an API request to a backend
    // For now, we're extracting categories from mock data
    const categories = [...new Set(mockMedicines.map(m => m.category).filter(Boolean))];
    return categories as string[];
  } catch (error) {
    console.error("Error getting medicine categories:", error);
    return [];
  }
};
