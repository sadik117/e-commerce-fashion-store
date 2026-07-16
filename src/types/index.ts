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

export interface ProductCardProps {
  product: Product;
  index?: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export interface WishlistStore {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
}
