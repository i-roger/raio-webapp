import { Payment } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"
import { mercadopagoClient } from "@/lib/mercadopago"

export async function POST(request: NextRequest) {
  try {
    const { amount, email, name } = await request.json()

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 30)

    const payment = new Payment(mercadopagoClient)
    const result = await payment.create({
      body: {
        transaction_amount: Number(amount),
        description: "Doação Raiolaranja",
        payment_method_id: "pix",
        date_of_expiration: expiresAt.toISOString(),
        payer: {
          email: email || "doador@raiolaranja.app",
          first_name: name || "Doador",
        },
      },
      requestOptions: {
        idempotencyKey: crypto.randomUUID(),
      },
    })

    return NextResponse.json({
      id: result.id,
      status: result.status,
      qr_code: result.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64,
      ticket_url: result.point_of_interaction?.transaction_data?.ticket_url,
      expires_at: expiresAt.toISOString(),
    })
  } catch (error: any) {
    console.error("Erro ao criar pagamento Pix:", error)
    return NextResponse.json(
      { error: error.message || "Erro ao processar pagamento" },
      { status: 500 }
    )
  }
}
