import { products } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";

interface RelatedProductsProps {
  currentId: number;
  category: string;
}

export default function RelatedProducts({ currentId, category }: RelatedProductsProps) {
  const related = products
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 4);
 
  if (related.length === 0) return null;

  return (
    <section className="py-20 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-2">
            You May Also Like
          </p>
          <h2 className="font-serif text-3xl font-bold text-[var(--foreground)]">
            More {category}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {related.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
