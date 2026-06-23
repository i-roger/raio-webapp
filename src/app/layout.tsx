import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/layout"
import { MobileNav } from "@/components/layout"
import { ThemeToggle } from "@/components/theme"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

export const metadata: Metadata = {
  title: "Raiolaranja",
  description: "Calculadoras e conversores para corrida de rua. Pace, velocidade, distância, tempo e intensidade.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${sora.variable} min-h-screen bg-background font-sans antialiased`}>
        <Sidebar />
        <div className="pb-16 md:pl-60">
          {children}
        </div>
        <MobileNav />

        <div className="fixed bottom-20 right-4 z-50 md:hidden">
          <ThemeToggle className="rounded-full border bg-background p-2.5 shadow-sm" />
        </div>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
