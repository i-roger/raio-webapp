"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import PaymentStatus from "./PaymentStatus"

interface PixQRCodeProps {
  qrCodeBase64: string
  qrCodeText: string
  paymentId: number
}

export default function PixQRCode({
  qrCodeBase64,
  qrCodeText,
  paymentId,
}: PixQRCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = qrCodeText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        {qrCodeBase64 ? (
          <img
            src={`data:image/png;base64,${qrCodeBase64}`}
            alt="QR Code Pix"
            className="size-48 rounded-lg"
          />
        ) : (
          <div className="flex size-48 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
            QR Code indisponível
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-center text-xs text-muted-foreground">
          Ou copie o código Pix abaixo:
        </p>
        <div className="rounded-lg border bg-muted/50 p-3">
          <p className="break-all text-center font-mono text-xs select-all">
            {qrCodeText}
          </p>
        </div>
      </div>

      <Button onClick={handleCopy} variant="outline" className="w-full">
        {copied ? (
          <>
            <Check className="size-4" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="size-4" />
            Copiar código Pix
          </>
        )}
      </Button>

      <PaymentStatus paymentId={paymentId} />
    </div>
  )
}
