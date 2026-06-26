import { Preference } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"
import { mercadopagoClient } from "@/lib/mercadopago"

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const preference = new Preference(mercadopagoClient)
    const result = await preference.create({
      body: {
        items: [
          {
            id: "donation",
            title: "Doação Raiolaranja",
            quantity: 1,
            unit_price: Number(amount),
          },
        ],
        purpose: "donations",
        back_urls: {
          success: `${baseUrl}/apoiar?status=success`,
          failure: `${baseUrl}/apoiar?status=failure`,
          pending: `${baseUrl}/apoiar?status=pending`,
        },
        auto_return: "approved",
      },
    })

    return NextResponse.json({
      redirect_url: result.init_point,
      preference_id: result.id,
    })
  } catch (error: any) {
    console.error("Erro ao criar preferência:", error)
    return NextResponse.json(
      { error: error.message || "Erro ao processar pagamento" },
      { status: 500 }
    )
  }
}
