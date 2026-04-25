export function formatAmount(amount: number, currency: string): string {
  const num = Math.round(amount).toLocaleString('de-DE')
  switch (currency) {
    case '€': return `${num} €`
    case '$': return `${num} $`
    default: return `${num} RSD`
  }
}
