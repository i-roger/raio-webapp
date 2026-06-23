'use client'

import { useState, useEffect } from 'react'
import CalculatorLayout from '@/components/tools/CalculatorLayout'
import DistanceInput from '@/components/tools/DistanceInput'
import TimeInput from '@/components/tools/TimeInput'
import ResultDisplay from '@/components/tools/ResultDisplay'
import { parseDistance } from '@/lib/format'
import { calculatePaceFromDistanceTime } from '@/lib/pace'

export default function PaceEstimado() {
  const [distance, setDistance] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pace, setPace] = useState<string | null>(null)

  useEffect(() => {
    const dist = parseDistance(distance)
    const totalSeconds =
      parseInt(hours || '0') * 3600 +
      parseInt(minutes || '0') * 60 +
      parseInt(seconds || '0')

    if (!distance || (!hours && !minutes && !seconds)) {
      setError(null)
      setPace(null)
      return
    }

    if (dist <= 0) {
      setError('Distância deve ser maior que zero.')
      setPace(null)
      return
    }

    if (totalSeconds <= 0) {
      setError('Tempo deve ser maior que zero.')
      setPace(null)
      return
    }

    const result = calculatePaceFromDistanceTime(dist, totalSeconds)
    setPace(result)
    setError(null)
  }, [distance, hours, minutes, seconds])

  return (
    <CalculatorLayout title="Pace Estimado">
      <DistanceInput value={distance} onChange={setDistance} autoFocus />
      <TimeInput
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onHoursChange={setHours}
        onMinutesChange={setMinutes}
        onSecondsChange={setSeconds}
      />
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}
      {pace && <ResultDisplay label="Seu Pace Médio" value={pace} />}
    </CalculatorLayout>
  )
}
