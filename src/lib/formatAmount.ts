export function formatAmount(amount: number, currency: string): string {
  const hasDecimals = amount % 1 !== 0
  const num = amount.toLocaleString('de-DE', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  })
  switch (currency) {
    case '€': return `${num} €`
    case '$': return `${num} $`
    default: return `${num} RSD`
  }
}
