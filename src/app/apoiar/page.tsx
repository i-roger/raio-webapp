"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CalculatorLayout, ValueSelector, PixQRCode } from "@/components/tools"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, CreditCard, CheckCircle2, XCircle } from "lucide-react"

export default function ApoiarPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [method, setMethod] = useState<"pix" | "card">("pix")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pixData, setPixData] = useState<{
    id: number
    qr_code_base64: string
    qr_code: string
  } | null>(null)
  const [redirectStatus, setRedirectStatus] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")
    if (status) {
      setRedirectStatus(status)
      window.history.replaceState({}, "", "/apoiar")
    }
  }, [])

  const handlePixPayment = async () => {
    if (!amount || Number(amount) < 1) {
      setError("Selecione ou digite um valor válido (mínimo R$ 1)")
      return
    }

    setLoading(true)
    setError(null)
    setPixData(null)

    try {
      const res = await fetch("/api/pix/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          email: email || undefined,
          name: name || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Erro ao gerar Pix")
      }

      setPixData({
        id: data.id,
        qr_code_base64: data.qr_code_base64,
        qr_code: data.qr_code,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCardPayment = async () => {
    if (!amount || Number(amount) < 1) {
      setError("Selecione ou digite um valor válido (mínimo R$ 1)")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar pagamento")
      }

      window.location.href = data.redirect_url
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (redirectStatus === "success") {
    return (
      <CalculatorLayout title="Apoiar o Raiolaranja" backHref="/mais">
        <div className="space-y-4 py-8 text-center">
          <CheckCircle2 className="mx-auto size-16 text-green-500" />
          <h2 className="text-xl font-semibold">Pagamento confirmado!</h2>
          <p className="text-muted-foreground">
            Muito obrigado por apoiar o Raiolaranja! ♥
          </p>
          <Button onClick={() => router.push("/")}>
            Voltar ao início
          </Button>
        </div>
      </CalculatorLayout>
    )
  }

  if (redirectStatus === "failure" || redirectStatus === "pending") {
    return (
      <CalculatorLayout title="Apoiar o Raiolaranja" backHref="/mais">
        <div className="space-y-4 py-8 text-center">
          <XCircle className="mx-auto size-16 text-destructive" />
          <h2 className="text-xl font-semibold">
            {redirectStatus === "pending"
              ? "Pagamento pendente"
              : "Pagamento não concluído"}
          </h2>
          <p className="text-muted-foreground">
            {redirectStatus === "pending"
              ? "Seu pagamento está sendo processado. Assim que for confirmado, você receberá uma notificação."
              : "O pagamento foi cancelado ou não pôde ser processado."}
          </p>
          <Button onClick={() => setRedirectStatus(null)} variant="outline">
            Tentar novamente
          </Button>
        </div>
      </CalculatorLayout>
    )
  }

  return (
    <CalculatorLayout title="Apoiar o Raiolaranja" backHref="/mais">
      {pixData ? (
        <PixQRCode
          qrCodeBase64={pixData.qr_code_base64}
          qrCodeText={pixData.qr_code}
          paymentId={pixData.id}
        />
      ) : (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Se o Raiolaranja te ajuda nos treinos, considere fazer uma doação.
            Qualquer valor ajuda a manter o projeto!
          </p>

          <ValueSelector value={amount} onChange={setAmount} />

          <div className="space-y-2">
            <Label htmlFor="email">
              E-mail{" "}
              <span className="text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              Nome{" "}
              <span className="text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={method === "pix" ? "default" : "outline"}
              onClick={() => setMethod("pix")}
              className="flex-1"
            >
              <QrCode className="size-4" />
              Pix
            </Button>
            <Button
              variant={method === "card" ? "default" : "outline"}
              onClick={() => setMethod("card")}
              className="flex-1"
            >
              <CreditCard className="size-4" />
              Cartão
            </Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            onClick={method === "pix" ? handlePixPayment : handleCardPayment}
            className="w-full"
            disabled={loading || !amount}
          >
            {loading
              ? "Processando..."
              : method === "pix"
                ? "Pagar com Pix"
                : "Pagar com Cartão"}
          </Button>
        </div>
      )}
    </CalculatorLayout>
  )
}
