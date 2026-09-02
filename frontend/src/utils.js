export const PROJECT_TYPE_LABELS = {
  BUSINESS_PURCHASE: 'Business purchase / acquisition',
  MARKET_ENTRY: 'US market entry',
  ADVISORY: 'General advisory',
  COMPLIANCE_LEGAL: 'Regulatory & compliance',
  OTHER: 'Other'
}

export function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatDateTime(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}
