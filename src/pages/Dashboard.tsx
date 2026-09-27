import { Link } from 'react-router'
import BookingList from '../components/BookingList.tsx'
import KpiCards from '../components/KpiCards.tsx'
import MonthSelect from '../components/MonthSelect.tsx'
import { useSelectedMonth } from '../hooks/useSelectedMonth.ts'
import { filterByMonth, sortByDateDesc } from '../lib/bookings.ts'
import { useBookings } from '../store/bookings.ts'

export default function Dashboard() {
  const bookings = useBookings((s) => s.bookings)
  const [month, setMonth] = useSelectedMonth()
  const filtered = filterByMonth(bookings, month)
  const recent = sortByDateDesc(filtered).slice(0, 5)

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <MonthSelect bookings={bookings} value={month} onChange={setMonth} />
      </div>
      <KpiCards bookings={filtered} />
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Letzte Buchungen</h2>
          <Link
            to={`/transactions?month=${month}`}
            className="text-sm text-emerald-700 hover:underline"
          >
            Alle anzeigen
          </Link>
        </div>
        <BookingList bookings={recent} />
      </div>
    </section>
  )
}
