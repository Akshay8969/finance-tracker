import { useState, useEffect } from 'react'
import Icon from './Icon'
import { CATEGORIES, CATEGORY_EMOJI } from '../constants'
import styles from './AddEditModal.module.css'

const EMPTY_FORM = {
  title:    '',
  amount:   '',
  type:     'expense',
  category: 'Food',
  date:     new Date().toISOString().slice(0, 10),
}

export default function AddEditModal({ isOpen, editItem, onClose, onSubmit }) {
  const [form, setForm]     = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      if (editItem) {
        setForm({
          title:    editItem.title,
          amount:   String(editItem.amount),
          type:     editItem.type,
          category: editItem.category,
          date:     editItem.date,
        })
      } else {
        setForm(EMPTY_FORM)
      }
      setErrors({})
    }
  }, [isOpen, editItem])

  const validate = () => {
    const e = {}
    if (!form.title.trim())                  e.title  = 'Title is required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
                                              e.amount = 'Enter a valid amount'
    if (!form.date)                          e.date   = 'Date is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit({ ...form, amount: Number(form.amount) })
  }

  const set = (key, value) => {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  if (!isOpen) return null

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={editItem ? 'Edit transaction' : 'Add transaction'}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {editItem ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Type toggle */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <div className={styles.typeToggle}>
            {['income', 'expense'].map(t => (
              <button
                key={t}
                type="button"
                className={`${styles.typeBtn} ${form.type === t ? styles[`typeActive_${t}`] : ''}`}
                onClick={() => set('type', t)}
              >
                <Icon name={t === 'income' ? 'arrowUp' : 'arrowDown'} size={14} />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="tx-title">Title</label>
          <input
            id="tx-title"
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            type="text"
            placeholder="e.g. Freelance Payment"
            value={form.title}
            onChange={e => set('title', e.target.value)}
          />
          {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}
        </div>

        {/* Amount + Date */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="tx-amount">Amount (₹)</label>
            <input
              id="tx-amount"
              className={`${styles.input} ${errors.amount ? styles.inputError : ''}`}
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
            />
            {errors.amount && <p className={styles.errorMsg}>{errors.amount}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="tx-date">Date</label>
            <input
              id="tx-date"
              className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
            {errors.date && <p className={styles.errorMsg}>{errors.date}</p>}
          </div>
        </div>

        {/* Category */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="tx-category">Category</label>
          <select
            id="tx-category"
            className={styles.input}
            value={form.category}
            onChange={e => set('category', e.target.value)}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{CATEGORY_EMOJI[c]} {c}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button className={styles.submitBtn} type="button" onClick={handleSubmit}>
          <Icon name="check" size={16} />
          {editItem ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </div>
    </div>
  )
}
