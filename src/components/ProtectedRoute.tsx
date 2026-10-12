import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth()
  const { pathname } = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111417] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    // A visitor opening the bare site sees what the app is; the installed app
    // and deep links go straight to sign-in.
    const isInstalledApp = window.matchMedia('(display-mode: standalone)').matches
    const target = pathname === '/' && !isInstalledApp ? '/pocetna' : '/login'
    return <Navigate to={target} replace />
  }

  return <>{children}</>
}
