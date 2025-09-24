import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import robotIcon from "@assets/3_1758714475998.png";

interface NavigationProps {
  onGetStarted: () => void;
}

export function Navigation({ onGetStarted }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src={robotIcon} 
              alt="iLove AI Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold text-primary">iLove AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-neutral hover:text-primary transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="text-neutral hover:text-primary transition-colors duration-200"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-neutral hover:text-primary transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("case-studies")}
              className="text-neutral hover:text-primary transition-colors duration-200"
            >
              Case Studies
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-neutral hover:text-primary transition-colors duration-200"
            >
              Contact
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onGetStarted}
              className="hidden md:block bg-primary text-white hover:bg-blue-700"
            >
              Get Started
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-3 pt-4">
              <button 
                onClick={() => scrollToSection("home")}
                className="text-left text-neutral hover:text-primary transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="text-left text-neutral hover:text-primary transition-colors duration-200"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="text-left text-neutral hover:text-primary transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("case-studies")}
                className="text-left text-neutral hover:text-primary transition-colors duration-200"
              >
                Case Studies
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-left text-neutral hover:text-primary transition-colors duration-200"
              >
                Contact
              </button>
              <Button 
                onClick={onGetStarted}
                className="bg-primary text-white hover:bg-primary-dark w-full mt-2"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
