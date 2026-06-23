import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TimeInputProps {
  hours: string
  minutes: string
  seconds: string
  onHoursChange: (value: string) => void
  onMinutesChange: (value: string) => void
  onSecondsChange: (value: string) => void
  autoFocus?: boolean
}

export default function TimeInput({
  hours,
  minutes,
  seconds,
  onHoursChange,
  onMinutesChange,
  onSecondsChange,
  autoFocus,
}: TimeInputProps) {
  const makeHandler =
    (setter: (v: string) => void, maxLen = 2) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, '')
      if (val.length <= maxLen) setter(val)
    }

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="space-y-2">
        <Label>Horas</Label>
        <Input
          type="text"
          value={hours}
          onChange={makeHandler(onHoursChange)}
          placeholder="0"
          inputMode="numeric"
          autoFocus={autoFocus}
        />
      </div>
      <div className="space-y-2">
        <Label>Minutos</Label>
        <Input
          type="text"
          value={minutes}
          onChange={makeHandler(onMinutesChange)}
          placeholder="0"
          inputMode="numeric"
        />
      </div>
      <div className="space-y-2">
        <Label>Segundos</Label>
        <Input
          type="text"
          value={seconds}
          onChange={makeHandler(onSecondsChange)}
          placeholder="0"
          inputMode="numeric"
        />
      </div>
    </div>
  )
}
