import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { CartItem, Product, CartStore, WishlistStore } from "@/types";
import { products } from "./data";


const cookieStorage: StateStorage = {
  getItem: (name) => {
    if (typeof document === "undefined") return null;
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    return value ? decodeURIComponent(value) : null;
  },
  setItem: (name, value) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${
      3 * 24 * 60 * 60
    }; path=/; sameSite=lax`;
  },
  removeItem: (name) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; max-age=0; path=/; sameSite=lax`;
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color) => {
        const existing = get().items.find(
          (i) =>
            i.product.id === product.id &&
            i.selectedSize === size &&
            i.selectedColor === color
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product.id === product.id &&
              i.selectedSize === size &&
              i.selectedColor === color
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              { product, quantity: 1, selectedSize: size, selectedColor: color },
            ],
          });
        }
      },
      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) =>
              !(
                i.product.id === productId &&
                i.selectedSize === size &&
                i.selectedColor === color
              )
          ),
        });
      },
      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId &&
            i.selectedSize === size &&
            i.selectedColor === color
              ? { ...i, quantity }
              : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: "fashion-hub-cart",
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        items: state.items.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
      }),
      merge: (persistedState: any, currentState) => {
        const persistedItems = persistedState?.items || [];
        const mergedItems = persistedItems
          .map((pi: any) => {
            const product = products.find((p) => p.id === pi.id);
            if (!product) return null;
            return {
              product,
              quantity: pi.quantity,
              selectedSize: pi.selectedSize,
              selectedColor: pi.selectedColor,
            };
          })
          .filter(Boolean) as CartItem[];
        return {
          ...currentState,
          items: mergedItems,
        };
      },
    }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        if (exists) {
          set({ items: get().items.filter((p) => p.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      isWishlisted: (productId) => get().items.some((p) => p.id === productId),
    }),
    {
      name: "fashion-hub-wishlist",
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        items: state.items.map((p) => p.id),
      }),
      merge: (persistedState: any, currentState) => {
        const persistedIds = persistedState?.items || [];
        const mergedItems = persistedIds
          .map((id: number) => products.find((p) => p.id === id))
          .filter(Boolean) as Product[];
        return {
          ...currentState,
          items: mergedItems,
        };
      },
    }
  )
);
