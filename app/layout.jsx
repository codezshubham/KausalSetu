import { Inter } from "next/font/google"
import "./globals.css"
import { NextAuthProvider } from "@/components/Providers"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Chatbot from "@/components/Chatbot"
import StoreProvider from "@/app/StoreProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "KaushalSetu - Career Guidance Platform",
  description: "Personalized career and education advisor for students",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className="pt-16">
                {children}
              </main>
              <Chatbot />
              {/* <Footer /> */}
            </ThemeProvider>
          </NextAuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}