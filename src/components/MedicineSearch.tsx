
import { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader, Pill, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchMedicines, type MedicineDetailed } from "@/services/medicineService";
import { useDebounce } from "@/hooks/use-debounce";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface MedicineSearchProps {
  onSearchResults?: (results: MedicineDetailed[]) => void;
  onSearchQueryChange?: (query: string) => void;
}

const MedicineSearch = ({ 
  onSearchResults,
  onSearchQueryChange
}: MedicineSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResultsPreview, setSearchResultsPreview] = useState<MedicineDetailed[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResultsPreview([]);
      setFetchError(null);
      if (onSearchResults) onSearchResults([]);
      return;
    }

    setIsSearching(true);
    setFetchError(null);
    try {
      console.log(`Performing medicine search for: "${query}"`);
      const results = await searchMedicines(query);
      setSearchResultsPreview(results.slice(0, 5)); // Show only first 5 in dropdown
      if (onSearchResults) onSearchResults(results);
      
      if (results.length === 0) {
        console.log("No medicines found for query:", query);
      } else {
        console.log(`Found ${results.length} medicines for query:`, query);
      }
    } catch (error) {
      console.error('Error searching medicines:', error);
      setFetchError(`Failed to search: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast({
        title: "Search Failed",
        description: "There was a problem searching for medicines. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  }, [onSearchResults]);

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      setShowResults(false);
    }
    
    performSearch(debouncedSearchQuery);
    if (onSearchQueryChange) onSearchQueryChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, performSearch, onSearchQueryChange, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResultsPreview([]);
    setFetchError(null);
    setShowResults(false);
    if (onSearchResults) onSearchResults([]);
  };

  const handleInputFocus = () => {
    if (searchResultsPreview.length > 0) {
      setShowResults(true);
    }
  };

  const handleViewDetails = (medicineId: string) => {
    console.log("Navigating to medicine details:", medicineId);
    navigate(`/medicines/${medicineId}`);
    setShowResults(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.medicine-search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative medicine-search-container">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search medicines by name..."
            className="pl-9 pr-8 transition-all border-blue-100 focus:border-blue-300 hover:border-blue-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            aria-label="Medicine search"
            data-testid="medicine-search-input"
          />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-700 transition-colors"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button 
          onClick={() => {
            performSearch(searchQuery);
            setShowResults(true);
          }}
          disabled={isSearching}
          className="bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          {isSearching ? (
            <Loader className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          Search
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchResultsPreview.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-10 max-h-[350px] overflow-y-auto shadow-lg border-blue-100">
          <CardContent className="p-0">
            <ul className="py-2">
              {searchResultsPreview.map((medicine) => (
                <li key={medicine.id} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-blue-800">{medicine.name}</p>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-x-2 mt-1">
                        {medicine.category && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {medicine.category}
                          </Badge>
                        )}
                        {medicine.manufacturer && medicine.manufacturer !== "Unknown Manufacturer" && (
                          <span className="text-gray-600 text-xs flex items-center">
                            By {medicine.manufacturer}
                          </span>
                        )}
                        {medicine.form && medicine.form !== "Not specified" && (
                          <Badge variant="secondary" className="bg-gray-100">
                            {medicine.form}
                          </Badge>
                        )}
                        {medicine.price && (
                          <span className="font-medium text-green-600">₹{medicine.price}</span>
                        )}
                      </div>
                      {medicine.purpose && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          <span className="font-medium">Purpose:</span> {medicine.purpose}
                        </p>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(medicine.id)}
                      className="flex-shrink-0 ml-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      View Details
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {/* Show "No results" message when search is complete but no results found */}
      {showResults && !isSearching && searchResultsPreview.length === 0 && searchQuery.trim() !== '' && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-10 border-blue-100">
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="text-blue-400 h-6 w-6" />
              <p className="text-muted-foreground">No medicines found matching "{searchQuery}"</p>
              <p className="text-xs text-gray-500">Try using a different name or check your spelling</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Error message */}
      {fetchError && (
        <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {fetchError}
        </div>
      )}
      
      {/* Loading indicator */}
      {isSearching && (
        <div className="mt-2 text-center text-sm text-blue-500 flex items-center justify-center gap-2">
          <Loader className="h-4 w-4 animate-spin" />
          Searching medicines...
        </div>
      )}
    </div>
  );
};

export default MedicineSearch;
