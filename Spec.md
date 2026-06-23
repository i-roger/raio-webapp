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
| Estado | React hooks locais (`useState`, `useEffect`) — sem estado global |

## Estrutura de arquivos

```
src/
├── app/
│   ├── globals.css          # Tema light/dark, variáveis CSS, Tailwind
│   ├── layout.tsx           # Root layout: Sidebar + MobileNav + ThemeToggle + font vars
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
│   │   ├── MobileNav.tsx       # Bottom tab bar (mobile only, md:hidden)
│   │   └── Sidebar.tsx         # Sidebar fixa 240px (desktop only, hidden md:flex)
│   ├── theme/
│   │   └── ThemeToggle.tsx     # Botão dark/light com localStorage
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
| `/calculadoras` | Server | Hub com cards para 4 calculadoras |
| `/calculadoras/pace-estimado` | Client | Calcula pace a partir de distância + tempo |
| `/calculadoras/tempo-estimado` | Client | Calcula tempo a partir de distância + pace |
| `/calculadoras/distancia-estimada` | Client | Calcula distância a partir de tempo + pace |
| `/calculadoras/intensidade-de-corrida` | Client | Ajusta pace por percentual de intensidade |
| `/conversoes` | Server | Hub com cards para 2 conversões |
| `/conversoes/pace-para-kmh` | Client | Converte pace → km/h |
| `/conversoes/kmh-para-pace` | Client | Converte km/h → pace |

Todas as rotas são estáticas (prerendered as static content).

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
- 3 links: Início (`/`), Calculadoras (`/calculadoras`), Conversões (`/conversoes`)
- Footer: ThemeToggle + "Feito para corredores"

### MobileNav
- `"use client"` — `usePathname()` para highlight
- Visible only on mobile (`md:hidden`), fixed bottom
- 3 tabs com `flex-1` (1/3 da largura cada)
- Ícones em container `size-6` para bounding box uniforme
- Link ativo: `text-primary` + `scale-110` no ícone

### ThemeToggle
- Lê `document.documentElement.classList.contains("dark")` no mount
- Alterna classe + `localStorage.setItem("theme", "dark"|"light")`
- Renderiza `Sun`/`Moon` + label "Modo claro" / "Modo escuro"

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

## Observações

- **shadcn v4 (base-nova)**: Usa `@base-ui/react` como primitiva, não Radix. A API de slots usa `data-slot` em vez de `asChild`.
- **CSS variables**: O arquivo `globals.css` usa OKLCH para cores. `@theme inline` mapeia variáveis CSS para utilitários Tailwind. Novas cores devem seguir o mesmo padrão.

