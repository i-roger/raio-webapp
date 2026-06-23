"use client"

import Link from "next/link"
import { ThemeSelect } from "@/components/theme"
import { Container } from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Heart, Info, ChevronRight } from "lucide-react"

const items = [
  {
    href: "/apoiar",
    label: "Apoiar o projeto",
    icon: Heart,
  },
  {
    href: "/sobre",
    label: "Sobre",
    icon: Info,
  },
]

export default function MaisPage() {
  return (
    <Container className="flex flex-col items-center justify-center gap-6 py-12">
      <Card className="w-full max-w-md">
        <ThemeSelect />

        <div className="border-t" />

        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span className="flex items-center gap-3">
              <Icon className="size-5 text-muted-foreground" />
              {label}
            </span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </Card>
    </Container>
  )
}
