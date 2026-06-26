import { MercadoPagoConfig } from "mercadopago"

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN

if (!accessToken) {
  throw new Error(
    "MERCADO_PAGO_ACCESS_TOKEN não configurado. Adicione a variável no arquivo .env.local"
  )
}

export const mercadopagoClient = new MercadoPagoConfig({ accessToken })
