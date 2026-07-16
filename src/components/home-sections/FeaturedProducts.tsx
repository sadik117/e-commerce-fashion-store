"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { featuredProducts } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="py-10 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Handpicked for You
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight">
            Featured <span className="italic">Pieces</span>
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors group"
        >
          View All
          <FiArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {featuredProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      <div className="sm:hidden mt-8 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 rounded-sm"
        >
          View All Products <FiArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
