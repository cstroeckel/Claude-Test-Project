export interface Booking {
  id: string
  name: string
  description: string
  /** ISO date, YYYY-MM-DD */
  date: string
  /** Ausgabe in Cent, > 0 */
  amountCents: number
  /** Zusätzliche Kosten in Cent, >= 0 */
  extraCostsCents: number
}

export type BookingInput = Omit<Booking, 'id'>

/** 'YYYY-MM' or 'all' */
export type MonthFilter = string
