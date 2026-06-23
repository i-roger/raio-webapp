"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calculator, ArrowLeftRight, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme"

const links = [
  { href: "/", label: "Início", icon: Home },
  { href: "/calculadoras", label: "Calculadoras", icon: Calculator },
  { href: "/conversoes", label: "Conversões", icon: ArrowLeftRight },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r bg-card md:flex">
      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="size-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight">Raiolaranja</span>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <ThemeToggle className="w-full cursor-pointer" />
        <p className="mt-2 text-xs text-muted-foreground">
          Feito para corredores
        </p>
      </div>
    </aside>
  )
}
