'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/tools/CalculatorLayout'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ResultDisplay from '@/components/tools/ResultDisplay'
import { speedToPace } from '@/lib/pace'

export default function KmhParaPace() {
  const [speed, setSpeed] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pace, setPace] = useState<string | null>(null)

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)
    if (value.length <= 2) {
      setSpeed(value)
    } else {
      setSpeed(`${value.slice(0, 2)}.${value.slice(2)}`)
    }
  }

  useEffect(() => {
    if (!speed) {
      setError(null)
      setPace(null)
      return
    }

    const speedNumber = parseFloat(speed)
    if (isNaN(speedNumber) || speedNumber <= 0) {
      setError('Velocidade deve ser maior que zero.')
      setPace(null)
      return
    }

    setPace(`${speedToPace(speedNumber)} min/km`)
    setError(null)
  }, [speed])

  return (
    <CalculatorLayout title="km/h → Pace" backHref="/conversoes">
      <div className="space-y-2">
        <Label htmlFor="speed">Velocidade (km/h)</Label>
        <Input
          id="speed"
          type="text"
          value={speed}
          onChange={handleSpeedChange}
          placeholder="12.5"
          inputMode="numeric"
          maxLength={5}
          autoFocus
        />
      </div>
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}
      {pace && <ResultDisplay label="Pace Aproximado" value={pace} />}
    </CalculatorLayout>
  )
}
