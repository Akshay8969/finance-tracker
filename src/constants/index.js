// ── Categories ────────────────────────────────────────────────
export const CATEGORIES = [
  'Work',
  'Investment',
  'Housing',
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Health',
  'Other',
]

export const CATEGORY_COLORS = {
  Work:          '#10B981',
  Investment:    '#6366F1',
  Housing:       '#F59E0B',
  Food:          '#EC4899',
  Transport:     '#3B82F6',
  Entertainment: '#8B5CF6',
  Utilities:     '#14B8A6',
  Health:        '#F43F5E',
  Other:         '#94A3B8',
}

export const CATEGORY_EMOJI = {
  Work:          '💼',
  Investment:    '📈',
  Housing:       '🏠',
  Food:          '🍔',
  Transport:     '🚗',
  Entertainment: '🎬',
  Utilities:     '⚡',
  Health:        '💪',
  Other:         '📦',
}

// ── Sample seed data ──────────────────────────────────────────
export const SAMPLE_TRANSACTIONS = [
  { id: '1',  title: 'Freelance Payment',    amount: 45000,  type: 'income',  category: 'Work',          date: '2025-02-10' },
  { id: '2',  title: 'Apartment Rent',        amount: 15000,  type: 'expense', category: 'Housing',       date: '2025-02-01' },
  { id: '3',  title: 'Grocery Run',           amount: 2800,   type: 'expense', category: 'Food',          date: '2025-02-08' },
  { id: '4',  title: 'Dividend Income',       amount: 3200,   type: 'income',  category: 'Investment',    date: '2025-02-05' },
  { id: '5',  title: 'OTT Subscriptions',     amount: 649,    type: 'expense', category: 'Entertainment', date: '2025-02-03' },
  { id: '6',  title: 'Ola & Auto Rides',      amount: 1200,   type: 'expense', category: 'Transport',     date: '2025-02-12' },
  { id: '7',  title: 'Part-time Tutoring',    amount: 12000,  type: 'income',  category: 'Work',          date: '2025-02-14' },
  { id: '8',  title: 'Electricity Bill',      amount: 1850,   type: 'expense', category: 'Utilities',     date: '2025-02-07' },
  { id: '9',  title: 'Gym Membership',        amount: 1500,   type: 'expense', category: 'Health',        date: '2025-02-02' },
  { id: '10', title: 'Side Project Sale',     amount: 8500,   type: 'income',  category: 'Investment',    date: '2025-02-16' },
  { id: '11', title: 'Internet & DTH',        amount: 999,    type: 'expense', category: 'Utilities',     date: '2025-02-06' },
  { id: '12', title: 'Canteen & Chai',        amount: 1400,   type: 'expense', category: 'Food',          date: '2025-02-09' },
]

// ── Sort options ──────────────────────────────────────────────
export const SORT_OPTIONS = [
  { value: 'date_desc',   label: 'Newest First'   },
  { value: 'date_asc',    label: 'Oldest First'   },
  { value: 'amount_desc', label: 'Highest Amount' },
  { value: 'amount_asc',  label: 'Lowest Amount'  },
]
