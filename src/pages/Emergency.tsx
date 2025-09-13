
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MapPin, Bell, Users, Ambulance, AlertCircle } from "lucide-react";

const Emergency = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null, loading: false });

  const handleGetLocation = () => {
    setLocation({ ...location, loading: true });
    
    // Simulate geolocation API
    setTimeout(() => {
      setLocation({
        latitude: 28.6139,  // Mock latitude for Delhi
        longitude: 77.2090, // Mock longitude for Delhi
        loading: false
      });
    }, 1500);
  };

  const emergencyContacts = [
    { name: "National Emergency Number", number: "112" },
    { name: "Ambulance", number: "102" },
    { name: "Police", number: "100" },
    { name: "Fire Department", number: "101" },
    { name: "Women Helpline", number: "1091" },
    { name: "Child Helpline", number: "1098" },
  ];

  const nearbyHospitals = [
    {
      name: "AIIMS Delhi",
      distance: "2.3 km",
      address: "Ansari Nagar, New Delhi",
      phone: "011-26588500",
      emergency: true
    },
    {
      name: "Safdarjung Hospital",
      distance: "3.1 km",
      address: "Ansari Nagar West, New Delhi",
      phone: "011-26707444",
      emergency: true
    },
    {
      name: "Apollo Hospital",
      distance: "4.5 km",
      address: "Sarita Vihar, New Delhi",
      phone: "011-26925858",
      emergency: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-medical-red py-3">
        <div className="container">
          <div className="flex items-center justify-center text-white gap-2">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm md:text-base font-medium">
              In case of a serious emergency, call 112 immediately
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Emergency Services</h1>
            <p className="text-muted-foreground">
              Quick access to emergency contacts, nearby hospitals, and ambulance services
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Emergency Contacts */}
            <Card className="lg:col-span-1">
              <CardHeader className="bg-medical-red/10 border-b">
                <CardTitle className="flex items-center gap-2 text-medical-red">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>
                  Important emergency numbers in India
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {emergencyContacts.map((contact, index) => (
                    <li key={index} className="p-4 hover:bg-muted/50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{contact.name}</span>
                        <a
                          href={`tel:${contact.number}`}
                          className="bg-medical-red text-white px-3 py-1 rounded-full text-sm hover:bg-medical-red-dark flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" />
                          {contact.number}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Main Emergency Features */}
            <div className="lg:col-span-2 space-y-6">
              {/* SOS Button */}
              <Card className="border-medical-red">
                <CardContent className="p-0">
                  <div className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 rounded-full bg-medical-red hover:bg-medical-red-dark text-white flex items-center justify-center mb-4 cursor-pointer">
                      <div className="text-center">
                        <Ambulance className="h-12 w-12 mx-auto" />
                        <span className="font-bold text-lg">SOS</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Emergency SOS</h3>
                    <p className="text-muted-foreground mb-4">
                      Tap to alert emergency contacts and find immediate help
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-medical-red hover:bg-medical-red-dark">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Ambulance
                      </Button>
                      <Button variant="outline">
                        <Bell className="h-4 w-4 mr-2" />
                        Send SOS Alert
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Location & Nearby Services */}
              <Tabs defaultValue="hospitals">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="hospitals">Nearby Hospitals</TabsTrigger>
                  <TabsTrigger value="ambulance">Ambulance Services</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hospitals" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-medical-red" />
                        Nearby Emergency Hospitals
                      </CardTitle>
                      <CardDescription>
                        Find hospitals with emergency services near your location
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <Button 
                          onClick={handleGetLocation}
                          disabled={location.loading}
                          className="w-full"
                        >
                          {location.loading 
                            ? "Getting Your Location..." 
                            : location.latitude 
                            ? "Location Found" 
                            : "Get My Location"}
                        </Button>
                      </div>

                      {location.latitude && (
                        <div className="space-y-4">
                          <div className="bg-muted p-3 rounded-md text-sm">
                            <p>
                              <span className="font-medium">Your location:</span> Delhi, India
                            </p>
                          </div>
                          
                          <ul className="divide-y">
                            {nearbyHospitals.map((hospital, index) => (
                              <li key={index} className="py-4 flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-1 mb-1">
                                    <h4 className="font-medium">{hospital.name}</h4>
                                    {hospital.emergency && (
                                      <span className="bg-medical-red/10 text-medical-red text-xs px-2 py-0.5 rounded-full">
                                        24/7 Emergency
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {hospital.address}
                                  </p>
                                  <p className="text-sm text-medical-red">
                                    {hospital.distance} away
                                  </p>
                                </div>
                                <a
                                  href={`tel:${hospital.phone}`}
                                  className="shrink-0 bg-medical-red text-white p-2 rounded-full hover:bg-medical-red-dark"
                                >
                                  <Phone className="h-4 w-4" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="ambulance" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Ambulance className="h-5 w-5 text-medical-red" />
                        Book an Ambulance
                      </CardTitle>
                      <CardDescription>
                        Request emergency medical transportation services
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-md">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-medical-red shrink-0 mt-0.5" />
                            <p className="text-sm">
                              For immediate emergencies requiring urgent medical attention, we recommend 
                              calling the national emergency number <strong>112</strong> or the ambulance 
                              helpline <strong>102</strong> directly.
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid gap-3">
                          <Button className="w-full bg-medical-red hover:bg-medical-red-dark flex gap-2">
                            <Phone className="h-4 w-4" />
                            Call Government Ambulance (102)
                          </Button>
                          
                          <Button variant="outline" className="w-full">
                            Book Private Ambulance
                          </Button>

                          <Button variant="outline" className="w-full">
                            <Users className="h-4 w-4 mr-2" />
                            Contact Emergency Contacts
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Emergency;
