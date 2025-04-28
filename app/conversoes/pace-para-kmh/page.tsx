'use client'

import { useState } from 'react'

export default function PaceToSpeedCalculator() {
  const [pace, setPace] = useState('')
  const [speed, setSpeed] = useState<string | null>(null)

  const handlePaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '') // Remove tudo que não for número

    if (value.length > 4) value = value.slice(0, 4) // Limita 4 dígitos

    if (value.length <= 2) {
      setPace(value)
    } else {
      setPace(`${value.slice(0, value.length - 2)}:${value.slice(-2)}`)
    }
  }

  const calculateSpeed = () => {
    const [paceMinStr, paceSecStr] = pace.split(':')
    const paceMinutes = parseInt(paceMinStr || '0', 10)
    const paceSeconds = parseInt(paceSecStr || '0', 10)

    const totalMinutes = paceMinutes + paceSeconds / 60

    if (totalMinutes <= 0) {
      alert('Pace deve ser maior que zero.')
      return
    }

    const speedKmH = 60 / totalMinutes
    const formattedSpeed = speedKmH.toFixed(2).replace('.', ',')

    setSpeed(`${formattedSpeed} km/h`)
  }

  return (
    <main className='p-4'>
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded-2xl shadow-md space-y-6 text-white">
      <h2 className="text-2xl font-semibold text-center">Converter Pace para Km/h</h2>

      <div>
        <label className="block mb-1 font-medium">Pace (mm:ss)</label>
        <input
          type="text"
          value={pace}
          onChange={handlePaceChange}
          placeholder="04:30"
          className="w-full p-2 border rounded-md"
          inputMode="numeric"
          maxLength={5}
        />
      </div>

      <button
        onClick={calculateSpeed}
        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Calcular Velocidade
      </button>

      {speed && (
        <div className="bg-gray-100 p-4 rounded-md text-center">
          <p className="font-medium text-gray-700">Velocidade Aproximada:</p>
          <p className="text-2xl font-semibold text-green-600">{speed}</p>
        </div>
      )}
    </div>
    </main>
  )
}
