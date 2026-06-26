# Raiolaranja

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | shadcn/ui v4 (base-nova) + Tailwind CSS v4 |
| Ícones | lucide-react |
| Fontes | Inter (corpo) + Sora (títulos), via `next/font/google` |
| Primitivas | @base-ui/react (substituto do Radix) |
| Deploy | Vercel (com Analytics + SpeedInsights) |
| Estado | React hooks locais (`useState`, `useRef`, `useEffect`) — sem estado global |

## Estrutura de arquivos

```
src/
├── app/
│   ├── globals.css          # Tema light/dark, variáveis CSS, Tailwind
│   ├── layout.tsx           # Root layout: Sidebar + MobileNav + font vars
│   ├── page.tsx             # Landing page (hero + vitrine de ferramentas)
│   ├── calculadoras/
│   │   ├── page.tsx                    # Hub: grid de 4 cards
│   │   ├── pace-estimado/page.tsx      # Calculadora individual
│   │   ├── tempo-estimado/page.tsx
│   │   ├── distancia-estimada/page.tsx
│   │   └── intensidade-de-corrida/page.tsx
│   └── conversoes/
│       ├── page.tsx                    # Hub: grid de 2 cards
│       ├── pace-para-kmh/page.tsx
│       └── kmh-para-pace/page.tsx
├── components/
│   ├── layout/
│   │   ├── Container.tsx       # Wrapper responsivo max-w-4xl
│   │   ├── GlassContainer.tsx  # Efeito liquid glass (7 layers: edge reflection, emboss, refraction, blur, blend, highlight)
│   │   ├── MobileNav.tsx       # Floating pill nav (mobile only) com drag-to-select + indicador animado
│   │   └── Sidebar.tsx         # Sidebar fixa 240px (desktop only, hidden md:flex)
│   ├── theme/
│   │   ├── ThemeSelect.tsx     # Dropdown Claro/Escuro com Check e outside-click-close
│   │   └── index.ts
│   ├── tools/
│   │   ├── CalculatorLayout.tsx   # Card wrapper + "Voltar" + título
│   │   ├── PaceInput.tsx          # Input mm:ss com formatação automática
│   │   ├── TimeInput.tsx          # 3 inputs (horas, minutos, segundos)
│   │   ├── DistanceInput.tsx      # Input numérico com formatação de milhar
│   │   └── ResultDisplay.tsx      # Exibição do resultado (laranja, animado)
│   └── ui/                    # Componentes shadcn (não editar manualmente)
│       ├── button.tsx, card.tsx, input.tsx, label.tsx
│       ├── accordion.tsx, badge.tsx, dialog.tsx, select.tsx
│       └── index.ts           # Barrel exports
└── lib/
    ├── pace.ts    # Funções de cálculo (pace, velocidade, distância, tempo, intensidade)
    ├── format.ts  # Formatação de distância e dígitos
    └── utils.ts   # cn() — merge de classes Tailwind
```

## Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Server | Landing page: hero + seções de ferramentas |
| `/mais` | Client | Menu de configurações: tema, apoio e sobre |
| `/apoiar` | Client | Página de doação (Pix inline + Cartão via Checkout Pro), com ← Voltar para /mais |
| `/sobre` | Server | Sobre o aplicativo (versão, stack), com ← Voltar para /mais |
| `/calculadoras` | Server | Hub com cards para 4 calculadoras |
| `/calculadoras/pace-estimado` | Client | Calcula pace a partir de distância + tempo |
| `/calculadoras/tempo-estimado` | Client | Calcula tempo a partir de distância + pace |
| `/calculadoras/distancia-estimada` | Client | Calcula distância a partir de tempo + pace |
| `/calculadoras/intensidade-de-corrida` | Client | Ajusta pace por percentual de intensidade |
| `/conversoes` | Server | Hub com cards para 2 conversões |
| `/conversoes/pace-para-kmh` | Client | Converte pace → km/h |
| `/conversoes/kmh-para-pace` | Client | Converte km/h → pace |

Todas as rotas são estáticas (prerendered as static content), exceto `/mais` e `/apoiar` (usam `"use client"`).

## Tema (globals.css)

### Paletas

- **`:root`** (light, padrão): fundo quase branco (`oklch(0.985 0 0)`), texto quase preto, laranja como primary (`oklch(0.72 0.19 55)`), bordas/cinzas neutros.
- **`.dark`**: fundo escuro (`oklch(0.13 0.01 75)`), texto claro, mesma cor primary, bordas a 10–15% de branco.

