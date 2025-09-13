
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, PenSquare, ShoppingBag, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMedicineById, searchMedicines } from "@/services/medicineService";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const MedicineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching medicine with ID:", id);
        
        // Check if id starts with "api-" or "rxnorm-", indicating it came from an API
        if (id.startsWith('api-') || id.startsWith('rxnorm-')) {
          console.log("API or RxNorm ID detected, using specialized fetching logic");
          
          // For API-generated IDs, we'll need to search for the medicine again
          // Extract potential name from the ID (if possible)
          const potentialNameMatch = id.match(/api-\d+-(.+)/);
          let searchTerm = '';
          
          if (potentialNameMatch && potentialNameMatch[1]) {
            // Convert the ID segment back to a readable search term
            searchTerm = potentialNameMatch[1]
              .replace(/-/g, ' ')
              .replace(/[0-9]/g, '')
              .trim();
              
            console.log("Extracted search term from ID:", searchTerm);
          }
          
          // If we can extract a search term, use it
          if (searchTerm) {
            console.log("Searching for medicine with term:", searchTerm);
            const results = await searchMedicines(searchTerm);
            
            console.log("Search results:", results);
            
            // Find the medicine with the matching ID
            const matchedMedicine = results.find(m => m.id === id);
            
            if (matchedMedicine) {
              console.log("Found exact match by ID:", matchedMedicine);
              setMedicine(matchedMedicine);
            } else if (results.length > 0) {
              // If we can't find an exact match, use the first result
              console.log("No exact match found, using first result:", results[0]);
              setMedicine(results[0]);
            } else {
              throw new Error("Cannot find medicine details for the given ID");
            }
          } else {
            // If we can't extract a search term, try to parse the RxNorm ID
            if (id.startsWith('rxnorm-')) {
              const rxcui = id.split('-')[1];
              console.log("Extracted RxCUI:", rxcui);
              
              if (rxcui) {
                // Search using the rxcui
                const results = await searchMedicines(rxcui);
                if (results.length > 0) {
                  console.log("Found medicine by RxCUI:", results[0]);
                  setMedicine(results[0]);
                } else {
                  throw new Error("Cannot find medicine details for the given RxCUI");
                }
              } else {
                throw new Error("Invalid RxNorm ID format");
              }
            } else {
              // For other API IDs with no extractable search term, extract the timestamp
              console.log("Attempting to extract medicine name from API ID");
              // Try to extract a readable part from the ID
              const apiIdParts = id.split('-');
              if (apiIdParts.length >= 3) {
                // The last part might contain a name or identifier
                const possibleIdentifier = apiIdParts[2] || '';
                
                // Try to search with this identifier
                const results = await searchMedicines(possibleIdentifier);
                if (results.length > 0) {
                  console.log("Found medicine by ID part:", results[0]);
                  setMedicine(results[0]);
                  return;
                }
              }
              
              // If all extraction attempts fail, try to find the exact ID
              console.log("Attempting direct search by ID");
              const directResults = await searchMedicines(id);
              if (directResults.length > 0) {
                const directMatch = directResults.find(m => m.id === id);
                if (directMatch) {
                  console.log("Found direct ID match:", directMatch);
                  setMedicine(directMatch);
                  return;
                }
                
                // If no exact match but we have results, use the first one
                console.log("No direct ID match, using first result:", directResults[0]);
                setMedicine(directResults[0]);
                return;
              }
              
              // Last resort - try the standard method
              console.log("Falling back to getMedicineById");
              try {
                const medicineData = await getMedicineById(id);
                setMedicine(medicineData);
              } catch (fallbackError) {
                console.error("Fallback method failed:", fallbackError);
                throw new Error("Cannot find medicine details with any method");
              }
            }
          }
        } else {
          // For standard IDs, just use getMedicineById
          console.log("Standard ID detected, using getMedicineById");
          const medicineData = await getMedicineById(id);
          setMedicine(medicineData);
        }
      } catch (error) {
        console.error("Error fetching medicine:", error);
        setError("We couldn't load this medicine's details. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load medicine details."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  // Update title when medicine loads (to handle async loading)
  useEffect(() => {
    if (medicine?.name) {
      document.title = `${medicine.name} | Health Connect`;
    }
  }, [medicine]);

  const handleAddToPrescription = () => {
    navigate("/medicines", { state: { medicineToAdd: medicine } });
    toast({
      title: "Medicine added",
      description: "Medicine added to new prescription"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container">
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                <p className="text-muted-foreground">Loading medicine details...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container">
            <div className="text-center py-12">
              <div className="mb-6 flex justify-center">
                <AlertCircle className="h-16 w-16 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Medicine Not Found</h1>
              <p className="mb-6 text-muted-foreground">{error || "The medicine you're looking for doesn't exist or has been removed."}</p>
              <Button onClick={() => navigate("/medicines")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Medicines
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/medicines")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Medicines
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg border p-6 mb-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {medicine.category && (
                      <Badge variant="secondary">{medicine.category}</Badge>
                    )}
                    {medicine.form && (
                      <Badge variant="outline">{medicine.form}</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">
                    {medicine.description || medicine.purpose || "No description available"}
                  </p>
                </div>

                <div className="space-y-6">
                  {medicine.dosage && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Dosage Information</h2>
                      <p>{medicine.dosage}</p>
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Side Effects</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
                        medicine.sideEffects.map((effect: string, index: number) => (
                          <li key={index}>{effect}</li>
                        ))
                      ) : (
                        <li>No known side effects listed</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Precautions</h2>
                    <p>{medicine.precautions || medicine.warnings?.[0] || "No specific precautions listed."}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <CardTitle className="text-xl">Price Information</CardTitle>
                    <CardDescription>Estimated retail price</CardDescription>
                    <p className="text-2xl font-bold">₹{medicine.price || "N/A"}</p>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Usually in stock at pharmacies</span>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button className="w-full" onClick={handleAddToPrescription}>
                        <PenSquare className="mr-2 h-4 w-4" />
                        Add to Prescription
                      </Button>
                      <Button variant="outline" className="w-full">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Check Online Pharmacies
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <CardTitle className="text-xl mb-4">Similar Medicines</CardTitle>
                  <ul className="space-y-3">
                    {medicine.alternatives && medicine.alternatives.length > 0 ? (
                      medicine.alternatives.map((alt: any, index: number) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{alt.name}</span>
                          <Badge variant="outline">₹{alt.price}</Badge>
                        </li>
                      ))
                    ) : (
                      <li>No alternatives found</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MedicineDetail;
