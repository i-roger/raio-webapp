import Link from "next/link"
import Container from "@/components/layout/Container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftRight } from "lucide-react"

const conversoes = [
  {
    href: "/conversoes/pace-para-kmh",
    title: "Pace → km/h",
    description: "Converta seu pace (min/km) para velocidade em quilômetros por hora.",
  },
  {
    href: "/conversoes/kmh-para-pace",
    title: "km/h → Pace",
    description: "Converta velocidade em km/h para pace (min/km).",
  },
]

export default function Conversoes() {
  return (
    <Container className="pb-24">
      <div className="mb-8 pt-6">
        <h1 className="text-2xl font-bold tracking-tight">Conversões</h1>
        <p className="mt-1 text-muted-foreground">
          Converta entre pace e velocidade.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {conversoes.map(({ href, title, description }) => (
          <Link key={href} href={href}>
            <Card className="h-full transition-colors hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <ArrowLeftRight className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  )
}
