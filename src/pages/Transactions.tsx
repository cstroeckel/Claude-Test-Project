import { Link } from 'react-router'
import BookingList from '../components/BookingList.tsx'
import KpiCards from '../components/KpiCards.tsx'
import MonthSelect from '../components/MonthSelect.tsx'
import { useSelectedMonth } from '../hooks/useSelectedMonth.ts'
import { filterByMonth, sortByDateDesc } from '../lib/bookings.ts'
import { useBookings } from '../store/bookings.ts'

export default function Transactions() {
  const bookings = useBookings((s) => s.bookings)
  const [month, setMonth] = useSelectedMonth()
  const visible = sortByDateDesc(filterByMonth(bookings, month))

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Buchungen</h1>
        <div className="flex items-center gap-4">
          <MonthSelect bookings={bookings} value={month} onChange={setMonth} />
          <Link
            to="/transactions/new"
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            Neue Buchung
          </Link>
        </div>
      </div>
      <KpiCards bookings={visible} />
      <BookingList bookings={visible} />
    </section>
  )
}
