const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function request(path, { method = 'GET', body, token, headers = {} } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  })

  let data = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const message = (data && data.message) || `Request failed (${res.status})`
    throw new Error(message)
  }

  return data
}

export const api = {
  // Auth
  signup: (payload) => request('/api/auth/signup', { method: 'POST', body: payload }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: payload }),
  me: (token) => request('/api/auth/me', { token }),

  // Users (admin)
  listUsers: (token, role) => request(`/api/users${role ? `?role=${role}` : ''}`, { token }),

  // Catalog
  listServices: () => request('/api/services'),
  listCaseStudies: () => request('/api/case-studies'),

  // Consultations
  submitConsultation: (token, payload) => request('/api/consultations', { method: 'POST', body: payload, token }),
  myConsultations: (token) => request('/api/consultations/mine', { token }),
  allConsultations: (token) => request('/api/consultations/all', { token }),
  assignedToMe: (token) => request('/api/consultations/assigned-to-me', { token }),
  consultationStats: (token) => request('/api/consultations/stats', { token }),
  updateStatus: (token, id, status) =>
    request(`/api/consultations/${id}/status`, { method: 'PATCH', body: { status }, token }),
  assignConsultant: (token, id, consultantId, consultantName) =>
    request(`/api/consultations/${id}/assign`, {
      method: 'PATCH',
      body: { consultantId, consultantName },
      token
    }),

  // Notifications
  myNotifications: (token) => request('/api/notifications', { token }),
  unreadCount: (token) => request('/api/notifications/unread-count', { token }),
  markNotificationRead: (token, id) => request(`/api/notifications/${id}/read`, { method: 'PATCH', token }),

  // Messages
  getThread: (token, consultationId) => request(`/api/messages/consultation/${consultationId}`, { token }),
  sendMessage: (token, consultationId, content) =>
    request('/api/messages', { method: 'POST', body: { consultationId, content }, token })
}
