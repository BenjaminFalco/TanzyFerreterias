import { useState } from "react";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const validImages = images.filter((_, index) => !imageErrors.has(index));
  const hasImages = validImages.length > 0;

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const nextImage = () => {
    if (hasImages) {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  if (!hasImages) {
    return (
      <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Imagen no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`${productName} - Imagen ${currentIndex + 1}`}
          className="w-full h-full object-contain p-4"
          onError={() => handleImageError(currentIndex)}
        />

        {validImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card text-foreground p-2 rounded-full shadow-lg transition-all"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card text-foreground p-2 rounded-full shadow-lg transition-all"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => {
            if (imageErrors.has(index)) return null;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? "border-primary"
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
              >
                <img
                  src={image}
                  alt={`${productName} - Miniatura ${index + 1}`}
                  className="w-full h-full object-contain bg-muted p-1"
                  onError={() => handleImageError(index)}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
