"use client";

import Link from "next/link";
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Panjabi", href: "/products?category=Panjabi" },
    { label: "Kurta", href: "/products?category=Kurta" },
    { label: "T-Shirts", href: "/products?category=T-Shirt" },
    { label: "Accessories", href: "/products?category=Accessories" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">FH</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-[var(--foreground)]">
                FASHION HUB
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-60 mb-6 max-w-xs">
              Curating premium South Asian fashion for the modern wardrobe. Where tradition meets contemporary elegance.
            </p>
            <div className="flex items-center gap-2 text-sm opacity-60 mb-2">
              <FiMail size={14} />
              <span>hello@oxivos.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-60 mb-6">
              <FiPhone size={14} />
              <span>01688399676</span>
            </div>
            <div className="flex items-center gap-4">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2, opacity: 1 }}
                  className="opacity-50 hover:text-[var(--accent)] transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 opacity-40">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} Luxe Thread by Oxivos. All rights reserved.
          </p>
          <p className="text-xs opacity-40">
            Built with care · oxivos.com
          </p>
        </div>
      </div>
    </footer>
  );
}
