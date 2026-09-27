import { describe, expect, it } from 'vitest'
import type { Booking } from '../types/booking.ts'
import {
  availableMonths,
  computeKpis,
  filterByMonth,
  sortByDateDesc,
} from './bookings.ts'

const booking = (id: string, date: string, amount: number, extra = 0) =>
  ({
    id,
    name: id,
    description: '',
    date,
    amountCents: amount,
    extraCostsCents: extra,
  }) satisfies Booking

const bookings = [
  booking('a', '2026-08-15', 1000, 100),
  booking('b', '2026-09-01', 2000),
  booking('c', '2026-09-30', 500, 50),
]

describe('filterByMonth', () => {
  it('returns bookings of the given month', () => {
    expect(filterByMonth(bookings, '2026-09').map((b) => b.id)).toEqual([
      'b',
      'c',
    ])
  })

  it('returns everything for "all"', () => {
    expect(filterByMonth(bookings, 'all')).toHaveLength(3)
  })
})

describe('computeKpis', () => {
  it('sums expenses, extra costs and total', () => {
    expect(computeKpis(bookings)).toEqual({
      expensesCents: 3500,
      extraCostsCents: 150,
      totalCents: 3650,
    })
  })

  it('returns zeros for no bookings', () => {
    expect(computeKpis([]).totalCents).toBe(0)
  })
})

describe('availableMonths', () => {
  it('lists distinct months newest first', () => {
    expect(availableMonths(bookings)).toEqual(['2026-09', '2026-08'])
  })
})

describe('sortByDateDesc', () => {
  it('sorts newest first without mutating', () => {
    expect(sortByDateDesc(bookings).map((b) => b.id)).toEqual(['c', 'b', 'a'])
    expect(bookings[0].id).toBe('a')
  })
})
