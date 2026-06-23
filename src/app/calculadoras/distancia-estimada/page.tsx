'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/tools/CalculatorLayout'
import PaceInput from '@/components/tools/PaceInput'
import TimeInput from '@/components/tools/TimeInput'
import ResultDisplay from '@/components/tools/ResultDisplay'
import { paceToSeconds, calculateDistanceFromTimePace } from '@/lib/pace'

export default function DistanciaEstimada() {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [pace, setPace] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [estimatedDistance, setEstimatedDistance] = useState<string | null>(null)

  useEffect(() => {
    const h = parseInt(hours || '0', 10)
    const m = parseInt(minutes || '0', 10)
    const s = parseInt(seconds || '0', 10)
    const totalTimeInSeconds = h * 3600 + m * 60 + s
    const paceInSeconds = paceToSeconds(pace)

    if ((!hours && !minutes && !seconds) || !pace) {
      setError(null)
      setEstimatedDistance(null)
      return
    }

    if (totalTimeInSeconds <= 0) {
      setError('Tempo deve ser maior que zero.')
      setEstimatedDistance(null)
      return
    }

    if (paceInSeconds <= 0) {
      setError('Pace deve ser maior que zero.')
      setEstimatedDistance(null)
      return
    }

    const result = calculateDistanceFromTimePace(totalTimeInSeconds, paceInSeconds)
    setEstimatedDistance(result)
    setError(null)
  }, [hours, minutes, seconds, pace])

  return (
    <CalculatorLayout title="Distância Estimada">
      <TimeInput
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onHoursChange={setHours}
        onMinutesChange={setMinutes}
        onSecondsChange={setSeconds}
        autoFocus
      />
      <PaceInput value={pace} onChange={setPace} />
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}
      {estimatedDistance && (
        <ResultDisplay label="Distância Estimada" value={estimatedDistance} />
      )}
    </CalculatorLayout>
  )
}
