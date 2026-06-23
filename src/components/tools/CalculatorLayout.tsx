import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

interface CalculatorLayoutProps {
  title: string
  backHref?: string
  children: ReactNode
}

export default function CalculatorLayout({
  title,
  backHref = '/calculadoras',
  children,
}: CalculatorLayoutProps) {
  return (
    <main className="flex-1 pb-24 pt-4 md:pt-8">
      <div className="mx-auto w-full max-w-md px-4">
        <Link
          href={backHref}
          className="mb-3 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Link>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-center text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {children}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
