"use client"

import { useState, useEffect, useCallback } from "react"
import { Copy, Check, Timer, RotateCcw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PaymentStatus from "./PaymentStatus"

interface PixQRCodeProps {
  qrCodeBase64: string
  qrCodeText: string
  paymentId: number
  expiresAt: string
  onExpired: () => void
  onApproved?: () => void
}

function formatCountdown(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

export default function PixQRCode({
  qrCodeBase64,
  qrCodeText,
  paymentId,
  expiresAt,
  onExpired,
  onApproved,
}: PixQRCodeProps) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    return new Date(expiresAt).getTime() - Date.now()
  })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (expired) return

    const tick = () => {
      const remaining = new Date(expiresAt).getTime() - Date.now()
      if (remaining <= 0) {
        setExpired(true)
        setTimeLeft(0)
        return
      }
      setTimeLeft(remaining)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [expiresAt, expired])

  const handleNewQr = useCallback(() => {
    setExpired(false)
    setTimeLeft(new Date(expiresAt).getTime() - Date.now())
    onExpired()
  }, [expiresAt, onExpired])

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

  if (expired) {
    return (
      <div className="space-y-4 py-4 text-center">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
          <Timer className="mx-auto mb-3 size-10 text-destructive" />
          <p className="text-lg font-semibold text-destructive">
            QR Code expirado
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            O tempo para pagamento expirou. Gere um novo QR Code.
          </p>
        </div>
        <Button onClick={handleNewQr} className="w-full">
          <RotateCcw className="size-4" />
          Gerar novo QR Code
        </Button>
      </div>
    )
  }

  const isExpiringSoon = timeLeft < 5 * 60 * 1000

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div
          className={`text-sm font-medium ${
            isExpiringSoon ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          <Timer className="mr-1 inline size-4" />
          Expira em {formatCountdown(timeLeft)}
        </div>
        <Button
          type="button"
          onClick={onExpired}
          variant={"destructive"}
          className="flex items-center border-red-900 gap-1 text-xs font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Cancelar
        </Button>
      </div>

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

      <Button onClick={handleCopy} variant="outline" className="w-full cursor-pointer">
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

      <PaymentStatus paymentId={paymentId} expiresAt={expiresAt} onApproved={onApproved} />
    </div>
  )
}
