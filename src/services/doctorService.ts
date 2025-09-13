
import { supabase } from "@/integrations/supabase/client";

export interface Doctor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  specialization: string | null;
  license_number: string | null;
  avatar_url: string | null;
  created_at: string;
}

export const fetchDoctors = async (
  searchQuery?: string,
  specialization?: string
): Promise<Doctor[]> => {
  try {
    console.log("Fetching doctors with query:", searchQuery, "and specialization:", specialization);
    
    let query = supabase
      .from("profiles")
      .select("*")
      .eq("role", "doctor");
    
    // Add search filter if provided
    if (searchQuery) {
      query = query.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`);
    }
    
    // Add specialization filter if provided
    if (specialization && specialization !== "all") {
      query = query.eq("specialization", specialization);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching doctors:", error);
      throw new Error("Failed to fetch doctors");
    }
    
    console.log("Doctors data from Supabase:", data); // Debug log to see what's returned
    return data as Doctor[];
  } catch (error) {
    console.error("Error in fetchDoctors:", error);
    return [];
  }
};
