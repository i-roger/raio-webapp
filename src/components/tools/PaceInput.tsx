import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PaceInputProps {
  value: string
  onChange: (value: string) => void
  id?: string
  autoFocus?: boolean
}

export default function PaceInput({ value, onChange, id = 'pace', autoFocus }: PaceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '')
    if (digits.length > 4) digits = digits.slice(0, 4)
    if (digits.length <= 2) {
      onChange(digits)
    } else {
      onChange(`${digits.slice(0, digits.length - 2)}:${digits.slice(-2)}`)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Pace (mm:ss)</Label>
      <Input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="04:30"
        inputMode="numeric"
        maxLength={5}
        autoFocus={autoFocus}
      />
    </div>
  )
}
