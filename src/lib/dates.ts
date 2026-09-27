const pad = (n: number) => String(n).padStart(2, '0')

/** Today's local date as YYYY-MM-DD. */
export function todayIso(now = new Date()): string {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/** Current local month as YYYY-MM. */
export function currentMonth(now = new Date()): string {
  return todayIso(now).slice(0, 7)
}

/** "2026-09" -> "September 2026" */
export function formatMonth(month: string): string {
  const [year, m] = month.split('-').map(Number)
  return new Date(year, m - 1).toLocaleDateString('de-DE', {
    month: 'long',
    year: 'numeric',
  })
}

/** "2026-09-27" -> "27.09.2026" */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}.${month}.${year}`
}
