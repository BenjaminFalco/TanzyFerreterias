import { Link } from "react-router-dom";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top bar */}
      <div className="bg-card border-b border-border py-2">
        <div className="container-tanzy flex flex-wrap items-center justify-between text-sm gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/56920692796"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground shadow-sm transition hover:bg-secondary/90 sm:text-sm"
              aria-label="Escríbenos por WhatsApp al +56 9 2069 2796"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Escríbenos por WhatsApp
            </a>
            <a
              href="https://wa.me/56953232954"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-primary shadow-sm transition hover:border-secondary/60 hover:text-secondary sm:text-sm"
              aria-label="Escríbenos por WhatsApp al +56 9 5323 2954"
            >
              <WhatsAppIcon className="h-4 w-4 text-secondary" />
              Escríbenos por WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">Chillán, Chile</span>
            <span className="sm:hidden">Chillán</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-tanzy py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-wide text-primary sm:text-xl md:text-2xl">
                TANZY <span className="text-accent">FERRETERÍAS</span>
              </span>
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                Hacemos tu día más simple
              </span>
            </div>
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
