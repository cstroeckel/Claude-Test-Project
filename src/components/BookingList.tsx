import { Link } from 'react-router'
import { formatDate } from '../lib/dates.ts'
import { formatEuro } from '../lib/money.ts'
import { useBookings } from '../store/bookings.ts'
import type { Booking } from '../types/booking.ts'

export default function BookingList({ bookings }: { bookings: Booking[] }) {
  const remove = useBookings((s) => s.remove)

  if (bookings.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
        Keine Buchungen in diesem Zeitraum.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="px-3 py-2 font-medium">Datum</th>
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Beschreibung</th>
            <th className="px-3 py-2 text-right font-medium">Betrag</th>
            <th className="px-3 py-2 text-right font-medium">Zus. Kosten</th>
            <th className="px-3 py-2 text-right font-medium">Summe</th>
            <th className="px-3 py-2">
              <span className="sr-only">Aktionen</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="whitespace-nowrap px-3 py-2">
                {formatDate(b.date)}
              </td>
              <td className="px-3 py-2 font-medium">{b.name}</td>
              <td className="px-3 py-2 text-slate-600">{b.description}</td>
              <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">
                {formatEuro(b.amountCents)}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">
                {formatEuro(b.extraCostsCents)}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-right font-medium tabular-nums">
                {formatEuro(b.amountCents + b.extraCostsCents)}
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-right">
                <Link
                  to={`/transactions/${b.id}/edit`}
                  className="text-emerald-700 hover:underline"
                  aria-label={`${b.name} bearbeiten`}
                >
                  Bearbeiten
                </Link>
                <button
                  type="button"
                  className="ml-3 text-red-600 hover:underline"
                  aria-label={`${b.name} löschen`}
                  onClick={() => {
                    if (window.confirm(`„${b.name}“ wirklich löschen?`))
                      remove(b.id)
                  }}
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
