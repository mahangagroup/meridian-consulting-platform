import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'
import StatusBadge from '../components/StatusBadge'
import MessageThread from '../components/MessageThread'
import { PROJECT_TYPE_LABELS, formatDate } from '../utils'

const STATUS_OPTIONS = ['NEW', 'IN_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CLOSED']
const FILTERS = ['ALL', ...STATUS_OPTIONS]

export default function AdminDashboard() {
  const { user, token } = useAuth()
  const isAdmin = user.role === 'ADMIN'

  const [requests, setRequests] = useState([])
  const [consultants, setConsultants] = useState([])
  const [stats, setStats] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)

  async function refresh() {
    const list = isAdmin ? await api.allConsultations(token) : await api.assignedToMe(token)
    setRequests(list)
    if (list.length > 0 && !selectedId) setSelectedId(list[0].id)
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([
      refresh(),
      api.consultationStats(token).then(setStats).catch(() => {}),
      isAdmin ? api.listUsers(token, 'CONSULTANT').then(setConsultants).catch(() => {}) : Promise.resolve()
    ]).finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const filtered = useMemo(
    () => (filter === 'ALL' ? requests : requests.filter((r) => r.status === filter)),
    [requests, filter]
  )
  const selected = requests.find((r) => r.id === selectedId)

  async function handleStatusChange(id, status) {
    const updated = await api.updateStatus(token, id, status)
    setRequests((rs) => rs.map((r) => (r.id === id ? updated : r)))
  }

  async function handleAssign(id, consultantId) {
    const consultant = consultants.find((c) => c.id === consultantId)
    if (!consultant) return
    const updated = await api.assignConsultant(token, id, consultant.id, consultant.fullName)
    setRequests((rs) => rs.map((r) => (r.id === id ? updated : r)))
  }

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-mist-muted">{isAdmin ? 'Admin pipeline' : 'Your assigned leads'}</p>
          <h1 className="mt-1 font-display text-2xl text-mist">{user.fullName}</h1>
        </div>
      </div>

      {stats && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ['Total leads', stats.total],
            ['New', stats.new],
            ['In progress', stats.inProgress],
            ['Completed', stats.completed]
          ].map(([label, value]) => (
            <div key={label} className="card !p-4">
              <p className="font-display text-2xl text-brass-light">{value}</p>
              <p className="mt-1 text-xs text-mist-muted">{label}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <p className="mt-12 text-sm text-mist-muted">Loading pipeline…</p>
      ) : requests.length === 0 ? (
        <div className="card mt-12 text-center">
          <p className="text-sm text-mist-muted">
            {isAdmin ? 'No consultation requests yet.' : 'No leads assigned to you yet.'}
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === f ? 'bg-brass text-ink' : 'bg-ink-raised text-mist-muted hover:text-mist'
                  }`}
                >
                  {f === 'ALL' ? 'All' : f.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={`card w-full text-left transition-colors ${selectedId === r.id ? 'border-brass/60' : 'hover:border-ink-border'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-mist">{r.clientName}</p>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="mt-1 text-xs text-mist-muted">{r.clientCountry} · {PROJECT_TYPE_LABELS[r.projectType]}</p>
                  <p className="mt-2 line-clamp-2 text-xs text-mist-faint">{r.description}</p>
                </button>
              ))}
            </div>
          </div>

          {selected && (
            <div className="card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl text-mist">{selected.clientName}</h2>
                  <p className="mt-1 text-xs text-mist-muted">{selected.clientEmail} · {selected.clientCountry}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div className="mt-5 grid gap-4 border-t border-ink-border pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-mist-faint">Project type</p>
                  <p className="mt-1 text-sm text-mist">{PROJECT_TYPE_LABELS[selected.projectType]}</p>
                </div>
                <div>
                  <p className="text-xs text-mist-faint">Budget range</p>
                  <p className="mt-1 text-sm text-mist">{selected.budgetRange || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-mist-faint">Target industry</p>
                  <p className="mt-1 text-sm text-mist">{selected.targetIndustry || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-mist-faint">Submitted</p>
                  <p className="mt-1 text-sm text-mist">{formatDate(selected.createdAt)}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-mist-faint">Description</p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{selected.description}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-ink-border pt-5 sm:grid-cols-2">
                <div>
                  <label className="field-label">Status</label>
                  <select
                    className="field-input"
                    value={selected.status}
                    onChange={(e) => handleStatusChange(selected.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                </div>

                {isAdmin && (
                  <div>
                    <label className="field-label">Assigned consultant</label>
                    <select
                      className="field-input"
                      value={selected.assignedConsultantId || ''}
                      onChange={(e) => handleAssign(selected.id, e.target.value)}
                    >
                      <option value="" disabled>Assign a consultant</option>
                      {consultants.map((c) => <option key={c.id} value={c.id}>{c.fullName}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-ink-border pt-5">
                <p className="mb-3 text-sm font-medium text-mist">Conversation with {selected.clientName}</p>
                <MessageThread consultationId={selected.id} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
