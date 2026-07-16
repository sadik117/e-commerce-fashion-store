"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiSliders } from "react-icons/fi";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { FaSearch } from "react-icons/fa";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "newest";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "All"
  );
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeOut = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timeOut);
  }, [selectedCategory, sortBy, searchQuery]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
    }
    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="page-transition min-h-screen pt-16 lg:pt-18">
      <div className="bg-[var(--secondary)] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-2">
              Our Collection
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--foreground)]">
              Shop All Styles
            </h1>
            <p className="text-[var(--muted-foreground)] mt-2 text-sm">
              {products.length} curated pieces for the modern wardrobe
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase rounded-sm transition-all duration-200 border ${
                  selectedCategory === cat
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "bg-transparent text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <FiSearch
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
              />
              <input
                type="text"
                placeholder="Search Here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm pl-9 pr-8 py-2.5 rounded-sm outline-none focus:border-[var(--accent)] transition-colors font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <FiX size={12} />
                </button>
              )}
            </div>

            <div className="relative">
              <FiSliders
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm pl-8 pr-8 py-2.5 rounded-sm outline-none focus:border-[var(--accent)] transition-colors cursor-pointer appearance-none font-sans"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--muted-foreground)]">
            {loading ? "Filtering..." : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
            {selectedCategory !== "All" && !loading && (
              <span> in <span className="text-[var(--foreground)] font-medium">{selectedCategory}</span></span>
            )}
          </p>
          {(selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="text-xs text-[var(--accent)] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-4"><FaSearch /></div>
              <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-2">
                No products found
              </h3>
              <p className="text-[var(--muted-foreground)] text-sm mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 rounded-sm"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
