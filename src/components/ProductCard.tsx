import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasImage = product.foto1 && product.foto1.trim() !== "";
  const stockAvailable = product.stock_disponible > 0;

  return (
    <Link 
      to={`/producto/${product.sku}`}
      className="product-card group cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        {hasImage ? (
          <img
            src={product.foto1}
            alt={product.nombre}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`${hasImage ? 'hidden' : ''} absolute inset-0 flex items-center justify-center`}>
          <Package className="h-16 w-16 text-muted-foreground/30" />
        </div>
        
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span className={stockAvailable ? "badge-stock-available" : "badge-stock-low"}>
            {stockAvailable ? `${product.stock_disponible} disponibles` : "Sin stock"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded">
            {product.categoria}
          </span>
          {product.marca && product.marca !== "No disponible" && (
            <span className="text-xs text-muted-foreground">
              {product.marca}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.nombre}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.descripcion}
        </p>

        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-2xl font-bold text-primary">
              {product.precio_venta}
            </p>
            <p className="text-xs text-muted-foreground">
              por {product.unidad}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