### Fontes

- **Corpo** (`--font-sans`): Inter, carregada via CSS variable `--font-inter`
- **Títulos** (`--font-heading`): Sora, via `--font-sora`
- Tags `h1`–`h6` herdam `font-family: var(--font-heading)` via `@layer base` no CSS

## Componentes de Layout

### Container
`<Container className?>` — `max-w-4xl mx-auto` com `px-4 py-6` (mobile) e `md:px-6`.

### Sidebar
- `"use client"` — usa `usePathname()` para highlight da rota ativa
- Escondida no mobile (`hidden md:flex`), 240px width, fixa à esquerda
- 3 links principais: Início (`/`), Calculadoras (`/calculadoras`), Conversões (`/conversoes`)
- 2 links extras separados por divisor: Apoiar (`/apoiar`), Sobre (`/sobre`)
- Footer: "Configurações" (`/mais`) com ícone Settings + "Feito para corredores"
- ThemeToggle removido da sidebar (tema agora em `/mais` via ThemeSelect)

### MobileNav
- `"use client"` — `usePathname()` + `useRouter()` para navegação
- Visible only on mobile (`md:hidden`), fixed bottom, largura total com padding lateral
- Floating pill: `inset-x-4 bottom-[max(20px,var(--safe-area-bottom))]`, envolta em `<GlassContainer>`
- 4 tabs com `flex-1` (1/4 da largura cada): Início, Calculadoras, Conversões, Mais
- Aba "Mais" (`/mais`) fica ativa também nas sub-rotas `/apoiar` e `/sobre`
- Ícones apenas (sem labels), `size-8`, dentro de container `size-10`
- Ícone ativo: `text-primary` + `scale-110`
- iOS context menu longo bloqueado via `WebkitTouchCallout: 'none'` + `onContextMenu`

#### Mecanismo de toque e arrasto (drag-to-select)
- **`handleTouchStart`** — `e.preventDefault()`, ativa escala (`isScaling`), calcula tab sob o dedo via `getTabIndexFromX()` e posição contínua via `getIndicatorOffset()`, seta estado inicial
- **`handleTouchMove`** — atualiza `pressedIndexRef` (ref, sempre atual) + `indicatorOffset` (seguindo o dedo), chama `setPressedIndex(index)` apenas quando a tab muda (minimiza re-renders)
- **`handleTouchEnd`** — `setTransitionStyle('all 150ms ease-out')`, lê `pressedIndexRef.current` (nunca stale) e navega com `router.push()`. Se navegou, define `navigateToRef` e retorna cedo sem limpar estados — `useEffect([pathname])` limpa `pressedIndex`/`indicatorOffset` só após a nova rota renderizar
- **`handlePointerUp`** — para desktop, filtra `e.pointerType === 'touch'` e navega baseado em `e.clientX`

#### Indicador animado
- Renderizado como `<div>` absoluto dentro do `<GlassContainer>`, `w-24 h-15 rounded-4xl bg-muted-foreground/15`
- **Posição contínua** durante toque: `indicatorOffset` é a posição em % do dedo dentro da nav (0%–100%), sem arredondamento. Fora do toque: `displayIndex * 25 + 12.5%` (centro da tab ativa)
- **Transição separada por estado**: `transitionStyle` é `'all 150ms ease-out'` inicialmente. No primeiro `touchMove` (`touchMovedRef`), vira `'none'` para seguimento fluido do dedo. Em `touchEnd`/`handleTouchCancel`/`useEffect` retorna a `'all 150ms ease-out'` para animação suave
- Efeito: tap anima da tab atual até o dedo → drag segue sem lag → soltura anima da posição do dedo até o centro da nova tab

#### Escala de feedback
- `isScaling` alterna `scale-[.8]` ↔ `scale-[.9]` com `transition-transform duration-200`
- Ativado em `handleTouchStart`, desativado em `handleTouchEnd`/`handleTouchCancel`
- Sem `setTimeout` — escala reflete exclusivamente o toque do usuário

