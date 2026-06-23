import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DistanceInputProps {
  value: string
  onChange: (value: string) => void
  id?: string
  autoFocus?: boolean
}

export default function DistanceInput({ value, onChange, id = 'distance', autoFocus }: DistanceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    const formatted = raw.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (formatted.length <= 6) onChange(formatted)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        Distância{' '}
        <span className="text-muted-foreground">(10.000 = 10km / 400 = 400m)</span>
      </Label>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder="Ex: 10.000"
        autoFocus={autoFocus}
      />
    </div>
  )
}
