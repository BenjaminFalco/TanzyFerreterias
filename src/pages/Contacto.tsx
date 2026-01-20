import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

const Contacto = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-secondary py-16">
          <div className="container-tanzy text-center text-primary-foreground">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Estamos aquí para ayudarte con tu proyecto. 
              Visítanos o comunícate con nosotros.
            </p>
          </div>
        </section>

        <section className="container-tanzy py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="section-title mb-6">Información de Contacto</h2>
                
                <div className="space-y-6">
                  {/* Phones */}
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 rounded-lg p-3">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Teléfonos</h3>
                      <a 
                        href="tel:+56920692796" 
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        +56 9 2069 2796
                      </a>
                      <a 
                        href="tel:+56953232954" 
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        +56 9 5323 2954
                      </a>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 rounded-lg p-3">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Sucursales</h3>
                      <p className="text-muted-foreground">
                        Camino Las Mariposas Km 7.5
                      </p>
                      <p className="text-muted-foreground">
                        Avenida Collín 1129, Chillán
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 rounded-lg p-3">
                      <Clock className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Horario de Atención</h3>
                      <p className="text-muted-foreground">
                        Lunes a Viernes: 8:30 - 18:30
                      </p>
                      <p className="text-muted-foreground">
                        Sábado: 9:00 - 14:00
                      </p>
                      <p className="text-muted-foreground">
                        Domingo: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rubros */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-4">Nuestros Rubros</h3>
                <ul className="grid grid-cols-2 gap-2 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    Maderas y tableros
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    Materiales de construcción
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    Pinturas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    Fierros
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    Perfiles
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    Metalcón
                  </li>
                </ul>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="space-y-4">
              <h2 className="section-title">Encuéntranos</h2>
              <div className="bg-muted rounded-xl overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52947.42252376076!2d-72.15388665!3d-36.6066666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966858d6f3e8e56d%3A0x69f7f5a8e9c0f1d!2sChill%C3%A1n%2C%20Regi%C3%B3n%20de%20%C3%91uble%2C%20Chile!5e0!3m2!1ses!2scl!4v1642000000000!5m2!1ses!2scl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación TANZY Ferreterías"
                ></iframe>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Visítanos en cualquiera de nuestras sucursales en Chillán
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
