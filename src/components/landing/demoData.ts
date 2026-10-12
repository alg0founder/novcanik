import { Briefcase, Car, Coffee, Home, ShoppingCart, Zap, Dumbbell, type LucideIcon } from 'lucide-react'

// Made-up figures for the public page. Never real user data.

export interface DemoTransaction {
  category: string
  note: string
  date: string
  amount: number
  isIncome: boolean
  icon: LucideIcon
  color: string
}

export const DEMO_MONTH = 'Oktobar 2026'
export const DEMO_INCOME = 142000
export const DEMO_EXPENSE = 58940
export const DEMO_BALANCE = DEMO_INCOME - DEMO_EXPENSE

export const DEMO_TRANSACTIONS: DemoTransaction[] = [
  { category: 'Hrana', note: 'Maxi', date: '14. okt', amount: 4380, isIncome: false, icon: ShoppingCart, color: '#22c55e' },
  { category: 'Kafa', note: 'Sa Milošem', date: '14. okt', amount: 280, isIncome: false, icon: Coffee, color: '#f59e0b' },
  { category: 'Gorivo', note: 'NIS Petrol', date: '12. okt', amount: 6200, isIncome: false, icon: Car, color: '#3b82f6' },
  { category: 'Računi', note: 'Infostan', date: '10. okt', amount: 9650, isIncome: false, icon: Home, color: '#8b5cf6' },
  { category: 'Struja', note: 'EPS', date: '10. okt', amount: 5430, isIncome: false, icon: Zap, color: '#eab308' },
  { category: 'Teretana', note: 'Mesečna članarina', date: '5. okt', amount: 3500, isIncome: false, icon: Dumbbell, color: '#ec4899' },
  { category: 'Plata', note: 'Oktobar', date: '1. okt', amount: 142000, isIncome: true, icon: Briefcase, color: '#10b981' },
]

export const DEMO_REPORT: { name: string; amount: number; color: string }[] = [
  { name: 'Hrana', amount: 21400, color: '#ef4444' },
  { name: 'Računi', amount: 15080, color: '#f43f5e' },
  { name: 'Gorivo', amount: 9800, color: '#ec4899' },
  { name: 'Izlasci i kafa', amount: 7160, color: '#f97316' },
  { name: 'Teretana', amount: 3500, color: '#a855f7' },
  { name: 'Ostalo', amount: 2000, color: '#64748b' },
]
