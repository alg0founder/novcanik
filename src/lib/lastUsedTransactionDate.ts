let entry: { date: string; day: string } | null = null

export function getLastUsedTransactionDate(): string | null {
  if (!entry) return null
  const today = new Date().toISOString().split('T')[0]
  if (entry.day !== today) { entry = null; return null }
  return entry.date
}

export function setLastUsedTransactionDate(date: string): void {
  const today = new Date().toISOString().split('T')[0]
  entry = { date, day: today }
}
