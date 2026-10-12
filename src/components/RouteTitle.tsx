import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

const HOME_TITLE = 'Novčanik · Besplatna aplikacija za kućni budžet i praćenje troškova'

const TITLES: Record<string, string> = {
  '/login': 'Prijava i registracija · Novčanik',
  '/reset-password': 'Nova lozinka · Novčanik',
  '/privacy-policy': 'Politika privatnosti · Novčanik',
  '/terms-of-service': 'Uslovi korišćenja · Novčanik',
  '/transakcije': 'Transakcije · Novčanik',
  '/budzet': 'Budžet · Novčanik',
  '/izvestaji': 'Izveštaji · Novčanik',
  '/podesavanja': 'Podešavanja · Novčanik',
}

/** Keeps the browser tab title in step with the route; search results show it too. */
export function RouteTitle() {
  const { pathname } = useLocation()
  const { session } = useAuth()

  // Updates the tab title on every route or sign-in change.
  useEffect(() => {
    if (pathname === '/') {
      document.title = session ? 'Pregled · Novčanik' : HOME_TITLE
      return
    }
    document.title = TITLES[pathname] ?? HOME_TITLE
  }, [pathname, session])

  return null
}
