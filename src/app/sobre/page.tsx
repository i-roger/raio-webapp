import { CalculatorLayout } from "@/components/tools"
import { Zap } from "lucide-react"

export default function SobrePage() {
  return (
    <CalculatorLayout title="Sobre o Raiolaranja" backHref="/mais">
      <p className="text-muted-foreground">
        Raiolaranja é um aplicativo web de calculadoras e conversores para
        corrida de rua. Pace, velocidade, distância, tempo e intensidade —
        tudo pensado para ajudar corredores a treinar melhor.
      </p>

      <p className="text-muted-foreground">
        Feito por corredores, para corredores.
      </p>

      <div className="rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
        <p>
          <strong>Stack:</strong> Next.js, Tailwind CSS, shadcn/ui
        </p>
        <p>
          <strong>Versão:</strong> 0.1.0
        </p>
      </div>
    </CalculatorLayout>
  )
}
