"use client"

import { cn } from "@/lib/utils"

const SUGGESTED_VALUES = [4.9, 14.9, 19.9]

const formatBrl = (n: number) =>
  n.toFixed(2).replace(".", ",")

interface ValueSelectorProps {
  value: string
  onChange: (value: string) => void
}

export default function ValueSelector({ value, onChange }: ValueSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Valor da doação
      </p>
      <div className="flex gap-2">
        {SUGGESTED_VALUES.map((suggested) => {
          const selected = Number(value) === suggested
          return (
            <button
              key={suggested}
              type="button"
              onClick={() => onChange(String(suggested))}
              className={cn(
                "flex-1 rounded-lg border py-2 text-center text-sm font-medium transition-colors cursor-pointer",
                selected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 hover:text-primary"
              )}
            >
              R$ {formatBrl(suggested)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
