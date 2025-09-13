import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  AlertCircle, 
  Activity, 
  ThumbsUp, 
  ThumbsDown,
  Loader2, 
  Brain,
  Thermometer,
  HeartPulse,
  Stethoscope,
  ExternalLink,
  Info
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { analyzeSymptoms } from "@/services/symptomService";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import MedicineSearch from "@/components/MedicineSearch";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(10);
  
  const { 
    data: results, 
    isLoading: analyzing,
    error: analysisError,
    refetch: performAnalysis
  } = useQuery({
    queryKey: ['symptomAnalysis', symptoms],
    queryFn: () => analyzeSymptoms(symptoms),
    enabled: false, // Don't run on mount
  });

  useState(() => {
    if (analyzing) {
      setLoadingProgress(10);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 5;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else if (results) {
      setLoadingProgress(100);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (symptoms.trim().length < 10) {
      toast({
        title: "More information needed",
        description: "Please provide more details about your symptoms for better analysis.",
        variant: "destructive"
      });
      return;
    }
    
    setHasSubmitted(true);
    setLoadingProgress(10);
    performAnalysis();
  };

  const handleFeedback = (helpful: boolean) => {
    toast({
      title: helpful ? "Thank you for your feedback" : "We're sorry to hear that",
      description: helpful 
        ? "We're glad the information was helpful to you" 
        : "We'll continue to improve our symptom checker"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <WelcomeHeader 
        title="AI Symptom Checker"
        subtitle="Describe your symptoms to get possible conditions and recommended next steps"
        showActionButtons={false}
      />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Describe Your Symptoms
              </CardTitle>
              <CardDescription>
                Please provide detailed information about what you're experiencing.
                Include when symptoms started, their severity, and any relevant medical history.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="symptoms">Your symptoms</Label>
                    <Textarea 
                      id="symptoms"
                      placeholder="E.g., I've had a persistent cough for 3 days, along with a mild fever and fatigue..." 
                      className="min-h-[150px]" 
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">
                        AI-Powered Analysis
                      </p>
                      <p className="text-sm text-amber-700">
                        This tool uses AI to analyze your symptoms and provide general guidance. 
                        Results are for informational purposes only and should not replace 
                        professional medical advice, diagnosis, or treatment.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto" 
                  disabled={analyzing || symptoms.length < 10}
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    "Check Symptoms"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          {analyzing && (
            <div className="mt-8">
              <Card>
                <CardContent className="py-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full max-w-md mb-4">
                      <Progress value={loadingProgress} className="h-2" />
                    </div>
                    <Activity className="h-10 w-10 text-primary animate-pulse mb-4" />
                    <h3 className="text-lg font-medium mb-2">Analyzing your symptoms...</h3>
                    <p className="text-muted-foreground">
                      Our AI is reviewing your symptoms and medical knowledge to provide insights.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {analysisError && hasSubmitted && (
            <div className="mt-8">
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    Analysis Error
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>There was a problem analyzing your symptoms. Please try again later.</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => performAnalysis()}
                  >
                    Retry Analysis
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {results && !analyzing && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <Card className="border-t-4 border-t-primary">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-amber-500" />
                      AI Analysis Disclaimer
                    </CardTitle>
                  </div>
                  <CardDescription className="text-amber-700">
                    This analysis is generated by AI and is not a substitute for professional medical advice. 
                    Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    Possible Conditions
                  </CardTitle>
                  <CardDescription>
                    Based on the symptoms you've described, here are potential conditions to consider.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.possibleConditions.map((condition, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{condition.name}</h3>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            condition.probability === "High" 
                              ? "bg-medical-red/10 text-medical-red" 
                              : condition.probability === "Medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-medical-green/10 text-medical-green"
                          }`}>
                            {condition.probability} Probability
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="h-5 w-5 text-primary" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>
                    Here are some suggested next steps based on your described symptoms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-primary font-medium">{index + 1}</span>
                        </div>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex gap-1" onClick={() => handleFeedback(true)}>
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex gap-1" onClick={() => handleFeedback(false)}>
                      <ThumbsDown className="h-4 w-4" />
                      <span>Not Helpful</span>
                    </Button>
                  </div>
                  <Button className="w-full sm:w-auto" asChild>
                    <Link to="/find-doctors">Find Doctors</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-primary" />
                    Related Medicines
                  </CardTitle>
                  <CardDescription>
                    These medications may be relevant to your symptoms. Always consult a doctor before taking any medication.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.suggestedMedicines.map((medicine, index) => (
                      <div key={index} className="p-3 border rounded-md bg-white">
                        <h4 className="font-medium">{medicine.name}</h4>
                        <p className="text-sm text-muted-foreground">{medicine.purpose}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Search for more information:</p>
                    <MedicineSearch onSearchResults={() => {}} />
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                  <Button variant="outline" size="sm" className="flex gap-2 items-center" asChild>
                    <a href="https://medlineplus.gov/" target="_blank" rel="noopener noreferrer">
                      <span>Medical Resources</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SymptomChecker;
