import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'
import StatusBadge from '../components/StatusBadge'
import MessageThread from '../components/MessageThread'
import { PROJECT_TYPE_LABELS, formatDate } from '../utils'

export default function ClientDashboard() {
  const { user, token } = useAuth()
  const [requests, setRequests] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.myConsultations(token)
      .then((data) => {
        setRequests(data)
        if (data.length > 0) setSelectedId(data[0].id)
      })
      .finally(() => setLoading(false))
  }, [token])

  const selected = requests.find((r) => r.id === selectedId)

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-mist-muted">Welcome back,</p>
          <h1 className="mt-1 font-display text-2xl text-mist">{user.fullName}</h1>
        </div>
        <Link to="/request" className="btn-primary">New consultation</Link>
      </div>

      {loading ? (
        <p className="mt-12 text-sm text-mist-muted">Loading your requests…</p>
      ) : requests.length === 0 ? (
        <div className="card mt-12 text-center">
          <p className="text-sm text-mist-muted">You haven't submitted a project yet.</p>
          <Link to="/request" className="btn-primary mt-5 inline-flex">Start a consultation</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-3">
            {requests.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`card w-full text-left transition-colors ${selectedId === r.id ? 'border-brass/60' : 'hover:border-ink-border'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-mist">{PROJECT_TYPE_LABELS[r.projectType]}</p>
                  <StatusBadge status={r.status} />
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-mist-muted">{r.description}</p>
                <p className="mt-3 text-xs text-mist-faint">Submitted {formatDate(r.createdAt)}</p>
              </button>
            ))}
          </div>

          {selected && (
            <div className="card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl text-mist">{PROJECT_TYPE_LABELS[selected.projectType]}</h2>
                  <p className="mt-1 text-xs text-mist-muted">Submitted {formatDate(selected.createdAt)}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div className="mt-5 grid gap-4 border-t border-ink-border pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-mist-faint">Target industry</p>
                  <p className="mt-1 text-sm text-mist">{selected.targetIndustry || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-mist-faint">Budget range</p>
                  <p className="mt-1 text-sm text-mist">{selected.budgetRange || '—'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-mist-faint">Description</p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{selected.description}</p>
                </div>
                <div>
                  <p className="text-xs text-mist-faint">Consultant</p>
                  <p className="mt-1 text-sm text-mist">{selected.assignedConsultantName || 'Not yet assigned'}</p>
                </div>
              </div>

              {selected.assignedConsultantName && (
                <div className="mt-6 border-t border-ink-border pt-5">
                  <p className="mb-3 text-sm font-medium text-mist">Conversation with {selected.assignedConsultantName}</p>
                  <MessageThread consultationId={selected.id} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
