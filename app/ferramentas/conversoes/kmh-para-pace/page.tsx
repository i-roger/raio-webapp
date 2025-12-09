'use client'

import { useState } from 'react'

export default function SpeedToPaceCalculator() {
  const [speed, setSpeed] = useState('')
  const [pace, setPace] = useState<string | null>(null)

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 4) value = value.slice(0, 4)

    if (value.length <= 2) {
      setSpeed(value)
    } else {
      setSpeed(`${value.slice(0,2)}.${value.slice(2)}`) //Insere ponto antes dos ultimos 2 dígitos
    }
  }

  const calculatePace = () => {
    const speedNumber = parseFloat(speed)

    if (isNaN(speedNumber) || speedNumber <= 0) {
      alert('Velocidade deve ser maior que zero.')
      return
    }

    const totalMinutes = 60 / speedNumber
    const minutes = Math.floor(totalMinutes)
    const seconds = Math.round((totalMinutes - minutes) * 60)
    const formattedSeconds = seconds.toString().padStart(2, '0')

    setPace(`${minutes}:${formattedSeconds} min/km`)
  }

  return (
    <main className='p-4'>
      <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded-2xl shadow-md space-y-6 text-white">
        <h2 className="text-2xl font-semibold text-center">Converter Km/h para Pace</h2>

        <div>
          <label className="block mb-1 font-medium">Velocidade (km/h)</label>
          <input
            type="text"
            value={speed}
            onChange={handleSpeedChange}
            placeholder="12.5"
            className="w-full p-2 border rounded-md"
            inputMode="numeric"
            maxLength={5}
          />
        </div>

        <button
          onClick={calculatePace}
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Calcular Pace
        </button>

        {pace && (
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <p className="font-medium text-gray-700">Pace Aproximado:</p>
            <p className="text-2xl font-semibold text-green-600">{pace}</p>
          </div>
        )}
      </div>
    </main>
  )
}
