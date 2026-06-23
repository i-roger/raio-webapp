"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/tools"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function ApoiarPage() {
  const pixKey = "rogercompany1@gmail.com"
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.getElementById("pix-key")
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    }
  }

  return (
    <CalculatorLayout title="Apoiar o Raiolaranja" backHref="/mais">
      <p className="text-muted-foreground">
        Se o Raiolaranja te ajuda nos treinos, considere fazer uma doação
        via Pix. Qualquer valor ajuda a manter o projeto!
      </p>

      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Chave Pix (email)
        </p>
        <p id="pix-key" className="font-mono text-sm select-all">
          {pixKey}
        </p>
      </div>

      <Button onClick={handleCopy} className="w-full">
        {copied ? (
          <>
            <Check className="size-4" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="size-4" />
            Copiar chave Pix
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Pix copia e cola — o valor quem escolhe é você.
      </p>
    </CalculatorLayout>
  )
}
