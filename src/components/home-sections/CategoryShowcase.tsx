"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Panjabi",
    label: "Heritage Panjabi",
    sub: "Classic to Contemporary",
    image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&auto=format&fit=crop",
    href: "/products?category=Panjabi",
    size: "large",
  },
  {
    name: "Kurta",
    label: "Kurta Collection",
    sub: "Effortless Everyday",
    image: "https://images.unsplash.com/photo-1589363460779-cd717d2ed8fa?w=800&auto=format&fit=crop",
    href: "/products?category=Kurta",
    size: "small",
  },
  {
    name: "T-Shirt",
    label: "Modern Basics",
    sub: "Street to Studio",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
    href: "/products?category=T-Shirt",
    size: "small",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-14 bg-[var(--secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-3">
            Browse by Style
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            Shop by <span className="italic">Category</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link href={categories[0].href} className="group relative block overflow-hidden rounded-lg aspect-[4/5] md:aspect-auto md:h-full min-h-[400px]">
              <Image
                src={categories[0].image}
                alt={categories[0].label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/60 text-xs tracking-[0.25em] uppercase mb-1">{categories[0].sub}</p>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">{categories[0].label}</h3>
                <span className="inline-flex items-center text-xs font-semibold tracking-[0.2em] uppercase text-white border-b border-white/40 pb-0.5 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  Explore 
                </span>
              </div>
            </Link>
          </motion.div>

          <div className="flex flex-col gap-4 md:gap-6">
            {categories.slice(1).map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex-1"
              >
                <Link href={cat.href} className="group relative block overflow-hidden rounded-lg aspect-[16/9] md:aspect-auto md:h-full min-h-[190px]">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white/60 text-[10px] tracking-[0.25em] uppercase mb-1">{cat.sub}</p>
                    <h3 className="font-serif text-lg font-bold text-white mb-2">{cat.label}</h3>
                    <span className="inline-flex items-center text-xs font-semibold tracking-[0.2em] uppercase text-white border-b border-white/40 pb-0.5 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors duration-300">
                      Explore 
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {["Kurta Pajama", "Accessories"].map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              className="border border-[var(--border)] bg-[var(--background)] px-6 py-3 text-sm font-medium text-[var(--foreground)] rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
            >
              {cat}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
