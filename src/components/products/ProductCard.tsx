"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Product, ProductCardProps } from "@/types";
import { toast } from "sonner";


export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart`, {
      description: `${product.sizes[0]} · ${product.colors[0]}`,
      duration: 2500,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: wishlisted ? <FaHeartBroken size={14} className="text-[var(--accent)]" /> : <FaHeart size={14} className="text-[var(--accent)]" />,
      duration: 1800,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-[var(--secondary)] aspect-[3/4]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-[var(--foreground)] text-[var(--background)] text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded-sm">
                New
              </span>
            )}
            {product.isSale && product.originalPrice && (
              <span className="bg-[var(--accent)] text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded-sm">
                -{calculateDiscount(product.price, product.originalPrice)}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded-sm">
                Sold Out
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className="w-9 h-9 bg-[var(--background)]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:bg-[var(--background)]"
              aria-label="Add to wishlist"
            >
              {wishlisted ? (
                <FaHeart size={14} className="text-[var(--accent)]" />
              ) : (
                <FiHeart size={14} className="text-[var(--foreground)]" />
              )}
            </motion.button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-[var(--foreground)] text-[var(--background)] py-3 text-xs font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-[var(--accent)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingBag size={14} />
              Quick Add
            </button>
          </div>
        </div>

        <div className="pt-3 pb-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted-foreground)] mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-sm text-[var(--foreground)] line-clamp-1 group-hover:text-[var(--accent)] transition-colors duration-200">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-[var(--foreground)]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[var(--muted-foreground)] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <FiStar size={11} className="fill-[var(--accent)] text-[var(--accent)]" />
              <span className="text-[11px] text-[var(--muted-foreground)]">
                {product.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color}
                title={color}
                style={{ backgroundColor: product.colorHex[color] }}
                className="w-3 h-3 rounded-full border border-[var(--border)] shadow-sm"
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[var(--muted-foreground)]">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
