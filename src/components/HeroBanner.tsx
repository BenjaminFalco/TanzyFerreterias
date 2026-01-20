import { Wrench, Package, Truck } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-secondary py-12 md:py-20">
      <div className="container-tanzy">
        <div className="text-center text-primary-foreground space-y-6 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Todo para tu obra en un solo lugar
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Materiales de construcción, ferretería, maderas y más. 
            Calidad garantizada al mejor precio.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 text-center text-primary-foreground">
            <div className="bg-secondary rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-7 w-7" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Asesoría Experta</h3>
            <p className="text-sm text-primary-foreground/70">
              Personal capacitado para ayudarte en tu proyecto
            </p>
          </div>

          <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 text-center text-primary-foreground">
            <div className="bg-secondary rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <Package className="h-7 w-7" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Stock Disponible</h3>
            <p className="text-sm text-primary-foreground/70">
              Amplio inventario con los mejores productos
            </p>
          </div>

          <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6 text-center text-primary-foreground">
            <div className="bg-secondary rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <Truck className="h-7 w-7" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Despacho</h3>
            <p className="text-sm text-primary-foreground/70">
              Entrega a domicilio en la zona
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
