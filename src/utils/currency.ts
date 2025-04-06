export function formatCurrency(
  value: number,
  locale: string = "en-EU",
  currency: string = "EUR"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
