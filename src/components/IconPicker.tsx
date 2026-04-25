import {
  Wallet, Briefcase, DollarSign, PiggyBank, TrendingUp, Gift,
  Home, Zap, ShoppingCart, Utensils, Plane, ShoppingBag,
  Heart, Dumbbell, Car, Music, Coffee, Phone,
  Shirt, BookOpen, Users, Wrench, Bus, Receipt,
  type LucideIcon,
} from 'lucide-react'

interface IconEntry {
  name: string
  component: LucideIcon
}

export const CATEGORY_ICONS: IconEntry[] = [
  { name: 'Wallet', component: Wallet },
  { name: 'Briefcase', component: Briefcase },
  { name: 'DollarSign', component: DollarSign },
  { name: 'PiggyBank', component: PiggyBank },
  { name: 'TrendingUp', component: TrendingUp },
  { name: 'Gift', component: Gift },
  { name: 'Home', component: Home },
  { name: 'Zap', component: Zap },
  { name: 'ShoppingCart', component: ShoppingCart },
  { name: 'Utensils', component: Utensils },
  { name: 'Plane', component: Plane },
  { name: 'ShoppingBag', component: ShoppingBag },
  { name: 'Heart', component: Heart },
  { name: 'Dumbbell', component: Dumbbell },
  { name: 'Car', component: Car },
  { name: 'Music', component: Music },
  { name: 'Coffee', component: Coffee },
  { name: 'Phone', component: Phone },
  { name: 'Shirt', component: Shirt },
  { name: 'BookOpen', component: BookOpen },
  { name: 'Users', component: Users },
  { name: 'Wrench', component: Wrench },
  { name: 'Bus', component: Bus },
  { name: 'Receipt', component: Receipt },
]

export function renderCategoryIcon(name: string | null, size = 18, color?: string) {
  const entry = CATEGORY_ICONS.find(i => i.name === name)
  if (!entry) return null
  return <entry.component size={size} color={color} />
}

interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="grid grid-cols-8 gap-1 p-2 bg-slate-800/80 rounded-xl border border-slate-700">
      {CATEGORY_ICONS.map(icon => (
        <button
          key={icon.name}
          type="button"
          onClick={() => onChange(icon.name)}
          aria-label={icon.name}
          className={`p-2 rounded-lg transition-colors ${
            value === icon.name
              ? 'bg-orange-500/20 text-orange-400'
              : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          <icon.component size={18} />
        </button>
      ))}
    </div>
  )
}
