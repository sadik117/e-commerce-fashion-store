"use client";

import { ThemeProvider, type ThemeProviderProps } from "next-themes";
import type { ReactNode } from "react";

export default function ThemeProvide({
  children,
  ...props
}: ThemeProviderProps & { children: ReactNode }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
