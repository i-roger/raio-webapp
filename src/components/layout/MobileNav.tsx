"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calculator, ArrowLeftRight } from "lucide-react"

const links = [
  { href: "/", label: "Início", icon: Home },
  { href: "/calculadoras", label: "Calculadoras", icon: Calculator },
  { href: "/conversoes", label: "Conversões", icon: ArrowLeftRight },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/80 backdrop-blur-xl md:hidden">
      <div className="flex">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex size-6 items-center justify-center">
                <Icon className={`size-5 ${isActive ? "scale-110" : ""}`} />
              </div>
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
