<div align="center">

<h1>
  <img src="https://raw.githubusercontent.com/sadik117/e-commerce-fashion-store/main/src/app/favicon.ico" width="32" alt="Fashion Hub logo" />
  &nbsp;Fashion Hub
</h1>

<p>
  <strong>A premium South Asian fashion e-commerce storefront</strong><br/>
  Built with TypeScript 5 · Next.js 16 · Tailwind CSS v4 · Framer Motion · Zustand
</p>

<p>
  <a href="https://fashion-hub-three-theta.vercel.app" target="_blank">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://github.com/sadik117/e-commerce-fashion-store" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  &nbsp;
</p>

<br/>

</div>

---

## ✨ Overview

**Fashion Hub** is a fully client-rendered, production-ready fashion e-commerce application that blends the timeless elegance of South Asian textiles—Panjabis, Kurtas, and accessories—with a sleek, modern web experience. It demonstrates real-world patterns including persistent state management, adaptive theming, animated UI, and server/client-safe rendering.

> _"Where tradition meets contemporary style."_

---

## 🖥️ Live Preview

| Page | URL |
|---|---|
| 🏠 Homepage | [fashion-hub-three-theta.vercel.app](https://fashion-hub-three-theta.vercel.app) |
| 🛍️ Products | [.../products](https://fashion-hub-three-theta.vercel.app/products) |
| 🛒 Cart | [.../cart](https://fashion-hub-three-theta.vercel.app/cart) |
| 💖 Wishlist | [.../wishlist](https://fashion-hub-three-theta.vercel.app/wishlist) |
| ℹ️ About | [.../about](https://fashion-hub-three-theta.vercel.app/about) |

---

## 🚀 Key Features

### 🎨 Design & UX
- **Dark-first theming** — Premium dark mode by default with a polished light mode toggle
- **Adaptive Navbar** — Transparent and white-text over the fullscreen hero; switches to themed background on scroll or other pages
- **Framer Motion animations** — Staggered entrance animations, hover/tap micro-interactions, and smooth page transitions throughout
- **Responsive layout** — Fully optimised from mobile (`320px`) through ultrawide desktop (`1920px+`)
- **Glassmorphism & gradients** — Used strategically in hero overlays, badges, and modals for visual depth

### 🛒 Shopping Experience
- **Product Catalogue** — Browsable product grid with live client-side filtering by category, size, color, and price range via a Radix UI Slider
- **Product Detail Page** — Full-page view with image, size/color selector, add-to-cart, and wishlist toggle
- **Persistent Shopping Cart** — Cookie-backed cart that survives page refreshes and browser restarts (3-day TTL)
- **Wishlist** — Toggle-based wishlist with the same cookie persistence strategy
- **Cart Drawer / Page** — Quantity management, item removal, order summary, and subtotal calculation
- **Toast Notifications** — Instant feedback on add-to-cart, wishlist changes, and newsletter signup via `sonner`

### 🏗️ Architecture
- **Zustand stores** — Lightweight, composable global state for cart and wishlist with SSR-safe cookie storage middleware
- **Cookie persistence** — `createJSONStorage` with a custom `cookieStorage` adapter; partial state hydration reconstructs full product objects from stored IDs
- **Hydration-safe rendering** — `mounted` guards and `suppressHydrationWarning` prevent SSR/CSR mismatches from theme or cart state
- **ThemeProvider isolation** — `next-themes` wrapped in a dedicated `"use client"` boundary (`ThemeProvider.tsx`) so `layout.tsx` remains a pure Server Component

### ♿ Accessibility & SEO
- **Semantic HTML5** — Proper `<nav>`, `<main>`, `<section>`, `<article>` usage
- **Unique element IDs** — All interactive controls have descriptive IDs
- **Metadata API** — Per-page `title` and `description` via Next.js 16 Metadata API
- **`next/image`** — All images use `<Image>` with `priority`, `sizes`, and `alt` attributes

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | SSR, routing, metadata, image optimisation |
| **Language** | TypeScript 5 | Type safety across the entire codebase |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with CSS variable design tokens |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) | Page transitions, entrance/exit animations, gestures |
| **State** | [Zustand 5](https://zustand-demo.pmnd.rs/) | Cart & wishlist stores with persistence middleware |
| **Persistence** | Cookie Storage (custom adapter) | SSR-compatible state hydration |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) | Dark / light mode with zero-flash |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) | Dialog, Select, Slider, Tabs, Tooltip |
| **Icons** | [Lucide React](https://lucide.dev/) · [React Icons](https://react-icons.github.io/react-icons/) | Consistent iconography |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Beautiful, accessible toast messages |
| **Fonts** | Inter · Playfair Display (Google Fonts) | Dual-typeface: sans-serif + serif personality |
| **Deployment** | [Vercel](https://vercel.com/) | Zero-config edge deployment |

---

## 📂 Project Structure

```
fashion-store-oxivos/
├── public/                        # Static assets (favicon, images)
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout — fonts, ThemeProvider, Toaster
│   │   ├── page.tsx               # Homepage (Hero + Featured + Categories + Newsletter)
│   │   ├── about/page.tsx         # Brand story & values page
│   │   ├── cart/page.tsx          # Shopping cart page
│   │   ├── wishlist/page.tsx      # Saved items page
│   │   ├── products/
│   │   │   ├── page.tsx           # Server-rendered products shell + metadata
│   │   │   ├── ProductsPageClient.tsx  # Client filtering, sorting, search
│   │   │   └── [id]/page.tsx      # Dynamic product detail page
│   │   ├── globals.css            # CSS variables, base styles, design tokens
│   │   └── not-found.tsx          # Custom 404 page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Adaptive navbar (transparent → solid on scroll)
│   │   │   └── Footer.tsx         # Site footer with links and newsletter teaser
│   │   ├── home-sections/
│   │   │   ├── HeroSection.tsx    # Fullscreen hero with animated text + stats
│   │   │   ├── FeaturedProducts.tsx  # Curated product grid
│   │   │   ├── CategoryShowcase.tsx  # Visual category cards
│   │   │   └── NewsletterSection.tsx # Email signup with toast feedback
│   │   ├── product-detail/        # Size selector, color picker, add-to-cart
│   │   ├── products/              # ProductCard, filter sidebar components
│   │   ├── cart/                  # CartItem, CartSummary components
│   │   └── ui/
│   │       ├── ThemeProvider.tsx  # "use client" boundary for next-themes
│   │       └── SkeletonCard.tsx   # Loading skeleton for product cards
│   │
│   ├── lib/
│   │   ├── data.ts                # Product catalogue (mock data)
│   │   ├── store.ts               # Zustand cart & wishlist stores
│   │   └── utils.ts               # cn() helper (clsx + tailwind-merge)
│   │
│   └── types/                     # Shared TypeScript interfaces
│       └── index.ts               # Product, CartItem, CartStore, WishlistStore
│
├── next.config.ts                 # Next.js config (image domains, etc.)
├── tsconfig.json
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9 (or pnpm / yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/sadik117/e-commerce-fashion-store.git
cd e-commerce-fashion-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page auto-updates on file changes.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🧩 Core Architecture Deep-Dive

### State Management — Zustand + Cookie Persistence

Cart and wishlist state live in two Zustand stores (`useCartStore`, `useWishlistStore`) defined in [`src/lib/store.ts`](./src/lib/store.ts). Both use a **custom `cookieStorage` adapter** instead of `localStorage`, making state accessible on the server for future SSR use cases.

```
State hydration flow:
  Cookie (IDs only) → merge() → lookup full Product objects → hydrated store
```

Only minimal data (product IDs, quantity, size, color) is written to cookies, keeping the payload small. On hydration, the `merge` function cross-references the stored IDs against the product catalogue to recompose full objects.

### Theme System

`next-themes` is isolated inside [`src/components/ui/ThemeProvider.tsx`](./src/components/ui/ThemeProvider.tsx) using `"use client"`. The root [`layout.tsx`](./src/app/layout.tsx) remains a Server Component, which is required by Next.js App Router architecture.

CSS design tokens are defined as CSS custom properties in `globals.css`:

```css
/* Dark theme (default) */
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
  --accent: #c8a96e;   /* Gold — the brand signature color */
  ...
}

/* Light theme */
.light {
  --background: #ffffff;
  --foreground: #171717;
  ...
}
```

All components reference `var(--token)` directly — zero hardcoded colors.

### Adaptive Navbar

The [`Navbar.tsx`](./src/components/layout/Navbar.tsx) uses an `isTransparent` computed state that is `true` when:
1. The user is on the homepage **AND**
2. Has scrolled less than 10px **AND**
3. The mobile menu is closed

When transparent, text and icons are forced white to contrast against the dark hero background. On all other pages or scroll positions, the navbar uses the theme's surface colors.

### Hydration Safety

Client-only state (cart count badge, theme toggle state) is guarded by a `mounted` boolean that is `false` during SSR and flips to `true` after the first client render via `useEffect`. This prevents React hydration mismatches.

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

// Only render client-sensitive UI after hydration
{mounted && totalItems > 0 && (
  <span className="cart-badge">{totalItems}</span>
)}
```

---

## 🗺️ Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Featured Products, Category Showcase, Newsletter |
| `/products` | Full catalogue with filter sidebar (category, size, color, price) |
| `/products/[id]` | Individual product detail — images, variants, add-to-cart |
| `/cart` | Shopping cart — quantity management, subtotals, checkout CTA |
| `/wishlist` | Saved products grid — move to cart or remove |
| `/about` | Brand story, values, craftsmanship philosophy, social impact |

---

## 🎨 Design Language

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#c8a96e` (Gold) | CTAs, highlights, brand accents |
| Primary font | **Inter** | Body text, UI labels |
| Display font | **Playfair Display** | Headlines, serif personality |
| Motion easing | `spring` / `ease-out` | Entrance animations |
| Border radius | `rounded-sm` / `rounded-lg` | Cards, buttons, modals |

---

## 🚢 Deployment

The project is deployed on **Vercel** with zero configuration.

```bash
# Deploy to production
vercel --prod
```

Every push to `main` triggers an automatic production deployment via Vercel's Git integration.

---

## 📄 License

This project is open-source and available under the [MIT License](./LICENSE).

---

<div align="center">

Made with ❤️ by **Sadik Sourov**

[Live Site](https://fashion-lmiwwvoik-sadik-sourovs-projects.vercel.app) · [GitHub](https://github.com/sadik117/e-commerce-fashion-store)

</div>
