'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/tools/CalculatorLayout'
import PaceInput from '@/components/tools/PaceInput'
import DistanceInput from '@/components/tools/DistanceInput'
import ResultDisplay from '@/components/tools/ResultDisplay'
import { parseDistance } from '@/lib/format'
import { paceToSeconds, calculateTimeFromDistancePace } from '@/lib/pace'

export default function TempoEstimado() {
  const [distance, setDistance] = useState('')
  const [pace, setPace] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null)

  useEffect(() => {
    if (!distance || !pace) {
      setError(null)
      setEstimatedTime(null)
      return
    }

    const dist = parseDistance(distance)
    const totalPaceSeconds = paceToSeconds(pace)

    if (dist <= 0) {
      setError('Distância deve ser maior que zero.')
      setEstimatedTime(null)
      return
    }

    if (totalPaceSeconds <= 0) {
      setError('Pace deve ser maior que zero.')
      setEstimatedTime(null)
      return
    }

    const result = calculateTimeFromDistancePace(dist, totalPaceSeconds)
    setEstimatedTime(result)
    setError(null)
  }, [distance, pace])

  return (
    <CalculatorLayout title="Tempo Estimado">
      <DistanceInput value={distance} onChange={setDistance} autoFocus />
      <PaceInput value={pace} onChange={setPace} />
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}
      {estimatedTime && (
        <ResultDisplay label="Tempo Estimado" value={estimatedTime} />
      )}
    </CalculatorLayout>
  )
}
