'use client'

import { useState } from 'react'

export default function EstimatedTimeCalculator() {
  const [distance, setDistance] = useState('')
  const [pace, setPace] = useState('')
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null)

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    const formatted = raw.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (formatted.length <= 6) setDistance(formatted)
  }

  const parseToFloat = (val: string) => parseFloat(val.replace(',', '')) || 0

  const handlePaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 4) value = value.slice(0, 4) // Limita no máximo 4 dígitos

    if (value.length <= 2) {
      setPace(value) // Só minutos, sem ':'
    } else {
      setPace(`${value.slice(0, value.length - 2)}:${value.slice(-2)}`) // mm:ss
    }
  }

  const calculateEstimatedTime = () => {
    const dist = parseToFloat(distance)

    const [paceMinStr, paceSecStr] = pace.split(':')
    const paceMinutes = parseInt(paceMinStr || '0', 10)
    const paceSeconds = parseInt(paceSecStr || '0', 10)
    const totalPaceSeconds = paceMinutes * 60 + paceSeconds

    if (dist <= 0 || totalPaceSeconds <= 0) {
      alert('Distância e pace devem ser válidos e maiores que zero.')
      return
    }

    const distanceKm = dist / 1000
    const totalSeconds = distanceKm * totalPaceSeconds

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.round(totalSeconds % 60)

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    setEstimatedTime(formattedTime)
  }

  return (
    <main className='p-4'>
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded-2xl shadow-md space-y-6 text-white">
      <h2 className="text-2xl font-semibold text-center">Tempo Estimado</h2>

      <div>
        <label className="block mb-1 font-medium">Distância (10,000 = 10km ou 0,400 = 400m)</label>
        <input
          type="text"
          inputMode="numeric"
          value={distance}
          onChange={handleDistanceChange}
          placeholder="Ex: 10,000"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Pace (mm:ss)</label>
        <input
          type="text"
          value={pace}
          onChange={handlePaceChange}
          placeholder="Ex: 04:30"
          className="w-full p-2 border rounded-md"
          inputMode="numeric"
          maxLength={5}
        />
      </div>

      <button
        onClick={calculateEstimatedTime}
        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Calcular Tempo
      </button>

      {estimatedTime && (
        <div className="bg-gray-100 p-4 rounded-md text-center">
          <p className="font-medium text-gray-700">Tempo Estimado:</p>
          <p className="text-2xl font-semibold text-green-600">{estimatedTime}</p>
        </div>
      )}
    </div>
    </main>
  )
}
