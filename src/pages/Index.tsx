
import { Activity, Stethoscope, Pill, Ambulance, Calendar, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />

        {/* Features Section */}
        <section className="py-16 container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Health Connect provides a comprehensive set of healthcare services designed to make
              quality healthcare accessible across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="AI Symptom Checker"
              description="Get instant insights about your symptoms and recommended next steps."
              icon={<Activity className="h-6 w-6" />}
              href="/symptom-checker"
              iconClass="bg-medical-blue/10 text-medical-blue"
            />
            <FeatureCard
              title="Find Doctors"
              description="Search and connect with specialized healthcare professionals near you."
              icon={<Stethoscope className="h-6 w-6" />}
              href="/find-doctors"
              iconClass="bg-medical-green/10 text-medical-green"
            />
            <FeatureCard
              title="Medicine Delivery"
              description="Order prescriptions and over-the-counter medicines with doorstep delivery."
              icon={<Pill className="h-6 w-6" />}
              href="/medicines"
              iconClass="bg-primary/10 text-primary"
            />
            <FeatureCard
              title="Emergency Response"
              description="Quick access to emergency services with location sharing and SOS alerts."
              icon={<Ambulance className="h-6 w-6" />}
              href="/emergency"
              iconClass="bg-medical-red/10 text-medical-red"
            />
            <FeatureCard
              title="Appointment Booking"
              description="Schedule and manage doctor appointments with reminders."
              icon={<Calendar className="h-6 w-6" />}
              href="/appointments"
              iconClass="bg-secondary/10 text-secondary"
            />
            <FeatureCard
              title="Health Profile"
              description="Store your medical history, prescriptions, and health records securely."
              icon={<UserCircle className="h-6 w-6" />}
              href="/profile"
              iconClass="bg-medical-blue/10 text-medical-blue"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started with Health Connect in just a few simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-medium mb-2">Create Your Account</h3>
                <p className="text-muted-foreground">
                  Sign up as a patient to access all features or as a doctor to offer consultations.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-medium mb-2">Use Our Services</h3>
                <p className="text-muted-foreground">
                  Check symptoms, find doctors, book appointments, or order medicines as needed.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-xl font-medium mb-2">Get Healthcare Support</h3>
                <p className="text-muted-foreground">
                  Receive personalized healthcare assistance and follow-up care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 container">
          <div className="bg-primary rounded-lg p-8 md:p-10 text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
              <p className="mb-6 text-primary-foreground/90">
                Join thousands of users already benefiting from Health Connect's comprehensive healthcare platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                    Register Now
                  </Button>
                </Link>
                <Link to="/symptom-checker">
                  <Button size="lg" className="w-full sm:w-auto" variant="outline">
                    Try Symptom Checker
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
