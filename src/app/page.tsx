import type { Metadata } from "next";
import HeroSection from "@/components/home-sections/HeroSection";
import FeaturedProducts from "@/components/home-sections/FeaturedProducts";
import CategoryShowcase from "@/components/home-sections/CategoryShowcase";
import NewsletterSection from "@/components/home-sections/NewsletterSection";

export const metadata: Metadata = {
  title: "Fashion Hub – Premium Fashion Store",
  description:
    "Discover premium panjabi, kurta, and fashion accessories. Curated fashion for the modern world.",
  keywords: ["fashion", "clothing", "accessories", "panjabi", "kurta"],
};

export default function HomePage() {
  return (
    <div className="page-transition">
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <NewsletterSection />
    </div>
  );
}
