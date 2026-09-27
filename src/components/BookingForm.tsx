import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { todayIso } from '../lib/dates.ts'
import { centsToInput, parseEuro } from '../lib/money.ts'
import type { Booking, BookingInput } from '../types/booking.ts'

interface Props {
  initial?: Booking
  onSubmit: (data: BookingInput) => void
  onCancel: () => void
}

type Field = 'name' | 'date' | 'amount' | 'extraCosts'
type Errors = Partial<Record<Field, string>>

const inputClass =
  'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600'

export default function BookingForm({ initial, onSubmit, onCancel }: Props) {
  const id = useId()
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [date, setDate] = useState(initial?.date ?? todayIso())
  const [amount, setAmount] = useState(
    initial ? centsToInput(initial.amountCents) : '',
  )
  const [extraCosts, setExtraCosts] = useState(
    centsToInput(initial?.extraCostsCents ?? 0),
  )
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const amountCents = parseEuro(amount)
    const extraCostsCents = parseEuro(extraCosts || '0')
    const next: Errors = {}
    if (!name.trim()) next.name = 'Bitte einen Namen eingeben.'
    if (!date) next.date = 'Bitte ein Datum wählen.'
    if (amountCents === null || amountCents <= 0)
      next.amount = 'Bitte einen Betrag größer als 0 eingeben.'
    if (extraCostsCents === null)
      next.extraCosts = 'Bitte einen gültigen Betrag (≥ 0) eingeben.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      date,
      amountCents: amountCents!,
      extraCostsCents: extraCostsCents!,
    })
  }

  const field = (key: Field, label: string, input: ReactNode) => (
    <div>
      <label htmlFor={`${id}-${key}`} className="text-sm font-medium">
        {label}
      </label>
      {input}
      {errors[key] && (
        <p id={`${id}-${key}-error`} className="mt-1 text-sm text-red-600">
          {errors[key]}
        </p>
      )}
    </div>
  )

  const aria = (key: Field) => ({
    id: `${id}-${key}`,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${id}-${key}-error` : undefined,
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="grid max-w-xl gap-4">
      {field(
        'name',
        'Name',
        <input
          {...aria('name')}
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />,
      )}
      <div>
        <label htmlFor={`${id}-description`} className="text-sm font-medium">
          Beschreibung
        </label>
        <textarea
          id={`${id}-description`}
          className={inputClass}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {field(
        'date',
        'Datum',
        <input
          {...aria('date')}
          type="date"
          className={inputClass}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />,
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {field(
          'amount',
          'Betrag (€)',
          <input
            {...aria('amount')}
            inputMode="decimal"
            placeholder="0,00"
            className={inputClass}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />,
        )}
        {field(
          'extraCosts',
          'Zusätzliche Kosten (€)',
          <input
            {...aria('extraCosts')}
            inputMode="decimal"
            placeholder="0,00"
            className={inputClass}
            value={extraCosts}
            onChange={(e) => setExtraCosts(e.target.value)}
          />,
        )}
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-800"
        >
          Speichern
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-4 py-2 hover:bg-slate-100"
        >
          Abbrechen
        </button>
      </div>
    </form>
  )
}
