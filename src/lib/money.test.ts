import { describe, expect, it } from 'vitest'
import { centsToInput, formatEuro, parseEuro } from './money.ts'

describe('parseEuro', () => {
  it.each([
    ['12,50', 1250],
    ['12.5', 1250],
    ['12', 1200],
    ['0,99', 99],
    ['1.003,99', 100399],
    [' 4,99 € ', 499],
    ['0', 0],
  ])('parses %j as %i cents', (input, cents) => {
    expect(parseEuro(input)).toBe(cents)
  })

  it.each(['', 'abc', '-1', '1,234', '12,5,0'])('rejects %j', (input) => {
    expect(parseEuro(input)).toBeNull()
  })
})

describe('formatEuro', () => {
  it('formats cents as German euro string', () => {
    expect(formatEuro(100399).replace(/\s/g, ' ')).toBe('1.003,99 €')
  })
})

describe('centsToInput', () => {
  it('formats cents for an input field', () => {
    expect(centsToInput(1250)).toBe('12,50')
  })
})
