import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Globe2, LineChart, ShieldCheck, Settings2, Layers } from 'lucide-react'
import { api } from '../api/client'

const ICONS = { Building2, Globe2, LineChart, ShieldCheck, Settings2, Layers }

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Introductory call',
    body: "Tell us about your goals, timeline and where you're based. We map out what a US acquisition or launch would actually take."
  },
  {
    step: 2,
    title: 'Consultant assigned',
    body: 'A dedicated advisor takes ownership of your project — the same person you speak with from search through closing.'
  },
  {
    step: 3,
    title: 'Search, structure, diligence',
    body: 'We identify targets or entry paths, coordinate financing and legal structuring, and run due diligence with you.'
  },
  {
    step: 4,
    title: 'Closing & transition',
    body: 'We support closing and the first 100 days of operation, so ownership transition is not where the plan falls apart.'
  }
]

export default function Landing() {
  const [services, setServices] = useState([])
  const [caseStudies, setCaseStudies] = useState([])

  useEffect(() => {
    api.listServices().then(setServices).catch(() => {})
    api.listCaseStudies().then(setCaseStudies).catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-16 md:pt-24">
        <div className="container-page grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-medium text-bridge-teal">US-based · Serving investors worldwide</p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.1] text-mist md:text-5xl">
              Buying or building a business in the United States, guided from your first call to closing.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-mist-muted">
              Meridian Advisory works with investors and companies abroad — many of them based in Dubai
              and across the Gulf — who want to acquire, launch or expand a business on US soil, without
              relocating first to figure out how.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/request" className="btn-primary">
                Start a consultation
              </Link>
              <Link to="/case-studies" className="btn-secondary">
                See how it's worked before
              </Link>
            </div>

            <div className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-ink-border pt-8">
              <div>
                <p className="font-display text-2xl text-brass-light">120+</p>
                <p className="mt-1 text-xs text-mist-muted">Cross-border engagements</p>
              </div>
              <div>
                <p className="font-display text-2xl text-brass-light">18</p>
                <p className="mt-1 text-xs text-mist-muted">Countries of origin</p>
              </div>
              <div>
                <p className="font-display text-2xl text-brass-light">$640M+</p>
                <p className="mt-1 text-xs text-mist-muted">Transaction value advised</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="card overflow-hidden !p-0">
              <svg viewBox="0 0 480 360" className="w-full" role="img" aria-label="Illustration of a bridge connecting two markets">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#131826" />
                    <stop offset="100%" stopColor="#0B0F19" />
                  </linearGradient>
                  <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#16A394" />
                    <stop offset="100%" stopColor="#2B6CB0" />
                  </linearGradient>
                </defs>
                <rect width="480" height="360" fill="url(#skyGrad)" />
                {/* Dubai-ish skyline, left */}
                <g fill="#1A2032" stroke="#262E42">
                  <rect x="40" y="220" width="14" height="110" />
                  <rect x="60" y="180" width="16" height="150" />
                  <rect x="82" y="240" width="12" height="90" />
                  <polygon points="100,330 108,150 116,330" />
                  <rect x="128" y="200" width="14" height="130" />
                </g>
                {/* US skyline, right */}
                <g fill="#1A2032" stroke="#262E42">
                  <rect x="330" y="210" width="18" height="120" />
                  <rect x="354" y="170" width="14" height="160" />
                  <rect x="374" y="230" width="16" height="100" />
                  <rect x="396" y="190" width="12" height="140" />
                  <rect x="414" y="245" width="18" height="85" />
                </g>
                {/* connecting arc */}
                <path d="M100 220 Q240 90 380 220" stroke="url(#arcGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="100" cy="220" r="5" fill="#16A394" />
                <circle cx="380" cy="220" r="5" fill="#2B6CB0" />
                <circle cx="240" cy="112" r="3.5" fill="#C9A15A" />
              </svg>
              <div className="border-t border-ink-border p-6">
                <p className="text-sm text-mist-muted">
                  <span className="text-brass-light">Dubai → Dallas.</span> A recent engagement moved a family
                  office from initial call to closing on a Texas hospitality group in five months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="border-t border-ink-border/70 py-20">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl text-mist md:text-3xl">Where we help</h2>
              <p className="mt-2 max-w-lg text-sm text-mist-muted">
                Advisory built around the full arc of a cross-border acquisition or launch, not just the deal itself.
              </p>
            </div>
            <Link to="/services" className="hidden shrink-0 items-center gap-1 text-sm text-brass-light hover:underline md:flex">
              View all services <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => {
              const Icon = ICONS[s.icon] || Building2
              return (
                <div key={s.id} className="card">
                  <Icon size={22} className="text-brass-light" strokeWidth={1.75} />
                  <h3 className="mt-4 text-base font-medium text-mist">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-muted">{s.summary}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-ink-border/70 py-20">
        <div className="container-page">
          <h2 className="font-display text-2xl text-mist md:text-3xl">How an engagement runs</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.step} className="relative">
                <p className="font-display text-3xl text-brass/40">{String(s.step).padStart(2, '0')}</p>
                <h3 className="mt-3 text-base font-medium text-mist">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">{s.body}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="mt-6 hidden h-px w-full bg-ink-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies preview */}
      <section className="border-t border-ink-border/70 py-20">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl text-mist md:text-3xl">Recent engagements</h2>
            <Link to="/case-studies" className="hidden shrink-0 items-center gap-1 text-sm text-brass-light hover:underline md:flex">
              All case studies <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {caseStudies.slice(0, 2).map((c) => (
              <div key={c.id} className="card">
                <p className="text-xs text-bridge-teal">{c.clientOrigin} · {c.industry}</p>
                <h3 className="mt-2 font-display text-xl text-mist">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-muted">{c.summary}</p>
                <p className="mt-4 text-sm leading-relaxed text-mist">{c.outcome}</p>
                <p className="mt-4 text-sm font-medium text-brass-light">{c.dealSize} transaction</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-border/70 py-20">
        <div className="container-page">
          <div className="card bg-bridge-gradient !border-none !bg-opacity-100 px-8 py-12 md:px-14">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl text-white md:text-3xl">
                Tell us what you're trying to build in the US.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                Submit a project — a business you'd like to acquire, a market you want to enter — and a
                dedicated consultant will follow up to scope it with you.
              </p>
              <Link to="/request" className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/90">
                Start a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
