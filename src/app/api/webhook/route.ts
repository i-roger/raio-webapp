import { Payment } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"
import { mercadopagoClient } from "@/lib/mercadopago"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (
      body.type === "payment" ||
      body.action === "payment.created" ||
      body.action === "payment.updated"
    ) {
      const paymentId = body.data?.id

      if (paymentId) {
        const payment = new Payment(mercadopagoClient)
        const paymentData = await payment.get({ id: paymentId })

        console.log(
          `[Webhook] Pagamento ${paymentId}: ${paymentData.status}`
        )

        if (paymentData.status === "approved") {
          console.log(
            `[Webhook] Doação aprovada! ID: ${paymentId}, Valor: R$ ${paymentData.transaction_amount}`
          )
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Erro no webhook:", error)
    return NextResponse.json({ received: true })
  }
}
