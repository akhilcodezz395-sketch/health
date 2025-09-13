
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Health Connect</h4>
          <p className="text-sm text-primary-foreground/80">
            Improving healthcare access across India through technology.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="hover:text-white">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="hover:text-white">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/symptom-checker" className="hover:text-white">
                AI Symptom Checker
              </Link>
            </li>
            <li>
              <Link to="/find-doctors" className="hover:text-white">
                Find Doctors
              </Link>
            </li>
            <li>
              <Link to="/medicines" className="hover:text-white">
                Order Medicines
              </Link>
            </li>
            <li>
              <Link to="/emergency" className="hover:text-white">
                Emergency Services
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/faq" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 9876543210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>support@healthconnect.com</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link to="/emergency" className="bg-medical-red hover:bg-medical-red-dark text-white px-4 py-2 rounded-md text-sm inline-flex items-center">
              Emergency Helpline
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/80">
            © 2025 Health Connect. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/80">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white">
              Terms
            </Link>
            <Link to="/sitemap" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
