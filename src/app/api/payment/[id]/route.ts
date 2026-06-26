import { Payment } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"
import { mercadopagoClient } from "@/lib/mercadopago"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payment = new Payment(mercadopagoClient)
    const result = await payment.get({ id: Number(id) })

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    })
  } catch (error: any) {
    console.error("Erro ao consultar pagamento:", error)
    return NextResponse.json(
      { error: error.message || "Erro ao consultar pagamento" },
      { status: 500 }
    )
  }
}
