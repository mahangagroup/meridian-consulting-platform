import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Globe2, LineChart, ShieldCheck, Settings2, Layers } from 'lucide-react'
import { api } from '../api/client'

const ICONS = { Building2, Globe2, LineChart, ShieldCheck, Settings2, Layers }

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.listServices()
      .then(setServices)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container-page py-16">
      <p className="text-sm font-medium text-bridge-teal">Services</p>
      <h1 className="mt-3 max-w-2xl font-display text-3xl text-mist md:text-4xl">
        Advisory for every stage of establishing a US business.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-muted">
        Every engagement is led by one dedicated consultant, drawing on legal, financial and
        regulatory specialists as your project needs them.
      </p>

      {loading ? (
        <p className="mt-14 text-sm text-mist-muted">Loading services…</p>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const Icon = ICONS[s.icon] || Building2
            return (
              <div key={s.id} className="card">
                <Icon size={24} className="text-brass-light" strokeWidth={1.75} />
                <h2 className="mt-4 text-lg font-medium text-mist">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">{s.description}</p>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-16 card flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-xl text-mist">Not sure which service fits your project?</h2>
          <p className="mt-2 max-w-md text-sm text-mist-muted">
            Submit a project brief and your consultant will scope the right approach with you.
          </p>
        </div>
        <Link to="/request" className="btn-primary shrink-0">Start a consultation</Link>
      </div>
    </div>
  )
}
