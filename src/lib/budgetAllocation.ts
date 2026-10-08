export interface AllocationInput {
  monthlyIncome: number
  billsCosts: number
  spendingPct: number
  investingPct: number
  givingPct: number
}

export interface IncomeShares {
  bills: number
  spending: number
  investing: number
  giving: number
  unallocated: number
}

/**
 * Rounds percentages so they still add up to exactly 100 (largest remainder method).
 * Plain Math.round on each part can show 101% or 99%, which is the exact confusion
 * the budget screen is supposed to remove.
 * @param values raw percentages that sum to 100
 * @returns whole-number percentages in the same order, summing to 100
 */
export function roundToHundred(values: number[]): number[] {
  const floors = values.map(v => Math.floor(v))
  let missing = 100 - floors.reduce((s, v) => s + v, 0)
  const byRemainder = values
    .map((v, i) => ({ i, rest: v - Math.floor(v) }))
    .sort((a, b) => b.rest - a.rest)
  for (const { i } of byRemainder) {
    if (missing <= 0) break
    floors[i] += 1
    missing -= 1
  }
  return floors
}

/**
 * Splits the whole monthly income into shares (in %, summing to 100).
 * Bills take their actual share; the three sliders are percentages of what remains
 * after bills, so a change in bills changes amounts but never the slider split.
 * @param input income, bills total and the three slider percentages (of the remainder)
 * @returns whole-number shares of total income, or null when there is no positive income
 */
export function getIncomeShares(input: AllocationInput): IncomeShares | null {
  const { monthlyIncome, billsCosts, spendingPct, investingPct, givingPct } = input
  if (monthlyIncome <= 0) return null

  const bills = Math.min(Math.max(billsCosts / monthlyIncome, 0), 1) * 100
  const rest = 100 - bills
  const sliderSum = spendingPct + investingPct + givingPct
  const raw = [
    bills,
    (spendingPct / 100) * rest,
    (investingPct / 100) * rest,
    (givingPct / 100) * rest,
    (Math.max(100 - sliderSum, 0) / 100) * rest,
  ]
  const [b, s, i, g, u] = roundToHundred(raw)
  return { bills: b, spending: s, investing: i, giving: g, unallocated: u }
}
