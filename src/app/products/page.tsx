import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsPageClient from "./ProductsPageClient";
import SkeletonCard from "@/components/ui/SkeletonCard";

export const metadata: Metadata = {
  title: "Shop All Styles",
  description:
    "Browse our full collection of premium panjabi, kurta, t-shirts, and accessories. Filter by category and sort by price or rating.",
};

function ProductsPageFallback() {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-[var(--secondary)] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-4 w-32 rounded mb-3" />
          <div className="skeleton h-10 w-64 rounded" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageFallback />}>
      <ProductsPageClient />
    </Suspense>
  );
}
