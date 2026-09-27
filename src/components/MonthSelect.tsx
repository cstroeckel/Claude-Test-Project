import { availableMonths } from '../lib/bookings.ts'
import { currentMonth, formatMonth } from '../lib/dates.ts'
import type { Booking, MonthFilter } from '../types/booking.ts'

interface Props {
  bookings: Booking[]
  value: MonthFilter
  onChange: (month: MonthFilter) => void
}

export default function MonthSelect({ bookings, value, onChange }: Props) {
  const months = new Set([...availableMonths(bookings), currentMonth()])
  if (value !== 'all') months.add(value)
  const options = [...months].sort().reverse()

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="font-medium">Zeitraum</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-slate-300 bg-white px-2 py-1.5"
      >
        <option value="all">Alle</option>
        {options.map((m) => (
          <option key={m} value={m}>
            {formatMonth(m)}
          </option>
        ))}
      </select>
    </label>
  )
}
