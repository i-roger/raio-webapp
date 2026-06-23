interface ResultDisplayProps {
  label: string
  value: string
}

export default function ResultDisplay({ label, value }: ResultDisplayProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-primary/20 bg-primary/5 py-5 text-center transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-3xl font-bold text-primary">{value}</p>
    </div>
  )
}
