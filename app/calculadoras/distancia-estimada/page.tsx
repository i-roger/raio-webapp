'use client'

import { useState } from 'react'

export default function EstimatedDistanceCalculator() {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [pace, setPace] = useState('')
  const [estimatedDistance, setEstimatedDistance] = useState<string | null>(null)

  const handlePaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 4) value = value.slice(0, 4)

    if (value.length <= 2) {
      setPace(value)
    } else {
      setPace(`${value.slice(0, value.length - 2)}:${value.slice(-2)}`)
    }
  }

  const calculateEstimatedDistance = () => {
    const h = parseInt(hours || '0', 10)
    const m = parseInt(minutes || '0', 10)
    const s = parseInt(seconds || '0', 10)
    const totalTimeInSeconds = h * 3600 + m * 60 + s

    const [paceMinStr = '0', paceSecStr = '0'] = pace.split(':')
    const paceInSeconds = parseInt(paceMinStr) * 60 + parseInt(paceSecStr)

    if (totalTimeInSeconds <= 0 || paceInSeconds <= 0) {
      alert('Tempo e pace devem ser válidos e maiores que zero.')
      return
    }

    const distanceKm = totalTimeInSeconds / paceInSeconds
    const formattedDistance = distanceKm.toFixed(2).replace('.', ',')

    setEstimatedDistance(`${formattedDistance} km`)
  }

  return (
    <main className='p-4'>
      <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded-2xl shadow-md space-y-6 text-white">
        <h2 className="text-2xl font-semibold text-center">Distância Estimada</h2>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Horas</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => {const val = e.target.value.replace(/\D/g, '') // remove não números
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
              onChange={(e) => {const val = e.target.value.replace(/\D/g, '') // remove não números
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
              onChange={(e) => {const val = e.target.value.replace(/\D/g, '') // remove não números
                if (val.length <= 2) setSeconds(val)}}
              className="w-full p-2 border rounded-md"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Pace (mm:ss)</label>
          <input
            type="text"
            value={pace}
            onChange={handlePaceChange}
            placeholder="Ex: 05:00"
            className="w-full p-2 border rounded-md"
            inputMode="numeric"
            maxLength={5}
          />
        </div>

        <button
          onClick={calculateEstimatedDistance}
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Calcular Distância
        </button>

        {estimatedDistance && (
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <p className="font-medium text-gray-700">Distância Estimada:</p>
            <p className="text-2xl font-semibold text-green-600">{estimatedDistance}</p>
          </div>
        )}
      </div>
    </main>
  )
}
