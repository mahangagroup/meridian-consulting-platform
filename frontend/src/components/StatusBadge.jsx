import React from 'react'

const STATUS_STYLES = {
  NEW: 'bg-bridge-blue/15 text-blue-300',
  IN_REVIEW: 'bg-brass/15 text-brass-light',
  ASSIGNED: 'bg-bridge-teal/15 text-teal-300',
  IN_PROGRESS: 'bg-brass/15 text-brass-light',
  COMPLETED: 'bg-green-500/15 text-green-300',
  CLOSED: 'bg-ink-raised text-mist-faint'
}

const STATUS_LABELS = {
  NEW: 'New',
  IN_REVIEW: 'In review',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  CLOSED: 'Closed'
}

export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${STATUS_STYLES[status] || 'bg-ink-raised text-mist-muted'}`}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}
