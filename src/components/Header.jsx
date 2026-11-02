import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../lib/favorites'

const links = [
  { to: '/buy', label: 'Buy', end: false },
  { to: '/rent', label: 'Rent', end: false },
  { to: '/sell', label: 'Sell your car', end: false },
  { to: '/favorites', label: 'Favourites', end: false },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { favorites } = useFavorites()

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-display text-lg font-bold text-white">
            A
          </span>
          <span className="font-display text-2xl font-bold tracking-tight">
            Auto<span className="text-gold">Lux</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative pb-1 text-sm font-medium transition ${
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {l.to === '/favorites' && favorites.length > 0 && (
                    <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-xs font-semibold text-white">
                      {favorites.length}
                    </span>
                  )}
                  {isActive && <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-gold" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/sell"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition hover:bg-gold sm:block"
          >
            Sell your car
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sand text-ink md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-sand bg-cream px-4 py-3 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-parchment text-ink' : 'text-ink-muted'}`
              }
            >
              {l.label}
              {l.to === '/favorites' && favorites.length > 0 ? ` (${favorites.length})` : ''}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
