import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await login({ email, password })
      const redirectTo = location.state?.from || (res.role === 'CLIENT' ? '/dashboard' : '/admin')
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
        <h1 className="font-display text-2xl text-mist">Sign in</h1>
        <p className="mt-2 text-sm text-mist-muted">Access your consultation dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input id="email" type="email" required className="field-input" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          </div>
          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input id="password" type="password" required className="field-input" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 card !p-4 text-xs leading-relaxed text-mist-muted">
          <p className="font-medium text-mist-muted">Sample logins</p>
          <p className="mt-1">Admin: admin@meridianadvisory.com / Admin123!</p>
          <p>Consultant: james.calloway@meridianadvisory.com / Consult123!</p>
          <p>Client: omar.almansoori@example.ae / Client123!</p>
        </div>

        <p className="mt-6 text-center text-sm text-mist-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brass-light hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  )
}
