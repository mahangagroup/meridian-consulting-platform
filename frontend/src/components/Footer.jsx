import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-ink-border/70 py-12">
      <div className="container-page grid gap-10 md:grid-cols-3">
        <div>
          <span className="font-display text-lg text-mist">Meridian Advisory</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist-muted">
            A US-based advisory firm helping international investors acquire, launch and operate
            businesses across the United States.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-mist">Get in touch</p>
          <p className="mt-3 text-sm text-mist-muted">New York · Dallas · Miami</p>
          <p className="mt-1 text-sm text-mist-muted">hello@meridianadvisory.com</p>
          <p className="mt-1 text-sm text-mist-muted">+1 (212) 555-0142</p>
        </div>

        <div>
          <p className="text-sm font-medium text-mist">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-mist-muted">
            <Link to="/services" className="hover:text-mist">Services</Link>
            <Link to="/case-studies" className="hover:text-mist">Case studies</Link>
            <Link to="/request" className="hover:text-mist">Start a consultation</Link>
          </div>
        </div>
      </div>

      <div className="container-page mt-10 border-t border-ink-border/70 pt-6 text-xs text-mist-faint">
        © {new Date().getFullYear()} Meridian Advisory. Sample platform for demonstration purposes.
      </div>
    </footer>
  )
}
