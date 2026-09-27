import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import BookingForm from './BookingForm.tsx'

function setup(initial?: Parameters<typeof BookingForm>[0]['initial']) {
  const onSubmit = vi.fn()
  render(
    <BookingForm initial={initial} onSubmit={onSubmit} onCancel={() => {}} />,
  )
  return { onSubmit, user: userEvent.setup() }
}

describe('BookingForm', () => {
  it('shows validation errors and does not submit', async () => {
    const { onSubmit, user } = setup()
    await user.click(screen.getByRole('button', { name: 'Speichern' }))
    expect(screen.getByText('Bitte einen Namen eingeben.')).toBeInTheDocument()
    expect(
      screen.getByText('Bitte einen Betrag größer als 0 eingeben.'),
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejects invalid extra costs', async () => {
    const { onSubmit, user } = setup()
    await user.type(screen.getByLabelText('Name'), 'Laptop')
    await user.type(screen.getByLabelText('Betrag (€)'), '10')
    const extra = screen.getByLabelText('Zusätzliche Kosten (€)')
    await user.clear(extra)
    await user.type(extra, '-5')
    await user.click(screen.getByRole('button', { name: 'Speichern' }))
    expect(
      screen.getByText('Bitte einen gültigen Betrag (≥ 0) eingeben.'),
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits amounts in cents', async () => {
    const { onSubmit, user } = setup()
    await user.type(screen.getByLabelText('Name'), ' Laptop ')
    await user.type(screen.getByLabelText('Beschreibung'), 'Arbeitsgerät')
    const date = screen.getByLabelText('Datum')
    await user.clear(date)
    await user.type(date, '2026-09-15')
    await user.type(screen.getByLabelText('Betrag (€)'), '999,00')
    const extra = screen.getByLabelText('Zusätzliche Kosten (€)')
    await user.clear(extra)
    await user.type(extra, '4,99')
    await user.click(screen.getByRole('button', { name: 'Speichern' }))
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Laptop',
      description: 'Arbeitsgerät',
      date: '2026-09-15',
      amountCents: 99900,
      extraCostsCents: 499,
    })
  })

  it('prefills fields when editing', () => {
    setup({
      id: 'x',
      name: 'Miete',
      description: 'September',
      date: '2026-09-01',
      amountCents: 85000,
      extraCostsCents: 1250,
    })
    expect(screen.getByLabelText('Name')).toHaveValue('Miete')
    expect(screen.getByLabelText('Datum')).toHaveValue('2026-09-01')
    expect(screen.getByLabelText('Betrag (€)')).toHaveValue('850,00')
    expect(screen.getByLabelText('Zusätzliche Kosten (€)')).toHaveValue('12,50')
  })
})
