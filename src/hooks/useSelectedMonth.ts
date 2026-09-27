import { useSearchParams } from 'react-router'
import { currentMonth } from '../lib/dates.ts'
import type { MonthFilter } from '../types/booking.ts'

/** Selected month from the ?month= search param, defaulting to the current month. */
export function useSelectedMonth(): [
  MonthFilter,
  (month: MonthFilter) => void,
] {
  const [params, setParams] = useSearchParams()
  const month = params.get('month') ?? currentMonth()
  const setMonth = (next: MonthFilter) =>
    setParams({ month: next }, { replace: true })
  return [month, setMonth]
}
