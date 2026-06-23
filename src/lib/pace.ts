export function formatPaceInput(value: string, maxDigits = 4): string {
  let digits = value.replace(/\D/g, '')
  if (digits.length > maxDigits) digits = digits.slice(0, maxDigits)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, digits.length - 2)}:${digits.slice(-2)}`
}

export function parsePace(pace: string): { minutes: number; seconds: number } {
  const [minStr = '0', secStr = '0'] = pace.split(':')
  return {
    minutes: parseInt(minStr, 10),
    seconds: parseInt(secStr, 10),
  }
}

export function paceToSeconds(pace: string): number {
  const { minutes, seconds } = parsePace(pace)
  return minutes * 60 + seconds
}

export function paceToSpeed(pace: string): number | null {
  const totalMinutes = paceToSeconds(pace) / 60
  if (totalMinutes <= 0) return null
  return 60 / totalMinutes
}

export function speedToPace(speedKmH: number): string {
  if (speedKmH <= 0) return ''
  const totalMinutes = 60 / speedKmH
  const minutes = Math.floor(totalMinutes)
  const seconds = Math.round((totalMinutes - minutes) * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function secondsToPace(secondsPerKm: number): string {
  const minutes = Math.floor(secondsPerKm / 60)
  const secs = Math.round(secondsPerKm % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')} min/km`
}

export function calculatePaceFromDistanceTime(
  distanceMeters: number,
  totalSeconds: number
): string | null {
  if (distanceMeters <= 0 || totalSeconds <= 0) return null
  const distanceKm = distanceMeters / 1000
  const secondsPerKm = totalSeconds / distanceKm
  return secondsToPace(secondsPerKm)
}

export function calculateTimeFromDistancePace(
  distanceMeters: number,
  paceSeconds: number
): string | null {
  if (distanceMeters <= 0 || paceSeconds <= 0) return null
  const distanceKm = distanceMeters / 1000
  const totalSeconds = distanceKm * paceSeconds

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = Math.round(totalSeconds % 60)

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function calculateDistanceFromTimePace(
  totalSeconds: number,
  paceSeconds: number
): string | null {
  if (totalSeconds <= 0 || paceSeconds <= 0) return null
  const distanceKm = totalSeconds / paceSeconds
  return `${distanceKm.toFixed(2).replace('.', ',')} km`
}

export function calculateAdjustedPace(
  paceSeconds: number,
  percentage: number
): string | null {
  if (paceSeconds <= 0 || percentage <= 0 || percentage > 100) return null
  const adjusted = Math.round(paceSeconds / (percentage / 100))
  const minutes = Math.floor(adjusted / 60)
  const secs = adjusted % 60
  return `${minutes.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`
}
