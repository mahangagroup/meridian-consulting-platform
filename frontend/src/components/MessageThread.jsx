import React, { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'
import { formatDateTime } from '../utils'

export default function MessageThread({ consultationId }) {
  const { user, token } = useAuth()
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    let active = true
    api.getThread(token, consultationId)
      .then((data) => { if (active) setMessages(data) })
      .finally(() => setLoading(false))
    return () => { active = false }
  }, [consultationId, token])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' })
  }, [messages])

  async function handleSend(e) {
    e.preventDefault()
    if (!content.trim()) return
    setSending(true)
    try {
      const msg = await api.sendMessage(token, consultationId, content.trim())
      setMessages((m) => [...m, msg])
      setContent('')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto pr-1" style={{ maxHeight: '360px' }}>
        {loading && <p className="text-sm text-mist-muted">Loading conversation…</p>}
        {!loading && messages.length === 0 && (
          <p className="text-sm text-mist-muted">No messages yet. Say hello to get things started.</p>
        )}
        {messages.map((m) => {
          const mine = m.senderId === user.id
          return (
            <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${mine ? 'bg-brass/15 text-mist' : 'bg-ink-raised text-mist'}`}>
                <p className="mb-1 text-xs text-mist-muted">{m.senderName} · {formatDateTime(m.createdAt)}</p>
                <p className="leading-relaxed">{m.content}</p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex items-center gap-2 border-t border-ink-border pt-4">
        <input
          className="field-input flex-1"
          placeholder="Write a message…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" disabled={sending || !content.trim()} className="btn-primary !px-3.5 !py-2.5">
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
