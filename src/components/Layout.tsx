import { NavLink, Outlet } from 'react-router'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/transactions', label: 'Buchungen' },
  { to: '/settings', label: 'Einstellungen' },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-3">
          <span className="font-semibold">Budget-Tracker</span>
          <ul className="flex gap-4 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'font-medium text-emerald-700'
                      : 'text-slate-600 hover:text-slate-900'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