#### Controle de navegação
- **Tap** (<5px de movimento): `handleTouchEnd` navega para `pressedIndexRef.current` (tab sob o dedo). O indicador anima da posição do dedo até o centro da tab via `useEffect`
- **Arrasto** (≥5px): `touchMovedRef` vira `transitionStyle` para `'none'`, indicador segue o dedo sem chasing stutter. `handleTouchEnd` navega para `pressedIndexRef.current` (onde o dedo soltou)
- **Desktop**: `onPointerUp` com `pointerType !== 'touch'` — calcula tab via `getTabIndexFromX(e.clientX)` e navega
- Sem handler `onClick` nos filhos — navegação é centralizada nos handlers do `<nav>`

### ThemeSelect
- Dropdown de seleção de tema (Claro / Escuro)
- Ícone `SunMoon` + texto do tema atual (`Claro` / `Escuro`) + `ChevronDown`
- Abre lista sobreposta com `Check` ao lado do tema ativo
- Alterna classe `dark` no `<html>` + salva em `localStorage('theme')`
- Fecha ao clicar fora (via `useEffect` com `click` listener no `document`)
- Usado exclusivamente na página `/mais`

### ThemeToggle (removido)
- Era o botão flutuante com `Sun`/`Moon` — removido em favor do `ThemeSelect` em `/mais`

## Componentes de Ferramentas (tools)

### CalculatorLayout
- Wrapper que renderiza um `Card` com título centralizado + `← Voltar` no topo
- `backHref` default: `/calculadoras`
- Largura `max-w-md`, centralizado

### PaceInput
- Placeholder `04:30`, `inputMode="numeric"`, `maxLength={5}`
- Formata automaticamente: até 2 dígitos → cru, 3+ dígitos → `mm:ss`

### TimeInput
- 3 inputs lado a lado (grid-cols-3): horas, minutos, segundos
- Cada um aceita até 2 dígitos numéricos

### DistanceInput
- Placeholder `Ex: 10.000`, `inputMode="numeric"`
- Formata com separador de milhar (`1,000` = 1km)

### ResultDisplay
- Exibição estilizada: borda + fundo `primary/5`, texto `primary` grande (3xl)
- Animação: `animate-in fade-in slide-in-from-bottom-2` (via `tw-animate-css`)
- Label em uppercase tracking-wider

## Padrão das páginas calculadoras (Client Components)

Todas as 6 páginas de ferramentas seguem o mesmo padrão:

```tsx
'use client'

import { useState, useEffect } from 'react'
// import inputs + CalculatorLayout + ResultDisplay
// import funções de lib/pace.ts ou lib/format.ts

export default function NomeDaFerramenta() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    // Validar inputs
    // Se inválido → setError("mensagem") + setResult(null)
    // Se válido → setResult(valor) + setError(null)
    // Se vazio → setError(null) + setResult(null)
  }, [input1, input2])

  return (
    <CalculatorLayout title="...">
      <InputComponent1 ... autoFocus />
      <InputComponent2 ... />
      {error && <p className="text-destructive">{error}</p>}
      {result && <ResultDisplay label="..." value={result} />}
    </CalculatorLayout>
  )
}
```

- **Cálculo automático**: via `useEffect`, sem botão "Calcular"
- **Erro inline**: texto `text-destructive` no lugar de `alert()`
- **Auto-foco**: primeiro input com `autoFocus`

## Funções de Cálculo (lib/pace.ts)

| Função | Entrada | Saída |
|---|---|---|
| `paceToSeconds(pace)` | `"4:30"` | `270` |
| `paceToSpeed(pace)` | `"4:30"` | `13.33` (km/h) |
| `speedToPace(speed)` | `13.33` | `"4:30"` |
| `calculatePaceFromDistanceTime(distM, totalSec)` | `10000, 2700` | `"04:30 min/km"` |
| `calculateTimeFromDistancePace(distM, paceSec)` | `10000, 270` | `"00:45:00"` |
| `calculateDistanceFromTimePace(totalSec, paceSec)` | `2700, 270` | `"10,00 km"` |
| `calculateAdjustedPace(paceSec, pct)` | `300, 85` | `"03:32"` |

**Formato de distância**: em **metros** (10.000 = 10km). Input aceita inteiros com separador de milhar (ex: `10,000`). `parseDistance()` remove vírgulas e converte para número.

## PWA & Safe Area

O app é instalável como PWA (Add to Home Screen), com suporte parcial offline (sem service worker ainda).

### Configuração PWA

