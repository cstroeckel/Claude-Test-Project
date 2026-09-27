const euroFormat = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

/**
 * Parses a user-entered euro amount ("12,50", "12.5", "1.003,99 €") into cents.
 * Returns null for invalid or negative input.
 */
export function parseEuro(input: string): number | null {
  let s = input.replace(/[\s€]/g, '')
  if (s.includes(',')) {
    // German notation: dots are thousands separators, comma is decimal
    s = s.replace(/\./g, '').replace(',', '.')
  }
  if (!/^\d+(\.\d{1,2})?$/.test(s)) return null
  return Math.round(Number(s) * 100)
}

export function formatEuro(cents: number): string {
  return euroFormat.format(cents / 100)
}

/** Formats cents for an input field, e.g. 1250 -> "12,50". */
export function centsToInput(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',')
}
