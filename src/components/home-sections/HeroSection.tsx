"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1769509456084-dacd3cde0e20?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero-banner"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-4"
          >
            New Collection · 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6"
          >
            Wear the{" "}
            <span className="italic text-[var(--accent)]">Art</span>
            <br />
            of Tradition
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
          >
            Premium fashion curated for the modern world. Where heritage craft meets contemporary style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:gap-5"
            >
              Shop Collection
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products?category=Panjabi"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
            >
              Panjabi Edit
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-wrap items-center gap-6 sm:gap-12 mt-4 sm:mt-6 mb-6"
          >
            {[
              { label: "Products", value: "12+" },
              { label: "Categories", value: "5+" },
              { label: "Happy Customers", value: "2K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-serif font-bold text-white">{stat.value}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
