import { Link } from "react-router-dom";
import { Phone, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-tanzy flex flex-wrap items-center justify-between text-sm gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+56920692796" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="h-3 w-3" />
              <span>+56 9 2069 2796</span>
            </a>
            <a href="tel:+56953232954" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="h-3 w-3" />
              <span>+56 9 5323 2954</span>
            </a>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <MapPin className="h-3 w-3" />
            <span className="hidden sm:inline">Chillán, Chile</span>
            <span className="sm:hidden">Chillán</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-tanzy py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="TANZY Ferreterías" 
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Catálogo
            </Link>
            <Link 
              to="/contacto" 
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catálogo
              </Link>
              <Link 
                to="/contacto" 
                className="font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
