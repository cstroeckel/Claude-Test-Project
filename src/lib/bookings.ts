import type { Booking, MonthFilter } from '../types/booking.ts'

export interface Kpis {
  expensesCents: number
  extraCostsCents: number
  totalCents: number
}

export function filterByMonth(
  bookings: Booking[],
  month: MonthFilter,
): Booking[] {
  if (month === 'all') return bookings
  return bookings.filter((b) => b.date.startsWith(`${month}-`))
}

export function computeKpis(bookings: Booking[]): Kpis {
  let expensesCents = 0
  let extraCostsCents = 0
  for (const b of bookings) {
    expensesCents += b.amountCents
    extraCostsCents += b.extraCostsCents
  }
  return {
    expensesCents,
    extraCostsCents,
    totalCents: expensesCents + extraCostsCents,
  }
}

/** Distinct months (YYYY-MM) that have bookings, newest first. */
export function availableMonths(bookings: Booking[]): string[] {
  const months = new Set(bookings.map((b) => b.date.slice(0, 7)))
  return [...months].sort().reverse()
}

export function sortByDateDesc(bookings: Booking[]): Booking[] {
  return [...bookings].sort((a, b) => b.date.localeCompare(a.date))
}
