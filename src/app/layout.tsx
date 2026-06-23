import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import "./glass.css"
import { Sidebar, MobileNav } from "@/components/layout"
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
  manifest: '/manifest.json',
  icons: {
      apple: '/apple-touch-icon.png'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Raiolaranja',
  }
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
        <div className="pb-[calc(80px+max(16px,var(--safe-area-bottom)))] md:pl-60">
          {children}
        </div>
        <MobileNav />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
