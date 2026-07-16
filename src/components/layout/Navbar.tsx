"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiHeart, FiSearch, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/store";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About Us" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isTransparent = !scrolled && !mobileOpen && pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          (scrolled || mobileOpen)
            ? "bg-[var(--background)]/95 backdrop-blur-md shadow-sm border-b border-[var(--border)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-wider">FH</span>
              </div>
              <span
                className={cn(
                  "font-serif text-xl lg:text-2xl font-bold tracking-wide transition-colors duration-200",
                  isTransparent ? "text-white" : "text-[var(--foreground)]"
                )}
                style={{ letterSpacing: "0.05em" }}
              >
                FASHION HUB
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium tracking-widest uppercase transition-colors duration-200",
                    pathname === link.href
                      ? "text-[var(--accent)]"
                      : isTransparent
                        ? "text-white hover:text-[var(--accent)]"
                        : "text-[var(--foreground)] hover:text-[var(--accent)]"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)]"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95, y: -15 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  isTransparent
                    ? "text-white hover:text-[var(--accent)] hover:bg-white/10"
                    : "text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
                )}
                aria-label="Search"
              >
                <FiSearch size={20} />
              </motion.button>

              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95, y: -15 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    isTransparent
                      ? "text-white hover:text-[var(--accent)] hover:bg-white/10"
                      : "text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
                  )}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
                </motion.button>
              )}

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, y: -15 }}>
                <Link
                  href="/wishlist"
                  className={cn(
                    "relative p-2 rounded-full transition-all duration-200 hidden sm:flex",
                    isTransparent
                      ? "text-white hover:text-[var(--accent)] hover:bg-white/10"
                      : "text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
                  )}
                  aria-label="Wishlist"
                >
                  <FiHeart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[var(--accent)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </motion.div>

              <Link
                href="/cart"
                className={cn(
                  "relative p-2 rounded-full transition-all duration-200",
                  isTransparent
                    ? "text-white hover:text-[var(--accent)] hover:bg-white/10"
                    : "text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]"
                )}
                aria-label="Cart"
              >
                <FiShoppingBag size={20} />
                  {mounted && totalItems > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 bg-[var(--accent)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "md:hidden p-2 rounded-full transition-all duration-200",
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                )}
                aria-label="Menu"
              >
                {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md overflow-hidden"
            >
              <form onSubmit={handleSearchSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-3">
                  <FiSearch className="text-[var(--muted-foreground)]" size={18} />
                  <input
                    type="text"
                    placeholder="Search for panjabi, kurta, accessories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none text-sm font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-[var(--border)] bg-[var(--background)]/98 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-base font-medium tracking-widest uppercase py-2 border-b border-[var(--border)] transition-colors",
                      pathname === link.href
                        ? "text-[var(--accent)]"
                        : "text-[var(--foreground)]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium tracking-widest uppercase py-2 border-b border-[var(--border)] text-[var(--foreground)] flex items-center gap-2"
                >
                  Cart {totalItems > 0 && <span className="text-[var(--accent)]">({totalItems})</span>}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
