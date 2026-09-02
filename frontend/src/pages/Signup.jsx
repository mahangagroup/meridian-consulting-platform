import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const COUNTRIES = [
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
  'United Kingdom', 'India', 'Pakistan', 'Egypt', 'United States', 'Other'
]

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', phone: '', country: '', companyName: ''
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signup(form)
      const redirectTo = location.state?.from || '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center py-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-display text-2xl text-mist">Create your account</h1>
        <p className="mt-2 text-sm text-mist-muted">
          Set up an account to submit a project and track it with your consultant.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="field-label" htmlFor="fullName">Full name</label>
            <input id="fullName" required className="field-input" value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)} placeholder="Omar Al Mansoori" />
          </div>

          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input id="email" type="email" required className="field-input" value={form.email}
              onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" />
          </div>

          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input id="password" type="password" required minLength={8} className="field-input" value={form.password}
              onChange={(e) => update('password', e.target.value)} placeholder="At least 8 characters" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label" htmlFor="country">Country</label>
              <select id="country" required className="field-input" value={form.country}
                onChange={(e) => update('country', e.target.value)}>
                <option value="" disabled>Select</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="phone">Phone</label>
              <input id="phone" className="field-input" value={form.phone}
                onChange={(e) => update('phone', e.target.value)} placeholder="+971 4 555 0110" />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="companyName">Company (optional)</label>
            <input id="companyName" className="field-input" value={form.companyName}
              onChange={(e) => update('companyName', e.target.value)} placeholder="Al Mansoori Holdings" />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-mist-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-brass-light hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