- **`src/app/manifest.ts`** — Gera `/manifest.json` com `display: "standalone"`, ícones 192×192 e 512×512, orientação portrait.
- **`layout.tsx`** — Metadata inclui `manifest`, `apple-touch-icon` e `appleWebApp` para comportamento standalone no iOS.
- **Ícones** — `icon-192x192.png`, `icon-512x512.png`, `apple-touch-icon.png` em `public/`.

### Safe Area (`env(safe-area-inset-bottom)`)

Dispositivos com notch/home indicator (iPhone X+, Android modernos) têm uma área segura no fundo da tela. Para evitar que o MobileNav e o conteúdo fiquem atrás dessa área:

- **`globals.css`** — Define `--safe-area-bottom: env(safe-area-inset-bottom, 0px)`, que retorna `34px` no iPhone PWA, `24–48px` no Android, e `0px` em desktop.
- **`MobileNav.tsx`** — `bottom-[max(20px,var(--safe-area-bottom))]` — padding dinâmico com mínimo de 20px.
- **`layout.tsx`** — `pb-[calc(48px+max(20px,var(--safe-area-bottom)))]` no wrapper principal para que o conteúdo não fique oculto atrás do nav. O botão flutuante do tema foi removido — o tema agora é acessível via `/mais` (mobile) ou Sidebar (desktop).

## Liquid Glass (glass.css)

O efeito liquid glass é implementado no arquivo `src/app/glass.css` com multi-camadas de backdrop-filter:

- **Edge reflection**: gradiente linear que simula reflexo de borda
- **Emboss**: sombra interna para profundidade
- **Refraction**: leve deslocamento de fundo (mock)
- **Blur**: `blur(20px)` para o efeito vidro
- **Blend layers**: sobreposição com `mix-blend-mode`
- **Highlight**: brilho sutil no canto superior

### Variáveis CSS personalizáveis
| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `cornerRadius` | `24px` | Raio da borda do vidro |
| `baseStrength` | `0.15` | Opacidade da camada base |
| `extraBlur` | `2px` | Blur extra na refração |
| `softness` | `12` | Spread da sombra emboss |
| `invert` | `0` | Inversão (1 para dark mode) |

O componente `<GlassContainer>` em `src/components/layout/GlassContainer.tsx` aplica estas classes CSS com suporte a `className` e `children`.

## Observações

- **shadcn v4 (base-nova)**: Usa `@base-ui/react` como primitiva, não Radix. A API de slots usa `data-slot` em vez de `asChild`.
- **CSS variables**: O arquivo `globals.css` usa OKLCH para cores. `@theme inline` mapeia variáveis CSS para utilitários Tailwind. Novas cores devem seguir o mesmo padrão.

## Mercado Pago (Pagamentos & Doações)

### 1. Arquitetura Geral

O sistema de pagamento usa a **API v3 do Mercado Pago** (SDK oficial `mercadopago`) com **dois fluxos independentes** que coexistem na página `/apoiar`:

```
┌─────────────────────────────────────────────────────────┐
│                  Página /apoiar                          │
│                                                          │
│  [Valor: R$ 4,90 │ R$ 14,90 │ R$ 19,90]                  │
│  [E-mail (opcional)] [Nome (opcional)]                    │
│                                                          │
│  ┌──────────────┐  ┌──────────────────┐                  │
│  │ Pagar com Pix │  │ Pagar com Cartão │                  │
│  └──────┬───────┘  └────────┬─────────┘                  │
│         │                    │                            │
│         ▼                    ▼                            │
│  ┌──────────────┐   ┌───────────────┐                    │
│  │ PIX inline   │   │ Checkout Pro  │                    │
│  │ QR + polling │   │ redirect MP   │                    │
│  └──────────────┘   └───────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

### 2. Fluxo PIX (inline)

Gera um QR Code Pix via API do Mercado Pago e mantém o usuário **dentro do app** com polling de confirmação.

| Etapa | Descrição |
|-------|-----------|
| `POST /api/pix/create` | Cria pagamento Pix com `payment_method_id: "pix"` e expiração de **30 min** (`date_of_expiration`) |
| Resposta | Retorna `id`, `qr_code_base64`, `qr_code`, `expires_at` |
| Exibição | QR Code renderizado na tela + código Pix copiável |
| Polling | `PaymentStatus` consulta `GET /api/payment/[id]` a cada **5s** |
| Webhook | `POST /api/webhook` — Mercado Pago notifica backend, mas o fluxo principal é o polling |

**Decisão de arquitetura:** optamos por **polling no frontend** em vez de depender apenas do webhook porque:
- O webhook não tem garantia de entrega em tempo real
- O polling permite feedback visual imediato para o usuário
- O webhook fica como redundância/fallback

#### Estados do PIX inline

```
QR gerado → Aguardando pagamento... → Pago! ✅
                                    → Recusado ❌
