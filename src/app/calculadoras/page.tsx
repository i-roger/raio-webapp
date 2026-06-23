import Link from "next/link"
import Container from "@/components/layout/Container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer, MapPin, Gauge, Calculator } from "lucide-react"

const calculadoras = [
  {
    href: "/calculadoras/pace-estimado",
    title: "Pace Estimado",
    description: "Descubra seu pace médio a partir da distância percorrida e do tempo gasto.",
    icon: Timer,
  },
  {
    href: "/calculadoras/tempo-estimado",
    title: "Tempo Estimado",
    description: "Calcule quanto tempo levará para completar uma distância no seu pace.",
    icon: Timer,
  },
  {
    href: "/calculadoras/distancia-estimada",
    title: "Distância Estimada",
    description: "Estime a distância percorrida com base no pace e no tempo de atividade.",
    icon: MapPin,
  },
  {
    href: "/calculadoras/intensidade-de-corrida",
    title: "Intensidade de Corrida",
    description: "Ajuste seu pace para diferentes percentuais de intensidade de treino.",
    icon: Gauge,
  },
]

export default function Calculadoras() {
  return (
    <Container className="pb-24">
      <div className="mb-8 pt-6">
        <h1 className="text-2xl font-bold tracking-tight">Calculadoras</h1>
        <p className="mt-1 text-muted-foreground">
          Escolha uma calculadora para começar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {calculadoras.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="h-full transition-colors hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
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
