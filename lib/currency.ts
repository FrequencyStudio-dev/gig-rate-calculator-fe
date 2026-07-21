/*Formateo de moneda para toda la app*/

const CURRENCY_LOCALE = "es-UY"
const CURRENCY_CODE = "UYU"

const currencyFormatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: "currency",
  currency: CURRENCY_CODE,
})

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}
