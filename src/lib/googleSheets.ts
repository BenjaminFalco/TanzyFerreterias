import { Product } from "@/types/product";

const SHEET_ID = "1uXSFjUH9kFpWxF0H6tuveJmoDblLqRuXO24fJmuMxY8";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

interface SheetResponse {
  table: {
    cols: { label: string }[];
    rows: { c: ({ v: string | number | null } | null)[] }[];
  };
}

function parsePrice(priceStr: string | number | null): string {
  if (!priceStr) return "No disponible";
  if (typeof priceStr === "number") {
    return `$${priceStr.toLocaleString("es-CL")}`;
  }
  return priceStr.toString();
}

function parseNumber(value: string | number | null): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  const cleaned = value.replace(/[^0-9.-]/g, "");
  return parseFloat(cleaned) || 0;
}

function parseBoolean(value: string | number | null): boolean {
  if (!value) return false;
  return value.toString().toUpperCase() === "SI";
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    
    // Extract JSON from Google's response wrapper
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
    if (!jsonMatch) {
      throw new Error("Could not parse Google Sheets response");
    }
    
    const data: SheetResponse = JSON.parse(jsonMatch[1]);
    const rows = data.table.rows;
    
    // Skip header row (index 0) and map remaining rows to products
    const products: Product[] = rows.slice(1).map((row) => {
      const cells = row.c;
      
      return {
        sku: cells[0]?.v?.toString() || "",
        nombre: cells[1]?.v?.toString() || "No disponible",
        descripcion: cells[2]?.v?.toString() || "No disponible",
        categoria: cells[3]?.v?.toString() || "Sin categoría",
        subcategoria: cells[4]?.v?.toString() || "Sin subcategoría",
        marca: cells[5]?.v?.toString() || "No disponible",
        unidad: cells[6]?.v?.toString() || "UN",
        ubicacion: cells[7]?.v?.toString() || "No disponible",
        barcode: cells[8]?.v?.toString() || "",
        proveedor: cells[9]?.v?.toString() || "No disponible",
        proveedor_sku: cells[10]?.v?.toString() || "",
        stock_actual: parseNumber(cells[11]?.v),
        stock_reservado: parseNumber(cells[12]?.v),
        stock_disponible: parseNumber(cells[13]?.v),
        stock_min: parseNumber(cells[14]?.v),
        stock_max: parseNumber(cells[15]?.v),
        costo_unitario: parsePrice(cells[16]?.v),
        precio_venta: parsePrice(cells[17]?.v),
        iva_rate: parseNumber(cells[18]?.v),
        lead_time_dias: parseNumber(cells[19]?.v),
        activo: parseBoolean(cells[20]?.v),
        foto1: cells[21]?.v?.toString() || "",
        foto2: cells[22]?.v?.toString() || "",
        foto3: cells[23]?.v?.toString() || "",
        foto4: cells[24]?.v?.toString() || "",
        foto5: cells[25]?.v?.toString() || "",
      };
    }).filter((product) => product.sku && product.activo);
    
    return products;
  } catch (error) {
    console.error("Error fetching products from Google Sheets:", error);
    return [];
  }
}

export function getProductImages(product: Product): string[] {
  const images = [product.foto1, product.foto2, product.foto3, product.foto4, product.foto5];
  return images.filter((img) => img && img.trim() !== "");
}
