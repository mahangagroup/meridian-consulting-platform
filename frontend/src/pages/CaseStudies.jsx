import React, { useEffect, useState } from 'react'
import { api } from '../api/client'

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.listCaseStudies()
      .then(setCaseStudies)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container-page py-16">
      <p className="text-sm font-medium text-bridge-teal">Case studies</p>
      <h1 className="mt-3 max-w-2xl font-display text-3xl text-mist md:text-4xl">
        Engagements across industries and origin markets.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-muted">
        A sample of how Meridian has guided investors from the Gulf, UK and beyond through US
        acquisitions and market entry.
      </p>

      {loading ? (
        <p className="mt-14 text-sm text-mist-muted">Loading case studies…</p>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {caseStudies.map((c) => (
            <div key={c.id} className="card">
              <div className="flex items-center justify-between">
                <p className="text-xs text-bridge-teal">{c.clientOrigin}</p>
                <p className="text-xs text-mist-faint">{c.industry}</p>
              </div>
              <h2 className="mt-3 font-display text-xl text-mist">{c.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist-muted">{c.summary}</p>
              <div className="mt-4 border-t border-ink-border pt-4">
                <p className="text-sm leading-relaxed text-mist">{c.outcome}</p>
              </div>
              <p className="mt-4 text-sm font-medium text-brass-light">{c.dealSize} transaction</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
