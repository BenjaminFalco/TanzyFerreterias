import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/googleSheets";
import { Product } from "@/types/product";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useProduct(sku: string) {
  const { data: products, ...rest } = useProducts();
  
  const product = products?.find((p) => p.sku === sku);
  
  return {
    data: product,
    ...rest,
  };
}

export function useProductsByCategory(category: string) {
  const { data: products, ...rest } = useProducts();
  
  const filteredProducts = category === "all" 
    ? products 
    : products?.filter((p) => p.categoria === category);
  
  return {
    data: filteredProducts,
    ...rest,
  };
}

export function useCategories() {
  const { data: products, ...rest } = useProducts();
  
  const categories = [...new Set(products?.map((p) => p.categoria) || [])];
  
  return {
    data: categories,
    ...rest,
  };
}
