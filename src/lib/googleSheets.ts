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
    const columns = data.table.cols.map((col) => col.label || "");

    const normalizeLabel = (label: string) =>
      label
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");

    const findColumnIndex = (targets: string[]) => {
      const normalizedTargets = targets.map(normalizeLabel);
      return columns.findIndex((label) => normalizedTargets.includes(normalizeLabel(label)));
    };

    const getCellValue = (cells: ({ v: string | number | null } | null)[], index: number) =>
      index >= 0 ? cells[index]?.v : null;

    const foto1Index = findColumnIndex(["foto1", "foto 1", "imagen1", "imagen 1"]);
    const foto2Index = findColumnIndex(["foto2", "foto 2", "imagen2", "imagen 2"]);
    const foto3Index = findColumnIndex(["foto3", "foto 3", "imagen3", "imagen 3"]);
    const foto4Index = findColumnIndex(["foto4", "foto 4", "imagen4", "imagen 4"]);
    const foto5Index = findColumnIndex(["foto5", "foto 5", "imagen5", "imagen 5"]);
    
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
        foto1: getCellValue(cells, foto1Index)?.toString() || cells[21]?.v?.toString() || "",
        foto2: getCellValue(cells, foto2Index)?.toString() || cells[22]?.v?.toString() || "",
        foto3: getCellValue(cells, foto3Index)?.toString() || cells[23]?.v?.toString() || "",
        foto4: getCellValue(cells, foto4Index)?.toString() || cells[24]?.v?.toString() || "",
        foto5: getCellValue(cells, foto5Index)?.toString() || cells[25]?.v?.toString() || "",
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
