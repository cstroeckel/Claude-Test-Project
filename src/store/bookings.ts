import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Booking, BookingInput } from '../types/booking.ts'

interface BookingsState {
  bookings: Booking[]
  add: (input: BookingInput) => Booking
  update: (id: string, input: BookingInput) => void
  remove: (id: string) => void
}

export const useBookings = create<BookingsState>()(
  persist(
    (set) => ({
      bookings: [],
      add: (input) => {
        const booking = { ...input, id: crypto.randomUUID() }
        set((s) => ({ bookings: [...s.bookings, booking] }))
        return booking
      },
      update: (id, input) =>
        set((s) => ({
          bookings: s.bookings.map((b) => (b.id === id ? { ...input, id } : b)),
        })),
      remove: (id) =>
        set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),
    }),
    { name: 'budget-tracker:bookings' },
  ),
)