30 min sem pagamento → QR expirado → "Gerar novo QR"
```

#### Persistência (sessionStorage)
- Ao gerar o QR, salvamos `{ id, qr_code, qr_code_base64, expires_at }` no `sessionStorage`
- Se o usuário recarregar a página, o QR é restaurado (sem precisar gerar outro)
- Ao expirar ou pagar, o `sessionStorage` é limpo

#### UX do Cancelar
- Botão "← Cancelar" no canto superior direito da tela do QR (vermelho, visível)
- Usuário pode desistir ou alterar o valor a qualquer momento

### 3. Fluxo Cartão (Checkout Pro)

Redireciona o usuário para a **página hospedada do Mercado Pago**, que oferece Cartão de Crédito e Pix.

| Etapa | Descrição |
|-------|-----------|
| `POST /api/checkout/create` | Cria uma `Preference` no Mercado Pago |
| Body | `{ amount, items: [{ title: "Doação Raiolaranja" }] }` |
| Resposta | `{ redirect_url: init_point, preference_id }` |
| Ação | `window.location.href = data.redirect_url` (mesma aba — padrão de mercado) |
| Retorno | Mercado Pago redireciona para `/apoiar?status=success\|failure\|pending` |

**Decisão de arquitetura:** usamos `auto_return: "approved"` e `back_urls` configurados para que o usuário volte automaticamente ao app após o pagamento, com o resultado na URL.

#### Tratamento do retorno

```
?status=success  → Tela: "Pagamento confirmado! ♥" + [Voltar ao início]
?status=failure  → Tela: "Pagamento não concluído" + [Tentar novamente]
?status=pending  → Tela: "Pagamento pendente" + [Tentar novamente]
```

### 4. Decisões Técnicas Relevantes

| Decisão | Motivo |
|---------|--------|
| **Dois fluxos (PIX inline + Cartão redirect)** | PIX inline dá feedback imediato; cartão terceiriza a UI de pagamento para o MP |
| **Polling de 5s no frontend** | Mais rápido que webhook para feedback visual ao usuário |
| **sessionStorage (não localStorage)** | Dados sensíveis de pagamento não devem persistir após fechar a aba |
| **Expiração de 30 min no PIX** | Padrão de mercado; evita QR "eterno" |
| **Botão "Cancelar" em destaque** | Transparência com o usuário: ele pode desistir ou mudar o valor |
| **Valores fixos (4,90 / 14,90 / 19,90)** | Simplicidade de UX; evita erros de digitação |
| **Sem banco de dados** | Histórico de pagamentos fica no próprio dashboard do Mercado Pago |
| **Validação do token na inicialização** | Erro claro se a variável de ambiente não estiver configurada |

### 5. Componentes

| Componente | Função |
|---|---|
| **`ValueSelector`** | Três botões de valor predefinido: R$ 4,90 / R$ 14,90 / R$ 19,90 |
| **`PixQRCode`** | Exibe QR Code + contagem regressiva + "Cancelar" (botão destrutivo no topo) |
| **`PaymentStatus`** | Polling de status a cada 5s; para ao expirar; chama `onApproved` |

### 6. API Routes

| Rota | Método | Função |
|------|--------|--------|
| `/api/pix/create` | POST | Cria pagamento Pix com expiração de 30 min |
| `/api/checkout/create` | POST | Cria preferência Checkout Pro e retorna URL de redirect |
| `/api/payment/[id]` | GET | Consulta status de um pagamento |
| `/api/webhook` | POST | Recebe notificações do Mercado Pago |

### 7. Credenciais

- `MERCADO_PAGO_ACCESS_TOKEN` — token de produção (`APP_USR-...`) configurado na Vercel
- Para desenvolvimento local: usar token de teste (`TEST-...`)
- Validação em `src/lib/mercadopago.ts` lança erro claro se o token estiver ausente

