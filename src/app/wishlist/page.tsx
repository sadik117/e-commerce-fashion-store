"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { useWishlistStore } from "@/lib/store";
import ProductCard from "@/components/products/ProductCard";

export default function WishlistPage() {
  const { items: wishlistItems } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center bg-[var(--background)]">
        <div className="animate-pulse space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--muted)] mx-auto" />
          <div className="h-4 w-32 bg-[var(--muted)] rounded mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen pt-16 lg:pt-20 bg-[var(--background)]">
      <div className="bg-[var(--secondary)] py-8 lg:py-8 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-2">
              Your Favorites
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--foreground)]">
              Wishlist
            </h1>
            <p className="text-[var(--muted-foreground)] mt-3 text-sm">
              {wishlistItems.length} {wishlistItems.length === 1 ? "curated piece" : "curated pieces"} saved
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="popLayout">
          {wishlistItems.length > 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {wishlistItems.map((product, i) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-md mx-auto text-center "
            >
              <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--muted-foreground)]">
                <FiHeart size={28} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm mb-8 leading-relaxed">
                Save pieces you love to your wishlist to keep track of them, get size availability alerts, and add them directly to your wardrobe.
              </p>
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-[var(--foreground)] hover:bg-[var(--accent)] text-[var(--background)] px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 rounded-sm hover:gap-5"
              >
                Explore Collection
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
