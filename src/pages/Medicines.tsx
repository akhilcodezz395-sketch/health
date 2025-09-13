
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MedicineSearch from "@/components/MedicineSearch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrescriptionUpload from "@/components/PrescriptionUpload";
import MedicineReminders from "@/components/MedicineReminders";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { 
  getMedicineSuggestions, 
  getPopularMedicines, 
  getMedicineCategories,
  type MedicineDetailed 
} from "@/services/medicineService";
import { Pill, Activity, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Medicines = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<MedicineDetailed[]>([]);
  const [suggestions, setSuggestions] = useState<MedicineDetailed[]>([]);
  const [popularMedicines, setPopularMedicines] = useState<MedicineDetailed[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("search");
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineDetailed | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if we have a medicine to add from another page
  useEffect(() => {
    if (location.state?.medicineToAdd) {
      console.log("Medicine to add:", location.state.medicineToAdd);
      setActiveTab("prescriptions");
    }
  }, [location.state]);

  // Load initial medicine data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const [suggestionsData, popularData, categoriesData] = await Promise.all([
          getMedicineSuggestions(),
          getPopularMedicines(),
          getMedicineCategories()
        ]);
        
        setSuggestions(suggestionsData);
        setPopularMedicines(popularData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading initial medicine data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  
  const handleSearchResults = (results: MedicineDetailed[]) => {
    setSearchResults(results);
  };
  
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
    }
  };

  // Function to render medicine card
  const renderMedicineCard = (medicine: MedicineDetailed) => (
    <Card key={medicine.id} className="overflow-hidden transition-all hover:shadow-md border-blue-100 hover:border-blue-200">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-blue-100/30">
        <CardTitle className="text-blue-700">{medicine.name}</CardTitle>
        <CardDescription>{medicine.manufacturer}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {medicine.form && (
              <Badge variant="outline" className="bg-blue-50 text-xs">
                <Pill className="h-3 w-3 mr-1" />
                {medicine.form}
              </Badge>
            )}
            <span className="font-medium text-green-600 ml-auto">₹{medicine.price}</span>
          </div>
          
          {medicine.purpose && (
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">
              {medicine.purpose}
            </p>
          )}
          
          <div className="flex justify-between items-center mt-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100">
              {medicine.category || "General"}
            </Badge>
            <a href={`/medicines/${medicine.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors">
              View Details
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <WelcomeHeader 
        title="Medicines" 
        subtitle="Search, order, and manage your medications"
        showActionButtons={false}
      />
      
      <main className="flex-1 container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-8">
            <div className="space-y-6">
              <MedicineSearch 
                onSearchResults={handleSearchResults}
                onSearchQueryChange={handleSearchQueryChange}
              />
              
              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                  <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Search Results for "{searchQuery}"
                  </h2>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map(renderMedicineCard)}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No medicines found matching "{searchQuery}"</p>
                      <p className="text-sm text-gray-500 mt-2">Try different keywords or check your spelling</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Loading state */}
              {isLoading && !searchQuery.trim() && (
                <div className="flex justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                    <p className="text-muted-foreground">Loading medicine data...</p>
                  </div>
                </div>
              )}
              
              {/* Suggestions and Popular Sections */}
              {!searchQuery.trim() && !isLoading && (
                <>
                  <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg shadow-sm border border-blue-100">
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">Suggested Medicines</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {suggestions.map(renderMedicineCard)}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">Popular Medicines</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {popularMedicines.map(renderMedicineCard)}
                    </div>
                  </div>
                </>
              )}
              
              {/* Categories Section */}
              {!searchQuery.trim() && !isLoading && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                  <h2 className="text-xl font-semibold mb-4 text-blue-800">Browse by Category</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                      <Card key={category} className="hover:bg-blue-50 cursor-pointer transition-colors border-blue-100 hover:border-blue-200">
                        <CardContent className="p-4 text-center">
                          <p className="font-medium text-blue-700">{category}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="prescriptions">
            <PrescriptionUpload />
          </TabsContent>
          
          <TabsContent value="reminders">
            <MedicineReminders selectedMedicine={selectedMedicine} />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Medicines;
