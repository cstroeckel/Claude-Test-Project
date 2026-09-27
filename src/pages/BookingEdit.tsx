import { Link, useNavigate, useParams } from 'react-router'
import BookingForm from '../components/BookingForm.tsx'
import { useBookings } from '../store/bookings.ts'

export default function BookingEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const booking = useBookings((s) => s.bookings.find((b) => b.id === id))
  const add = useBookings((s) => s.add)
  const update = useBookings((s) => s.update)
  const backToList = () => navigate('/transactions')

  if (id && !booking) {
    return (
      <section>
        <h1 className="text-2xl font-semibold">Buchung nicht gefunden</h1>
        <Link to="/transactions" className="mt-4 inline-block text-emerald-700">
          Zurück zu den Buchungen
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">
        {booking ? 'Buchung bearbeiten' : 'Neue Buchung'}
      </h1>
      <BookingForm
        key={booking?.id ?? 'new'}
        initial={booking}
        onSubmit={(data) => {
          if (booking) update(booking.id, data)
          else add(data)
          backToList()
        }}
        onCancel={backToList}
      />
    </section>
  )
}
