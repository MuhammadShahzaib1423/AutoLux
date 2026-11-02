// South Asian digit grouping: 5850000 -> 58,50,000 ; 14500000 -> 1,45,00,000
export function formatPKR(n) {
  const s = String(Math.round(n))
  const last3 = s.slice(-3)
  let rest = s.slice(0, -3)
  if (!rest) return last3
  const parts = []
  while (rest.length > 2) {
    parts.unshift(rest.slice(-2))
    rest = rest.slice(0, -2)
  }
  if (rest) parts.unshift(rest)
  return `${parts.join(',')},${last3}`
}

export function formatPKRFull(n) {
  return `PKR ${formatPKR(n)}`
}

export function formatNumber(n) {
  return Number(n).toLocaleString('en-US')
}

export const DRIVER_RATE_PER_DAY = 2000
