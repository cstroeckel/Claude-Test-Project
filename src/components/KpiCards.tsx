import { computeKpis } from '../lib/bookings.ts'
import { formatEuro } from '../lib/money.ts'
import type { Booking } from '../types/booking.ts'

export default function KpiCards({ bookings }: { bookings: Booking[] }) {
  const kpis = computeKpis(bookings)
  const cards = [
    { label: 'Ausgaben', value: kpis.expensesCents },
    { label: 'Zusätzliche Kosten', value: kpis.extraCostsCents },
    { label: 'Gesamtkosten', value: kpis.totalCents, highlight: true },
  ]

  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-lg border p-4 ${
            card.highlight
              ? 'border-emerald-200 bg-emerald-50'
              : 'border-slate-200 bg-white'
          }`}
        >
          <dt className="text-sm text-slate-600">{card.label}</dt>
          <dd
            className="mt-1 text-2xl font-semibold tabular-nums"
            data-testid={`kpi-${card.label}`}
          >
            {formatEuro(card.value)}
          </dd>
        </div>
      ))}
    </dl>
  )
}
