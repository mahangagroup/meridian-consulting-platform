import React from 'react'
import { Link } from 'react-router-dom'

const STEPS = [
  {
    step: 1,
    title: 'Introductory call',
    body: "We start with a conversation about your goals, timeline, budget and where you're based, so we understand the shape of the project before proposing an approach."
  },
  {
    step: 2,
    title: 'Consultant assigned',
    body: 'A dedicated advisor is assigned to your project. You work with the same person throughout, rather than being routed between departments.'
  },
  {
    step: 3,
    title: 'Search, structure & diligence',
    body: 'For acquisitions, we identify and vet targets. For market entry, we map entity structure, licensing and location. Either way, we coordinate legal and financial diligence with you.'
  },
  {
    step: 4,
    title: 'Closing & transition support',
    body: "We support you through closing, then stay engaged for the first 100 days so the transition doesn't stall on operational details."
  }
]

export default function About() {
  return (
    <div className="container-page py-16">
      <p className="text-sm font-medium text-bridge-teal">How it works</p>
      <h1 className="mt-3 max-w-2xl font-display text-3xl text-mist md:text-4xl">
        A single point of contact, from first call to closing.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-muted">
        Meridian Advisory is based in the United States and works almost entirely with clients abroad —
        many in Dubai and across the Gulf — who want a business presence in the US without navigating
        US regulatory and market complexity alone.
      </p>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {STEPS.map((s) => (
          <div key={s.step} className="flex gap-5">
            <p className="font-display text-3xl text-brass/50">{String(s.step).padStart(2, '0')}</p>
            <div>
              <h2 className="text-base font-medium text-mist">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist-muted">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 card flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-xl text-mist">Ready to scope your project?</h2>
          <p className="mt-2 max-w-md text-sm text-mist-muted">
            Create an account and submit your project details — your consultant will follow up directly.
          </p>
        </div>
        <Link to="/request" className="btn-primary shrink-0">Start a consultation</Link>
      </div>
    </div>
  )
}
