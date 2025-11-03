// filepath: s:\Programming Materials\Web Development\Mega Project\kaushalsetu\components\theme-provider.jsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}