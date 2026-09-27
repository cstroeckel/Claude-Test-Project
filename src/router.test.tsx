import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { currentMonth } from './lib/dates.ts'
import { routes } from './router.tsx'
import { useBookings } from './store/bookings.ts'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return userEvent.setup()
}

const kpi = (label: string) =>
  screen.getByTestId(`kpi-${label}`).textContent?.replace(/\s/g, ' ')

beforeEach(() => {
  localStorage.clear()
  useBookings.setState({ bookings: [] })
})

describe('routing', () => {
  it('shows the dashboard at /', () => {
    renderAt('/')
    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument()
  })

  it('navigates to Buchungen via the nav', async () => {
    const user = renderAt('/')
    await user.click(screen.getByRole('link', { name: 'Buchungen' }))
    expect(
      screen.getByRole('heading', { name: 'Buchungen' }),
    ).toBeInTheDocument()
  })

  it('shows not found for an unknown booking id', () => {
    renderAt('/transactions/nope/edit')
    expect(
      screen.getByRole('heading', { name: 'Buchung nicht gefunden' }),
    ).toBeInTheDocument()
  })
})

describe('booking flow', () => {
  it('creates, edits and deletes a booking with live KPIs', async () => {
    const user = renderAt('/transactions')
    expect(kpi('Gesamtkosten')).toBe('0,00 €')

    await user.click(screen.getByRole('link', { name: 'Neue Buchung' }))
    await user.type(screen.getByLabelText('Name'), 'Laptop')
    await user.type(screen.getByLabelText('Betrag (€)'), '999,00')
    const extra = screen.getByLabelText('Zusätzliche Kosten (€)')
    await user.clear(extra)
    await user.type(extra, '4,99')
    await user.click(screen.getByRole('button', { name: 'Speichern' }))

    expect(screen.getByRole('cell', { name: 'Laptop' })).toBeInTheDocument()
    expect(kpi('Ausgaben')).toBe('999,00 €')
    expect(kpi('Zusätzliche Kosten')).toBe('4,99 €')
    expect(kpi('Gesamtkosten')).toBe('1.003,99 €')

    await user.click(screen.getByRole('link', { name: 'Laptop bearbeiten' }))
    const amount = screen.getByLabelText('Betrag (€)')
    expect(amount).toHaveValue('999,00')
    await user.clear(amount)
    await user.type(amount, '500')
    await user.click(screen.getByRole('button', { name: 'Speichern' }))
    expect(kpi('Gesamtkosten')).toBe('504,99 €')

    vi.spyOn(window, 'confirm').mockReturnValue(true)
    await user.click(screen.getByRole('button', { name: 'Laptop löschen' }))
    expect(
      screen.getByText('Keine Buchungen in diesem Zeitraum.'),
    ).toBeInTheDocument()
    expect(kpi('Gesamtkosten')).toBe('0,00 €')
  })

  it('filters bookings and KPIs by month', async () => {
    const { add } = useBookings.getState()
    const month = currentMonth()
    add({
      name: 'Aktuell',
      description: '',
      date: `${month}-01`,
      amountCents: 1000,
      extraCostsCents: 0,
    })
    add({
      name: 'Alt',
      description: '',
      date: '2020-01-15',
      amountCents: 5000,
      extraCostsCents: 500,
    })

    const user = renderAt('/transactions')
    const table = screen.getByRole('table')
    expect(within(table).getByText('Aktuell')).toBeInTheDocument()
    expect(within(table).queryByText('Alt')).not.toBeInTheDocument()
    expect(kpi('Gesamtkosten')).toBe('10,00 €')

    await user.selectOptions(screen.getByLabelText('Zeitraum'), 'all')
    expect(within(table).getByText('Alt')).toBeInTheDocument()
    expect(kpi('Gesamtkosten')).toBe('65,00 €')
  })
})
