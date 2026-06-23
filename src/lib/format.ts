export function parseDistance(value: string): number {
  return parseFloat(value.replace(',', '')) || 0
}

export function formatDistance(value: string, maxLength = 6): string {
  const raw = value.replace(/\D/g, '')
  const formatted = raw.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  if (formatted.length <= maxLength) return formatted
  return formatted
}

export function formatDigits(value: string, maxDigits = 2): string {
  const digits = value.replace(/\D/g, '')
  return digits.slice(0, maxDigits)
}
