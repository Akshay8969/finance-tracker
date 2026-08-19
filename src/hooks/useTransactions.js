import { useState, useEffect, useCallback } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'
import { sortTransactions } from '../utils/helpers'

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)

  // ── Real-time Firestore listener 
  useEffect(() => {
    if (!user) {
      setTransactions([])
      setLoading(false)
      return
    }

    setLoading(true)

    // Stored at: users/{uid}/transactions
    const txCol = collection(db, 'users', user.uid, 'transactions')
    const q     = query(txCol, orderBy('date', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        setTransactions(data)
        setLoading(false)
      },
      (err) => {
        console.error('Firestore error:', err)
        setError(err.message)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [user])

  // ── Derived totals ─────────────────────────────────────────
  const totalIncome  = transactions.filter(t => t.type === 'income') .reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance      = totalIncome - totalExpense

  // ── CRUD ───────────────────────────────────────────────────
  const addTransaction = useCallback(async (data) => {
    if (!user) return
    const txCol = collection(db, 'users', user.uid, 'transactions')
    await addDoc(txCol, { ...data, amount: Number(data.amount), createdAt: new Date().toISOString() })
  }, [user])

  const updateTransaction = useCallback(async (id, data) => {
    if (!user) return
    const txDoc = doc(db, 'users', user.uid, 'transactions', id)
    await updateDoc(txDoc, { ...data, amount: Number(data.amount) })
  }, [user])

  const deleteTransaction = useCallback(async (id) => {
    if (!user) return
    const txDoc = doc(db, 'users', user.uid, 'transactions', id)
    await deleteDoc(txDoc)
  }, [user])

  // ── Filtering + sorting ────────────────────────────────────
  const getFiltered = useCallback(({
    search = '', filterType = 'all', filterCategory = 'all', sortBy = 'date_desc',
  }) => {
    let result = transactions

    if (filterType !== 'all')     result = result.filter(t => t.type === filterType)
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
