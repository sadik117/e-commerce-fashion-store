"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center page-transition">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 py-16"
      >
        <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-4">
          404 Error
        </p>
        <h1 className="font-serif text-6xl sm:text-8xl font-bold text-[var(--foreground)] mb-4">
          Lost?
        </h1>
        <p className="text-[var(--muted-foreground)] text-base mb-8 max-w-sm mx-auto">
          This page doesn't exist. Let's get you back to the good stuff.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--foreground)] hover:bg-[var(--accent)] text-[var(--background)] px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 group"
        >
          Back to Home
          <FiArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
