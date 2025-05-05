'use client'

import { useState } from 'react'

export default function EstimatedPaceFromPercentage() {
  const [pace, setPace] = useState('')
  const [percent, setPercent] = useState('')
  const [resultPace, setResultPace] = useState<string | null>(null)

  const handlePaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) value = value.slice(0, 4)

    if (value.length <= 2) {
      setPace(value)
    } else {
      setPace(`${value.slice(0, value.length - 2)}:${value.slice(-2)}`)
    }
  }

  const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    setPercent(raw.slice(0, 3)) // até 3 dígitos (ex: 100%)
  }

  const calculateAdjustedPace = () => {
    const [minStr = '0', secStr = '0'] = pace.split(':')
    const paceSeconds = parseInt(minStr) * 60 + parseInt(secStr)
    const percentage = parseInt(percent)

    if (paceSeconds <= 0 || percentage <= 0 || percentage > 100) {
      alert('Pace e percentual devem ser válidos. O percentual deve estar entre 1 e 100.')
      return
    }

    const adjustedPaceSeconds = Math.round(paceSeconds / (percentage / 100))

    const minutes = Math.floor(adjustedPaceSeconds / 60)
    const seconds = adjustedPaceSeconds % 60

    const formatted = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`

    setResultPace(formatted)
  }

  return (
    <main className="p-4">
      <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-800 rounded-2xl shadow-md space-y-6 text-white">
        <h2 className="text-2xl font-semibold text-center">Intensidade de corrida</h2>

        <div>
          <label className="block mb-1 font-medium">Pace de Prova (mm:ss)</label>
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

        <div>
          <label className="block mb-1 font-medium">Percentual (%)</label>
          <input
            type="text"
            value={percent}
            onChange={handlePercentChange}
            placeholder="Ex: 90"
            className="w-full p-2 border rounded-md"
            inputMode="numeric"
            maxLength={3}
          />
        </div>

        <button
          onClick={calculateAdjustedPace}
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Calcular Pace
        </button>

        {resultPace && (
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <p className="font-medium text-gray-700">Pace a {percent}%:</p>
            <p className="text-2xl font-semibold text-green-600">{resultPace}</p>
          </div>
        )}
      </div>
    </main>
  )
}
