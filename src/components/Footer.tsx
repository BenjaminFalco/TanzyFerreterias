import { Phone, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tanzy py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img 
              src={logo} 
              alt="TANZY Ferreterías" 
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Tu ferretería de confianza en Chillán. Más de 20 años brindando 
              soluciones en materiales de construcción.
            </p>
          </div>

          {/* Rubros */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Nuestros Rubros</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>• Maderas y tableros</li>
              <li>• Materiales de construcción</li>
              <li>• Pinturas</li>
              <li>• Fierros</li>
              <li>• Perfiles</li>
              <li>• Metalcón</li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contacto</h3>
            <div className="space-y-3 text-primary-foreground/80 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 shrink-0" />
                <div>
                  <a href="tel:+56920692796" className="hover:text-primary-foreground transition-colors block">
                    +56 9 2069 2796
                  </a>
                  <a href="tel:+56953232954" className="hover:text-primary-foreground transition-colors block">
                    +56 9 5323 2954
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <div>
                  <p>Camino Las Mariposas Km 7.5</p>
                  <p>Avenida Collín 1129, Chillán</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-1 shrink-0" />
                <div>
                  <p>Lun - Vie: 8:30 - 18:30</p>
                  <p>Sábado: 9:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} TANZY FERRETERÍAS. Todos los derechos reservados.</p>
          <p className="mt-1 text-xs">Este es un catálogo demostrativo. Los precios pueden variar.</p>
        </div>
      </div>
    </footer>
  );
}
