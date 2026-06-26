"use client"

import { useEffect, useState } from "react"
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react"

interface PaymentStatusProps {
  paymentId: number
}

type Status = "pending" | "approved" | "rejected" | "cancelled" | "checking"

export default function PaymentStatus({ paymentId }: PaymentStatusProps) {
  const [status, setStatus] = useState<Status>("checking")

  useEffect(() => {
    let cancelled = false

    const checkPayment = async () => {
      try {
        const res = await fetch(`/api/payment/${paymentId}`)
        const data = await res.json()

        if (cancelled) return

        if (data.status === "approved") {
          setStatus("approved")
          return
        }

        if (data.status === "rejected" || data.status === "cancelled") {
          setStatus(data.status)
          return
        }

        setStatus("pending")
        setTimeout(() => {
          if (!cancelled) checkPayment()
        }, 5000)
      } catch {
        if (!cancelled) {
          setStatus("pending")
          setTimeout(() => {
            if (!cancelled) checkPayment()
          }, 5000)
        }
      }
    }

    checkPayment()

    return () => {
      cancelled = true
    }
  }, [paymentId])

  if (status === "approved") {
    return (
      <div className="rounded-lg border border-green-500/20 bg-green-50 p-4 text-center dark:bg-green-950/20">
        <CheckCircle2 className="mx-auto mb-2 size-8 text-green-600 dark:text-green-400" />
        <p className="font-medium text-green-700 dark:text-green-400">
          Pagamento confirmado!
        </p>
        <p className="text-sm text-green-600/80 dark:text-green-500/80">
          Muito obrigado por apoiar o Raiolaranja! ♥
        </p>
      </div>
    )
  }

  if (status === "rejected" || status === "cancelled") {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center">
        <XCircle className="mx-auto mb-2 size-8 text-destructive" />
        <p className="font-medium text-destructive">
          Pagamento não confirmado
        </p>
        <p className="text-sm text-destructive/80">
          O pagamento foi{" "}
          {status === "rejected" ? "recusado" : "cancelado"}. Tente novamente.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
      {status === "checking" ? (
        <Loader2 className="mx-auto mb-2 size-8 animate-spin text-primary" />
      ) : (
        <Clock className="mx-auto mb-2 size-8 text-primary" />
      )}
      <p className="font-medium text-primary">
        {status === "checking"
          ? "Verificando pagamento..."
          : "Aguardando pagamento..."}
      </p>
      <p className="text-sm text-primary/80">
        Após pagar, a confirmação pode levar alguns segundos.
      </p>
    </div>
  )
}
