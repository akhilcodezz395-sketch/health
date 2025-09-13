
import { ArrowRight, Stars, Stethoscope, Pill, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-100/40 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-green-100/30 animate-pulse-slow"></div>
      <div className="absolute bottom-12 left-1/4 w-24 h-24 rounded-full bg-primary/5 animate-pulse-slow"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Stars className="h-4 w-4 mr-2" />
              <span>AI-Powered Healthcare</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-medical-blue-dark">
              Your Health, <span className="relative inline-block">
                Connected
                <span className="absolute bottom-1 left-0 w-full h-2 bg-medical-green/20 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-xl text-slate-700 max-w-xl leading-relaxed">
              Experience healthcare reimagined with our AI-powered platform that connects patients with quality healthcare services across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/symptom-checker">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px]">
                  Check Symptoms
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/find-doctors">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary/5 transition-all duration-300">
                  Find Doctors
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl bg-medical-blue/10 animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-medical-green/10 animate-pulse-slow"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm p-8 border border-white/50">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-center justify-center bg-blue-50 p-5 rounded-xl shadow-sm transition-transform hover:scale-105 duration-300">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                      <Stethoscope className="h-8 w-8 text-medical-blue" />
                    </div>
                    <p className="font-semibold text-slate-800">Find Doctors</p>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-green-50 p-5 rounded-xl shadow-sm transition-transform hover:scale-105 duration-300">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                      <Pill className="h-8 w-8 text-medical-green" />
                    </div>
                    <p className="font-semibold text-slate-800">Medicine Delivery</p>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-red-50 p-5 rounded-xl shadow-sm transition-transform hover:scale-105 duration-300">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                      <Ambulance className="h-8 w-8 text-medical-red" />
                    </div>
                    <p className="font-semibold text-slate-800">Emergency Help</p>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-5 rounded-xl shadow-sm transition-transform hover:scale-105 duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                      <div className="relative bg-white p-3 rounded-full shadow-sm mb-3">
                        <span className="text-primary font-bold text-lg">AI</span>
                      </div>
                    </div>
                    <p className="font-semibold text-slate-800 mt-2">Symptom Check</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Health Connect</h3>
                  <p className="text-sm text-slate-600">Healthcare at your fingertips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
