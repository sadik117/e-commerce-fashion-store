"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FiArrowRight } from "react-icons/fi";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    toast.success("You're on the list!", {
      description: "Look out for exclusive drops and style edits.",
    });
    setEmail("");
  };

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)] to-[var(--background)]" />
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 80% 50%, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[var(--accent)] text-xs tracking-[0.4em] uppercase font-medium mb-4">
            Stay in the Loop
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            Exclusive Access,{" "}
            <span className="italic">First</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Join our inner circle for early access to new collections, curated style edits, and members-only offers.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                suppressHydrationWarning
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] px-5 py-3.5 text-sm rounded-sm outline-none focus:border-[var(--accent)] transition-colors duration-200 font-sans"
              />
              <button
                type="submit"
                className="group bg-[var(--foreground)] hover:bg-[var(--accent)] text-[var(--background)] px-7 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase flex items-center justify-center gap-2 rounded-sm transition-all duration-300"
              >
                Subscribe
                <FiArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[var(--accent)] font-serif text-xl italic"
            >
              Welcome to the circle.
            </motion.div>
          )}

          <p className="text-[10px] text-[var(--muted-foreground)] mt-4 tracking-wider">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
