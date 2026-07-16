"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiShoppingBag, FiHeart, FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Product } from "@/types";
import { toast } from "sonner";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedAnim, setAddedAnim] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
    toast.success(`Added to cart!`, {
      description: `${product.name} · ${selectedSize} · ${selectedColor}`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 flex-wrap">
        {product.isNew && (
          <span className="bg-[var(--foreground)] text-[var(--background)] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm">
            New Arrival
          </span>
        )}
        {product.isSale && product.originalPrice && (
          <span className="bg-[var(--accent)] text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm">
            {calculateDiscount(product.price, product.originalPrice)}% Off
          </span>
        )}
        {!product.inStock && (
          <span className="bg-gray-500 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm">
            Out of Stock
          </span>
        )}
      </div>

      <p className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase font-medium">
        {product.category}
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight">
        {product.name}
      </h1>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={14}
              className={
                star <= Math.round(product.rating)
                  ? "fill-[var(--accent)] text-[var(--accent)]"
                  : "text-[var(--border)]"
              }
            />
          ))}
        </div>
        <span className="text-sm text-[var(--muted-foreground)]">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-serif text-3xl font-bold text-[var(--foreground)]">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-base text-[var(--muted-foreground)] line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </div>

      <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
        {product.description}
      </p>

      <div className="h-px bg-[var(--border)]" />

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[var(--foreground)] tracking-wide">
            Color
          </span>
          <span className="text-sm text-[var(--muted-foreground)]">{selectedColor}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              title={color}
              className={`relative w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color
                  ? "border-[var(--accent)] scale-110 shadow-md"
                  : "border-[var(--border)] hover:border-[var(--foreground)]"
              }`}
              style={{ backgroundColor: product.colorHex[color] }}
              aria-label={color}
            >
              {selectedColor === color && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <FiCheck
                    size={12}
                    className={
                      product.colorHex[color] === "#FAFAFA" ||
                      product.colorHex[color] === "#FFFFF0" ||
                      product.colorHex[color] === "#FAF9F6" ||
                      product.colorHex[color] === "#F5F5F0"
                        ? "text-black"
                        : "text-white"
                    }
                  />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[var(--foreground)] tracking-wide">
            Size
          </span>
          <button className="text-xs text-[var(--accent)] underline underline-offset-2">
            Size Guide
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-[44px] h-10 px-3 text-sm font-medium border rounded-sm transition-all duration-200 ${
                selectedSize === size
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                  : "bg-transparent text-[var(--foreground)] border-[var(--border)] hover:border-[var(--foreground)]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm font-semibold text-[var(--foreground)] tracking-wide block mb-3">
          Quantity
        </span>
        <div className="inline-flex items-center border border-[var(--border)] rounded-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            <FiMinus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-medium text-[var(--foreground)]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          >
            <FiPlus size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <motion.button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          whileTap={{ scale: 0.97 }}
          className={`flex-1 py-4 text-sm font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 rounded-sm transition-all duration-300 ${
            addedAnim
              ? "bg-green-600 text-white"
              : "bg-[var(--foreground)] hover:bg-[var(--accent)] text-[var(--background)]"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {addedAnim ? (
            <>
              <FiCheck size={16} /> Added!
            </>
          ) : (
            <>
              <FiShoppingBag size={16} /> Add to Cart
            </>
          )}
        </motion.button>

        <button
          onClick={() => {
            toggleWishlist(product);
            toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist", {
              icon: wishlisted ? (
                <FaHeart size={14} className="text-[var(--accent)]" />
              ) : (
                <FiHeart size={14} className="text-[var(--foreground)]" />
              ),
            });
          }}
          className="w-14 h-14 border border-[var(--border)] rounded-sm flex items-center justify-center text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
          aria-label="Wishlist"
        >
          {wishlisted ? (
            <FaHeart size={18} className="text-[var(--accent)]" />
          ) : (
            <FiHeart size={18} />
          )}
        </button>
      </div>

      {product.details.length > 0 && (
        <>
          <div className="h-px bg-[var(--border)]" />
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-wide mb-3">
              Product Details
            </h3>
            <ul className="space-y-2">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                  <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">·</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
