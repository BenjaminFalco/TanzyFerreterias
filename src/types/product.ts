export interface Product {
  sku: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria: string;
  marca: string;
  unidad: string;
  ubicacion: string;
  barcode: string;
  proveedor: string;
  proveedor_sku: string;
  stock_actual: number;
  stock_reservado: number;
  stock_disponible: number;
  stock_min: number;
  stock_max: number;
  costo_unitario: string;
  precio_venta: string;
  iva_rate: number;
  lead_time_dias: number;
  activo: boolean;
  foto1: string;
  foto2: string;
  foto3: string;
  foto4: string;
  foto5: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}
