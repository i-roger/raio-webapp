'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/tools/CalculatorLayout'
import PaceInput from '@/components/tools/PaceInput'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ResultDisplay from '@/components/tools/ResultDisplay'
import { paceToSeconds, calculateAdjustedPace } from '@/lib/pace'

export default function IntensidadeDeCorrida() {
  const [pace, setPace] = useState('')
  const [percent, setPercent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [resultPace, setResultPace] = useState<string | null>(null)

  const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    setPercent(raw.slice(0, 3))
  }

  useEffect(() => {
    if (!pace || !percent) {
      setError(null)
      setResultPace(null)
      return
    }

    const paceSeconds = paceToSeconds(pace)
    const percentage = parseInt(percent)

    if (paceSeconds <= 0) {
      setError('Pace deve ser maior que zero.')
      setResultPace(null)
      return
    }

    if (percentage <= 0 || percentage > 100) {
      setError('Percentual deve estar entre 1 e 100.')
      setResultPace(null)
      return
    }

    const result = calculateAdjustedPace(paceSeconds, percentage)
    setResultPace(result)
    setError(null)
  }, [pace, percent])

  return (
    <CalculatorLayout title="Intensidade de Corrida">
      <PaceInput value={pace} onChange={setPace} autoFocus />
      <div className="space-y-2">
        <Label htmlFor="percent">Percentual (%)</Label>
        <Input
          id="percent"
          type="text"
          value={percent}
          onChange={handlePercentChange}
          placeholder="Ex: 90"
          inputMode="numeric"
          maxLength={3}
        />
      </div>
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}
      {resultPace && (
        <ResultDisplay label={`Pace a ${percent}%`} value={resultPace} />
      )}
    </CalculatorLayout>
  )
}
