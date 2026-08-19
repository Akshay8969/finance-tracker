import { useState, useEffect, useCallback } from 'react'
import { useAuth }           from '../context/AuthContext'
import { sortTransactions }  from '../utils/helpers'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function authHeaders() {
  const token = localStorage.getItem('ft_token')
  return {
    'Content-Type': 'application/json',
    Authorization:  `Bearer ${token}`,
  }
}

/** Normalize MongoDB _id → id so the rest of the app works unchanged */
function normalizeDoc(doc) {
  return { ...doc, id: doc._id }
}

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)

  // ── Fetch all transactions for the current user ───────────
  const fetchTransactions = useCallback(async () => {
    if (!user) { setTransactions([]); setLoading(false); return }
    setLoading(true)
    try {
      const r = await fetch(`${API}/api/transactions`, { headers: authHeaders() })
      if (!r.ok) throw new Error('Failed to fetch transactions')
      const data = await r.json()
      setTransactions(data.map(normalizeDoc))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => { fetchTransactions() }, [fetchTransactions])

  // ── Derived totals ────────────────────────────────────────
  const totalIncome  = transactions.filter(t => t.type === 'income') .reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance      = totalIncome - totalExpense

  // ── CRUD ──────────────────────────────────────────────────
  const addTransaction = useCallback(async (data) => {
    if (!user) return
    const r = await fetch(`${API}/api/transactions`, {
      method:  'POST',
      headers: authHeaders(),
      body:    JSON.stringify({ ...data, amount: Number(data.amount) }),
    })
    if (!r.ok) {
      const err = await r.json()
      throw new Error(err.message)
    }
    await fetchTransactions()
  }, [user, fetchTransactions])

  const updateTransaction = useCallback(async (id, data) => {
    if (!user) return
    const r = await fetch(`${API}/api/transactions/${id}`, {
      method:  'PUT',
      headers: authHeaders(),
      body:    JSON.stringify({ ...data, amount: Number(data.amount) }),
    })
    if (!r.ok) {
      const err = await r.json()
      throw new Error(err.message)
    }
    await fetchTransactions()
  }, [user, fetchTransactions])

  const deleteTransaction = useCallback(async (id) => {
    if (!user) return
    const r = await fetch(`${API}/api/transactions/${id}`, {
      method:  'DELETE',
      headers: authHeaders(),
    })
    if (!r.ok) {
      const err = await r.json()
      throw new Error(err.message)
    }
    await fetchTransactions()
  }, [user, fetchTransactions])

  // ── Filtering + sorting ───────────────────────────────────
  const getFiltered = useCallback(({
    search = '', filterType = 'all', filterCategory = 'all', sortBy = 'date_desc',
  }) => {
    let result = transactions
    if (filterType     !== 'all') result = result.filter(t => t.type     === filterType)
    if (filterCategory !== 'all') result = result.filter(t => t.category === filterCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      )
    }
    return sortTransactions(result, sortBy)
  }, [transactions])

  return {
    transactions, loading, error,
    totalIncome, totalExpense, balance,
    addTransaction, updateTransaction, deleteTransaction,
    getFiltered,
  }
}
