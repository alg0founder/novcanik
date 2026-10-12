import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  /** Shown instead of the sign-in redirect to a signed-out visitor on the bare site. */
  guestHome?: ReactNode
}

export function ProtectedRoute({ children, guestHome }: ProtectedRouteProps) {
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
    // A visitor on the bare site gets the start page at "/" itself (no redirect,
    // so search engines index the real content); the installed app and deep
    // links go straight to sign-in.
    const isInstalledApp = window.matchMedia('(display-mode: standalone)').matches
    if (guestHome && pathname === '/' && !isInstalledApp) return <>{guestHome}</>
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
