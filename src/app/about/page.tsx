"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiAward, FiHeart, FiShield, FiTarget } from "react-icons/fi";

const values = [
  {
    icon: <FiAward className="w-6 h-6 text-[var(--accent)]" />,
    title: "Heritage & Craft",
    description: "Honoring centuries of textile artistry. We source directly from master artisans who maintain traditional handloom and embroidery techniques.",
  },
  {
    icon: <FiShield className="w-6 h-6 text-[var(--accent)]" />,
    title: "Uncompromising Quality",
    description: "From long-staple cotton to pure hand-spun linen, every fabric is selected for its drape, durability, and breathability.",
  },
  {
    icon: <FiTarget className="w-6 h-6 text-[var(--accent)]" />,
    title: "Modern Fit & Style",
    description: "Reimagining classic silhouettes like the Panjabi and Kurta with a modern, relaxed fit tailored for the contemporary global lifestyle.",
  },
];

export default function AboutPage() {
  return (
    <div className="page-transition min-h-screen pt-16 lg:pt-20 bg-[var(--background)]">
      <section className="relative bg-[var(--secondary)] py-14 lg:py-18 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-3"
            >
              Our Philosophy
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight mb-6"
            >
              Where tradition meets <span className="italic font-normal text-[var(--accent)]">contemporary</span> style.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[var(--muted-foreground)] text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Fashion Hub was founded on a simple belief: that traditional South Asian wear should not be reserved solely for formal occasions. We design premium everyday wear that honors heritage while offering contemporary comfort.
            </motion.p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)]" />
        </div>
      </section>

      <section className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[var(--secondary)] shadow-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1485518882345-15568b007407?q=80&w=442&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Artisanal handweaving"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium">
              The Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight">
              Reviving the Art of <span className="italic font-normal">Craftsmanship</span>
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
              Every design starts at the loom. We collaborate directly with artisan clusters, combining generations-old weaving techniques with modern color palettes and structural refinements.
            </p>
            <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
              By working with small-scale weavers, we ensure fair wages, promote ethical sourcing, and preserve local textile arts that are at risk of being lost to fast-fashion automation.
            </p>
            <div className="pt-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-[var(--foreground)] hover:bg-[var(--accent)] text-[var(--background)] px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 rounded-sm hover:gap-5"
              >
                Shop Our Crafts
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--secondary)] py-16 lg:py-20 border-t border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-3">
              How We Create
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
              Our Core <span className="italic font-normal text-[var(--accent)]">Pillars</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[var(--background)] p-8 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 group hover:shadow-sm"
              >
                <div className="w-12 h-12 bg-[var(--secondary)] rounded-sm flex items-center justify-center mb-6 group-hover:bg-[var(--accent)]/10 transition-colors duration-300">
                  {val.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--foreground)] mb-3">
                  {val.title}
                </h3>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium">
              Social Impact
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight">
              Ethical Production, <span className="italic font-normal">Real People</span>
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
              We believe fashion should feel good to wear, and good to make. Our garments are stitched in clean, safe environments by artisans who receive healthcare benefits, pension matching, and skills training.
            </p>
            <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
              Every purchase helps us fund community weavers, keep local traditions alive, and support sustainable wages in rural areas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[var(--secondary)] shadow-sm order-1 lg:order-2"
          >
            <Image
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1000&auto=format&fit=crop"
              alt="Sewing workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
