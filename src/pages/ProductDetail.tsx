import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Barcode } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageGallery } from "@/components/ImageGallery";
import { useProduct } from "@/hooks/useProducts";
import { getProductImages } from "@/lib/googleSheets";

const ProductDetail = () => {
  const { sku } = useParams<{ sku: string }>();
  const { data: product, isLoading } = useProduct(sku || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container-tanzy py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-6 bg-muted rounded w-32" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-xl" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
                <div className="h-12 bg-muted rounded w-1/3" />
                <div className="h-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container-tanzy py-16">
          <div className="text-center">
            <Package className="h-24 w-24 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Producto no encontrado
            </h1>
            <p className="text-muted-foreground mb-6">
              El producto que buscas no existe o no está disponible.
            </p>
            <Link to="/" className="btn-tanzy-primary inline-flex">
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = getProductImages(product);
  const stockAvailable = product.stock_disponible > 0;
  const whatsappMessage = `Hola, quiero el producto ${product.nombre} (SKU ${product.sku}).`;
  const whatsappLink = `https://wa.me/56920692796?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container-tanzy py-8">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="animate-slide-up">
              <ImageGallery images={images} productName={product.nombre} />
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {/* Category & Brand */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-lg">
                  {product.categoria}
                </span>
                {product.subcategoria && product.subcategoria !== "Sin subcategoría" && (
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-lg">
                    {product.subcategoria}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.nombre}
              </h1>

              {/* Brand & SKU */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {product.marca && product.marca !== "No disponible" && (
                  <span>Marca: <strong className="text-foreground">{product.marca}</strong></span>
                )}
                <span className="flex items-center gap-1">
                  <Barcode className="h-4 w-4" />
                  {product.sku}
                </span>
              </div>

              {/* Price */}
              <div className="border-y border-border py-6">
                <p className="text-4xl font-bold text-primary">
                  {product.precio_venta}
                </p>
                <p className="text-muted-foreground mt-1">
                  Precio por {product.unidad} • IVA incluido
                </p>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-lg font-medium ${
                  stockAvailable 
                    ? "bg-secondary/10 text-secondary" 
                    : "bg-accent/10 text-accent"
                }`}>
                  {stockAvailable 
                    ? `${product.stock_disponible} unidades disponibles` 
                    : "Sin stock disponible"
                  }
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.descripcion || "No disponible"}
                </p>
              </div>

              {/* Location */}
              {product.ubicacion && product.ubicacion !== "No disponible" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Ubicación en tienda: {product.ubicacion}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={whatsappLink}
                  className="btn-tanzy-secondary inline-flex w-full items-center justify-center"
                  aria-label={`Lo quiero: ${product.nombre}`}
                >
                  Lo quiero
                </a>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                * Consulta disponibilidad y coordinación de compra vía WhatsApp.
              </p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-12 p-6 bg-card rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-4">Información adicional</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Proveedor</p>
                <p className="font-medium text-foreground">{product.proveedor || "No disponible"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Código de barras</p>
                <p className="font-medium text-foreground">{product.barcode || "No disponible"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Unidad de venta</p>
                <p className="font-medium text-foreground">{product.unidad || "No disponible"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tiempo de reposición</p>
                <p className="font-medium text-foreground">{product.lead_time_dias} días</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
