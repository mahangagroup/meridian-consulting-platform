import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'How It Works' }
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const dashboardPath = user?.role === 'ADMIN' || user?.role === 'CONSULTANT' ? '/admin' : '/dashboard'

  return (
    <header className="sticky top-0 z-40 border-b border-ink-border/70 bg-ink/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M4 22 Q16 8 28 22" stroke="#C9A15A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="4" cy="22" r="2.4" fill="#16A394" />
            <circle cx="28" cy="22" r="2.4" fill="#2B6CB0" />
          </svg>
          <span className="font-display text-lg tracking-tight text-mist">Meridian Advisory</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-brass-light' : 'text-mist-muted hover:text-mist'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to={dashboardPath} className="text-sm text-mist-muted hover:text-mist">
                {user.fullName.split(' ')[0]}'s dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary !px-4 !py-2 text-sm">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-mist-muted hover:text-mist">
                Sign in
              </Link>
              <Link to="/request" className="btn-primary !px-4 !py-2 text-sm">
                Start a consultation
              </Link>
            </>
          )}
        </div>

        <button
          className="text-mist md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-border bg-ink px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-mist-muted" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-ink-border pt-4">
              {user ? (
                <>
                  <Link to={dashboardPath} className="text-sm text-mist" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-secondary text-sm">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm text-mist" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                  <Link to="/request" className="btn-primary text-sm" onClick={() => setOpen(false)}>
                    Start a consultation
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
