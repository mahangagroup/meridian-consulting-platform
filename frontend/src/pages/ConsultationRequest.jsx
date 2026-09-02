import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'

const PROJECT_TYPES = [
  { value: 'BUSINESS_PURCHASE', label: 'Purchase an existing US business' },
  { value: 'MARKET_ENTRY', label: 'Enter the US market (new venture)' },
  { value: 'ADVISORY', label: 'General advisory' },
  { value: 'COMPLIANCE_LEGAL', label: 'Regulatory & compliance' },
  { value: 'OTHER', label: 'Other' }
]

const BUDGET_RANGES = [
  'Under $1M', '$1M - $5M', '$5M - $10M', '$10M - $25M', '$25M+', 'Not sure yet'
]

export default function ConsultationRequest() {
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    projectType: 'BUSINESS_PURCHASE',
    targetIndustry: '',
    budgetRange: '',
    description: ''
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) {
      navigate('/signup', { state: { from: '/request' } })
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await api.submitConsultation(token, {
        ...form,
        clientName: user.fullName,
        clientEmail: user.email,
        clientCountry: user.country,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 size={40} className="text-bridge-teal" />
        <h1 className="mt-5 font-display text-2xl text-mist">Your request is in.</h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-muted">
          A consultant will review your project and reach out shortly. You can track its status and
          message your consultant from your dashboard.
        </p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary mt-8">
          Go to my dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-medium text-bridge-teal">Start a consultation</p>
        <h1 className="mt-3 font-display text-3xl text-mist">Tell us about your project.</h1>
        <p className="mt-3 text-sm leading-relaxed text-mist-muted">
          {user
            ? "The more detail you give us, the faster we can match you with the right consultant."
            : "You'll need an account to track your request — we'll create one for you in the next step if you don't have one yet."}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="field-label" htmlFor="projectType">Type of project</label>
            <select id="projectType" className="field-input" value={form.projectType}
              onChange={(e) => update('projectType', e.target.value)}>
              {PROJECT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="targetIndustry">Target industry (optional)</label>
            <input id="targetIndustry" className="field-input" value={form.targetIndustry}
              onChange={(e) => update('targetIndustry', e.target.value)}
              placeholder="e.g. Hospitality, healthcare, manufacturing" />
          </div>

          <div>
            <label className="field-label" htmlFor="budgetRange">Budget range</label>
            <select id="budgetRange" className="field-input" value={form.budgetRange}
              onChange={(e) => update('budgetRange', e.target.value)}>
              <option value="" disabled>Select a range</option>
              {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="description">Project description</label>
            <textarea id="description" required rows={5} className="field-input resize-none"
              value={form.description} onChange={(e) => update('description', e.target.value)}
              placeholder="What are you looking to acquire or build in the US? Include location preferences, timeline, or anything else relevant." />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Submitting…' : user ? 'Submit request' : 'Continue to create an account'}
          </button>
        </form>
      </div>
    </div>
  )
}
