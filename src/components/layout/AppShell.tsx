import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#111417]">
      <Sidebar />

      {/* Top app bar — mobile only */}
      <header className="md:hidden sticky top-0 z-50 flex items-center w-full px-6 py-3 bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-black/20">
        <span className="font-display text-xl font-black tracking-tighter text-orange-500">
          Novčanik
        </span>
      </header>

      {/* Main content */}
      <main className="md:pl-64 pb-24 md:pb-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
