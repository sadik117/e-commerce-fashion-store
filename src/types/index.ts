export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  colors: string[];
  colorHex: Record<string, string>;
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
}
