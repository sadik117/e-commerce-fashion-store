import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { products } from "@/lib/data";
import ImageGallery from "@/components/product-detail/ImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import RelatedProducts from "@/components/product-detail/RelatedProducts";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  return (
    <div className="page-transition min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
            Home
          </Link>
          <FiChevronRight size={12} />
          <Link href="/products" className="hover:text-[var(--foreground)] transition-colors">
            Shop
          </Link>
          <FiChevronRight size={12} />
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-[var(--foreground)] transition-colors"
          >
            {product.category}
          </Link>
          <FiChevronRight size={12} />
          <span className="text-[var(--foreground)] truncate max-w-[180px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ImageGallery images={product.gallery} productName={product.name} />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      <RelatedProducts currentId={product.id} category={product.category} />
    </div>
  );
}
