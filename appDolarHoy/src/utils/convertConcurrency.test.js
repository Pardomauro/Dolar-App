import { describe, it, expect } from 'vitest'
import { convertCurrency } from './convertCurrency'

describe('convertCurrency', () => {
  it('convierte pesos a la moneda según la cotización de venta', () => {
    expect(convertCurrency(1500, 1000)).toBe('1.50')
  })

  it('redondea a 2 decimales', () => {
    expect(convertCurrency(10, 3)).toBe('3.33')
  })

  it('devuelve string vacío si no hay monto', () => {
    expect(convertCurrency('', 1000)).toBe('')
  })

  it('devuelve string vacío si no hay cotización', () => {
    expect(convertCurrency(1000, undefined)).toBe('')
  })
})