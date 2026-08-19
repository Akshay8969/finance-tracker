
/**
  Format a number as INR currency string.
  Uses Indian number formatting (e.g. ₹1,23,456.00)
  @param {number} amount
  @param {boolean} showSign  – prefix + for positive values
 */
export function formatCurrency(amount, showSign = false) {
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))

  const prefix = showSign ? (amount >= 0 ? '+' : '-') : ''
  return `${prefix}₹${formatted}`
}


/**
  Format an ISO date string to a human-readable form.
  @param {string} iso   – e.g. "2025-02-10"
  @param {'short'|'long'} style
 */
export function formatDate(iso, style = 'short') {
  const opts =
    style === 'long'
      ? { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric' }
  return new Date(iso).toLocaleDateString('en-US', opts)
}



export function calcSavingsRate(income, balance) {
  if (!income) return 0
  return Math.max(0, Math.min(100, (balance / income) * 100))
}


/**
  Sort an array of transactions by the given sort key.
  @param {Object[]} list
  @param {'date_desc'|'date_asc'|'amount_desc'|'amount_asc'} sortBy
 */
export function sortTransactions(list, sortBy) {
  return [...list].sort((a, b) => {
    switch (sortBy) {
      case 'date_desc':   return new Date(b.date) - new Date(a.date)
      case 'date_asc':    return new Date(a.date) - new Date(b.date)
      case 'amount_desc': return b.amount - a.amount
      case 'amount_asc':  return a.amount - b.amount
      default:            return 0
    }
  })
}
