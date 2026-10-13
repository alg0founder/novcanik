import type { ReactNode } from 'react'

import type { PhoneTab } from './PhoneFrame'
import { DashboardScreen } from './screens/DashboardScreen'
import { TransactionsScreen } from './screens/TransactionsScreen'
import { BudgetScreen } from './screens/BudgetScreen'
import { ReportsScreen } from './screens/ReportsScreen'
import { SettingsScreen } from './screens/SettingsScreen'

export interface StoryStep {
  tab: PhoneTab
  kicker: string
  title: string
  text: string
  screen: ReactNode
}

export const STORY_STEPS: StoryStep[] = [
  {
    tab: 'pregled',
    kicker: '01 · Pregled',
    title: 'Jedan broj na vrhu: koliko ti je ostalo.',
    text: 'Ispod su prihodi, rashodi i poslednje transakcije. Strelicom se vraćaš na prošle mesece. Ako uključiš prenos salda, ono što ostane prelazi u sledeći mesec.',
    screen: <DashboardScreen />,
  },
  {
    tab: 'transakcije',
    kicker: '02 · Transakcije',
    title: 'Kafa, gorivo, Infostan. Upisano dok čekaš kusur.',
    text: 'Upišeš iznos i izabereš kategoriju. Beleška i datum su tu kad zatrebaju. Ceo mesec je na jednom spisku, a filterom gledaš samo prihode ili samo rashode.',
    screen: <TransactionsScreen />,
  },
  {
    tab: 'budzet',
    kicker: '03 · Budžet',
    title: 'Investiraš na početku meseca, ne od ostatka.',
    text: 'Računi se oduzmu sami, a ostatak deliš na trošenje, investiranje i davanje po pravilu 50/20/20/10 ili po svom. Traka na vrhu pokazuje kako je podeljena cela plata, pa svaki dinar koji skineš sa računa odmah vidiš kao više za sve ostalo.',
    screen: <BudgetScreen />,
  },
  {
    tab: 'izvestaji',
    kicker: '04 · Izveštaji',
    title: 'Gde zapravo odlazi novac.',
    text: 'Krug po kategorijama za celu godinu, ili od datuma do datuma. Obično iznenadi kategorija na koju se najmanje računa.',
    screen: <ReportsScreen />,
  },
  {
    tab: 'podesavanja',
    kicker: '05 · Podešavanja',
    title: 'Kategorije i valuta po tvom.',
    text: 'Kategorije dodaješ i preslažeš prevlačenjem, a iznosi mogu u dinarima, evrima ili dolarima. Novčanik staviš na početni ekran telefona i otvaraš ga kao svaku drugu aplikaciju.',
    screen: <SettingsScreen />,
  },
]
