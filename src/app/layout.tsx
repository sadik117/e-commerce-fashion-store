import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Toaster } from "sonner";
import { Inter, Playfair_Display } from "next/font/google";
import ThemeProvider from "@/components/ui/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
                fontFamily: "Inter, sans-serif",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
