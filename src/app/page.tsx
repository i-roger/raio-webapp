import Link from "next/link"
import Container from "@/components/layout/Container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowLeftRight, Zap, Timer, MapPin, Gauge } from "lucide-react"

const tools = [
  {
    href: "/calculadoras",
    title: "Calculadoras",
    description: "Calcule pace, tempo, distância e intensidade dos seus treinos.",
    icon: Calculator,
  },
  {
    href: "/conversoes",
    title: "Conversões",
    description: "Converta entre pace e velocidade (km/h) rapidamente.",
    icon: ArrowLeftRight,
  },
]

const highlights = [
  {
    title: "Pace Estimado",
    description: "Descubra seu pace a partir de distância e tempo.",
    href: "/calculadoras/pace-estimado",
    icon: Timer,
  },
  {
    title: "Tempo Estimado",
    description: "Saiba quanto tempo vai levar para completar uma distância.",
    href: "/calculadoras/tempo-estimado",
    icon: Timer,
  },
  {
    title: "Distância Estimada",
    description: "Calcule a distância percorrida com base no pace e tempo.",
    href: "/calculadoras/distancia-estimada",
    icon: Timer,
  },
  {
    title: "Intensidade",
    description: "Ajuste seu pace para diferentes percentuais de esforço.",
    href: "/calculadoras/intensidade-de-corrida",
    icon: Gauge,
  },
  {
    title: "Pace → km/h",
    description: "Converta seu pace para velocidade em km/h.",
    href: "/conversoes/pace-para-kmh",
    icon: ArrowLeftRight,
  },
  {
    title: "km/h → Pace",
    description: "Converta velocidade em km/h para pace.",
    href: "/conversoes/kmh-para-pace",
    icon: ArrowLeftRight,
  },
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pb-16 pt-16 md:pb-20 md:pt-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                <Zap className="size-8 text-primary-foreground" />
                {/* <img src="favicon.ico"/> */}
              </div>
            </div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
              Raiolaranja
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Ferramentas simples e rápidas para corredores. Calcule pace, tempo,
              distância e muito mais.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/calculadoras">
                <Button size="lg" className="w-full sm:w-auto gap-2 cursor-pointer">
                  <Calculator className="size-5" />
                  Calculadoras
                </Button>
              </Link>
              <Link href="/conversoes">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 cursor-pointer">
                  <ArrowLeftRight className="size-5" />
                  Conversões
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pb-24">
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full transition-colors hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          Ferramentas rápidas
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Card className="h-full transition-colors hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <CardTitle className="text-sm">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </Container>
    </>
  )
}
