'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/tools/CalculatorLayout'
import PaceInput from '@/components/tools/PaceInput'
import ResultDisplay from '@/components/tools/ResultDisplay'
import { paceToSpeed } from '@/lib/pace'

export default function PaceParaKmh() {
  const [pace, setPace] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [speed, setSpeed] = useState<string | null>(null)

  useEffect(() => {
    if (!pace) {
      setError(null)
      setSpeed(null)
      return
    }

    const result = paceToSpeed(pace)
    if (result === null) {
      setError('Pace deve ser maior que zero.')
      setSpeed(null)
      return
    }

    setSpeed(`${result.toFixed(2).replace('.', ',')} km/h`)
    setError(null)
  }, [pace])

  return (
    <CalculatorLayout title="Pace → km/h" backHref="/conversoes">
      <PaceInput value={pace} onChange={setPace} autoFocus />
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}
      {speed && <ResultDisplay label="Velocidade" value={speed} />}
    </CalculatorLayout>
  )
}
