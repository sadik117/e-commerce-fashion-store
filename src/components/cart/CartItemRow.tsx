"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
  index: number;
}

export default function CartItemRow({ item, index }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="flex items-start gap-4 py-6 border-b border-[var(--border)] last:border-0"
    >
      <Link href={`/products/${item.product.id}`} className="relative w-24 h-32 flex-shrink-0 rounded-sm overflow-hidden bg-[var(--secondary)]">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="96px"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted-foreground)] mb-1">
          {item.product.category}
        </p>
        <Link href={`/products/${item.product.id}`}>
          <h3 className="font-medium text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition-colors line-clamp-2 mb-2">
            {item.product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full border border-[var(--border)]"
              style={{ backgroundColor: item.product.colorHex[item.selectedColor] }}
            />
            <span className="text-xs text-[var(--muted-foreground)]">{item.selectedColor}</span>
          </div>
          <span className="text-[var(--border)]">·</span>
          <span className="text-xs text-[var(--muted-foreground)]">{item.selectedSize}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center border border-[var(--border)] rounded-sm">
            <button
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.selectedSize,
                  item.selectedColor,
                  item.quantity - 1
                )
              }
              className="w-8 h-8 flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              aria-label="Decrease quantity"
            >
              <FiMinus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-[var(--foreground)]">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.selectedSize,
                  item.selectedColor,
                  item.quantity + 1
                )
              }
              className="w-8 h-8 flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus size={12} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-[var(--foreground)]">
              {formatPrice(item.product.price * item.quantity)}
            </span>
            <button
              onClick={() =>
                removeItem(
                  item.product.id,
                  item.selectedSize,
                  item.selectedColor
                )
              }
              className="text-[var(--muted-foreground)] hover:text-red-500 transition-colors p-1"
              aria-label="Remove item"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
