"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const SUGGESTED_VALUES = [5, 10, 20]

interface ValueSelectorProps {
  value: string
  onChange: (value: string) => void
}

export default function ValueSelector({ value, onChange }: ValueSelectorProps) {
  const numericValue = value.replace(/\D/g, "")
  const isCustom = numericValue && !SUGGESTED_VALUES.includes(Number(numericValue))

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Valor da doação
      </p>
      <div className="flex gap-2">
        {SUGGESTED_VALUES.map((suggested) => (
          <button
            key={suggested}
            type="button"
            onClick={() => onChange(String(suggested))}
            className={cn(
              "flex-1 rounded-lg border py-2 text-center text-sm font-medium transition-colors cursor-pointer",
              numericValue === String(suggested)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 hover:text-primary"
            )}
          >
            R$ {suggested}
          </button>
        ))}
      </div>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          R$
        </span>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="Outro valor"
          value={isCustom ? numericValue : ""}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          className="pl-8 text-center"
        />
      </div>
    </div>
  )
}
