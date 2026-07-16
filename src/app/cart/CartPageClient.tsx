"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiArrowRight, FiTrash2, FiInfo } from "react-icons/fi";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import CartItemRow from "@/components/cart/CartItemRow";
import { toast } from "sonner";

export default function CartPageClient() {
  const { items, clearCart, totalPrice } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal > 2000 ? 0 : 120;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center page-transition">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 px-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-block mb-8"
          >
            <div className="w-24 h-24 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto">
              <FiShoppingBag size={36} className="text-[var(--muted-foreground)]" />
            </div>
          </motion.div>

          <h1 className="font-serif text-4xl font-bold text-[var(--foreground)] mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-[var(--muted-foreground)] text-base mb-8 max-w-sm mx-auto leading-relaxed">
            Looks like you haven't added any items yet. Explore our curated collection to find your next statement piece.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[var(--foreground)] hover:bg-[var(--accent)] text-[var(--background)] px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 group"
          >
            Continue Shopping
            <FiArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 page-transition">
      <div className="bg-[var(--secondary)] py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-2">
            Review Order
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--foreground)]">
            Your Cart
          </h1>
          <p className="text-[var(--muted-foreground)] mt-2 text-sm">
            {items.reduce((sum, i) => sum + i.quantity, 0)} item{items.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)]">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--foreground)]">
                Items
              </h2>
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
              >
                <FiTrash2 size={12} />
                Clear All
              </button>
            </div>

            <AnimatePresence>
              {items.map((item, i) => (
                <CartItemRow
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  item={item}
                  index={i}
                />
              ))}
            </AnimatePresence>

            <div className="mt-8">
              <Link
                href="/products"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[var(--secondary)] rounded-lg p-6 sticky top-24">
              <h2 className="font-serif text-xl font-bold text-[var(--foreground)] mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Subtotal</span>
                  <span className="font-medium text-[var(--foreground)]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-[var(--foreground)]"}`}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[var(--muted-foreground)] flex items-start gap-1.5">
                    <FiInfo size={11} className="mt-0.5 flex-shrink-0" />
                    Free shipping on orders over ৳2,000
                  </p>
                )}
              </div>

              <div className="h-px bg-[var(--border)] mb-6" />

              <div className="flex justify-between items-center mb-8">
                <span className="font-semibold text-[var(--foreground)]">Total</span>
                <span className="font-serif text-2xl font-bold text-[var(--foreground)]">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="relative group">
                <button
                  onClick={() => toast.error("Checkout coming soon")}
                  className="w-full bg-[var(--foreground)] text-[var(--background)] py-4 text-sm font-semibold tracking-[0.15em] uppercase rounded-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <FiArrowRight size={14} />
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)] grid grid-cols-3 gap-3 text-center">
                {[" Secure", "Fast Delivery", " Easy Returns"].map((badge) => (
                  <div key={badge} className="text-[10px] text-[var(--muted-foreground)] leading-tight">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
