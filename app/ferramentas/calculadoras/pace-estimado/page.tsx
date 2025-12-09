'use client'

import { useState } from 'react'

export default function PaceEstimado() {
  const [distance, setDistance] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [pace, setPace] = useState<string | null>(null)

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    const formatted = raw.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (formatted.length <= 6) setDistance(formatted)
  }


  const parseToFloat = (val: string) => parseFloat(val.replace(',', '')) || 0

  const calculatePace = () => {
    const dist = parseToFloat(distance)
    const totalSeconds =
      parseInt(hours || '0') * 3600 +
      parseInt(minutes || '0') * 60 +
      parseInt(seconds || '0')

    if (dist <= 0 || totalSeconds <= 0) {
      alert('Distância e tempo devem ser maiores que zero.')
      return
    }

    const distanceKm = dist / 1000

    const secondsPerKm = totalSeconds / distanceKm
    const paceMinutes = Math.floor(secondsPerKm / 60)
    const paceSeconds = Math.round(secondsPerKm % 60)

    const paceFormatted = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} min/km`
    setPace(paceFormatted)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded-2xl shadow-md space-y-6 text-white">
      <h2 className="text-2xl font-semibold text-center">Pace Estimado</h2>

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

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Horas</label>
          <input
            type="number"
            value={hours}
            maxLength={2}
            onChange={(e) => {const val = e.target.value.replace(/\D/g, '')
              if (val.length <= 2) setHours(val)}}
            className="w-full p-2 border rounded-md"
            placeholder="0"
            min="0"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Minutos</label>
          <input
            type="number"
            value={minutes}
            maxLength={2}
            onChange={(e) => {const val = e.target.value.replace(/\D/g, '')
                if (val.length <= 2) setMinutes(val)}}
            className="w-full p-2 border rounded-md"
            placeholder="0"
            min="0"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Segundos</label>
          <input
            type="number"
            value={seconds}
            onChange={(e) => {const val = e.target.value.replace(/\D/g, '')
                if (val.length <= 2) setSeconds(val)}}
            className="w-full p-2 border rounded-md"
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      <button
        onClick={calculatePace}
        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Calcular Pace
      </button>

      {pace && (
        <div className="bg-gray-100 p-4 rounded-md text-center">
          <p className="font-medium text-gray-700">Seu Pace Médio:</p>
          <p className="text-2xl font-semibold text-green-600">{pace}</p>
        </div>
      )}
    </div>
  )
}
