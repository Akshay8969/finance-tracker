import { useState } from 'react'
import SummaryCards  from '../components/SummaryCards'
import Filters       from '../components/Filters'
import TransactionList from '../components/TransactionList'
import SpendingChart from '../components/SpendingChart'
import QuickStats    from '../components/QuickStats'
import AddEditModal  from '../components/AddEditModal'
import DeleteConfirm from '../components/DeleteConfirm'
import Toast         from '../components/Toast'
import Icon          from '../components/Icon'
import { useTransactions } from '../hooks/useTransactions'
import { useToast }        from '../hooks/useToast'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const {
    transactions,
    totalIncome, totalExpense, balance,
    addTransaction, updateTransaction, deleteTransaction,
    getFiltered,
  } = useTransactions()

  const { toast, showToast } = useToast()

  // Filters
  const [search,         setSearch]         = useState('')
  const [filterType,     setFilterType]     = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy,         setSortBy]         = useState('date_desc')

  // Modals
  const [showModal,     setShowModal]     = useState(false)
  const [editItem,      setEditItem]      = useState(null)
  const [deleteTarget,  setDeleteTarget]  = useState(null)

  const filtered = getFiltered({ search, filterType, filterCategory, sortBy })

  // ── Handlers ──────────────────────────────────────────────
  const handleOpenAdd = () => { setEditItem(null); setShowModal(true) }
  const handleOpenEdit = (tx) => { setEditItem(tx); setShowModal(true) }
  const handleCloseModal = () => { setShowModal(false); setEditItem(null) }

  const handleSubmit = (formData) => {
    if (editItem) {
      updateTransaction(editItem.id, formData)
      showToast('Transaction updated!')
    } else {
      addTransaction(formData)
      showToast('Transaction added!')
    }
    handleCloseModal()
  }

  const handleDeleteConfirm = () => {
    deleteTransaction(deleteTarget)
    setDeleteTarget(null)
    showToast('Transaction deleted', 'error')
  }

  return (
    <div className={styles.page}>
      {/* Page heading */}
      <div className={`${styles.heading} animate-fade-up`}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Your financial overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button className={styles.addBtn} onClick={handleOpenAdd}>
          <Icon name="plus" size={15} />
          Add Transaction
        </button>
      </div>

      {/* Summary cards */}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
        incomeCount={transactions.filter(t => t.type === 'income').length}
        expenseCount={transactions.filter(t => t.type === 'expense').length}
      />

      {/* Content grid */}
      <div className={styles.contentGrid}>
        {/* Main column */}
        <div className={styles.mainCol}>
          {/* Filters */}
          <div className={`${styles.panel} animate-fade-up delay-2`}>
            <Filters
              search={search}            onSearch={setSearch}
              filterType={filterType}    onFilterType={setFilterType}
              filterCategory={filterCategory} onFilterCategory={setFilterCategory}
              sortBy={sortBy}            onSortBy={setSortBy}
            />
          </div>

          {/* Transactions */}
          <div className="animate-fade-up delay-3">
            <TransactionList
              transactions={filtered}
              onEdit={handleOpenEdit}
              onDelete={setDeleteTarget}
              onAdd={handleOpenAdd}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className="animate-fade-up delay-2">
            <SpendingChart transactions={transactions} totalExpense={totalExpense} />
          </div>
          <div className="animate-fade-up delay-3">
            <QuickStats
              transactions={transactions}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              balance={balance}
            />
          </div>
        </aside>
      </div>

      {/* FAB */}
      <button className={styles.fab} onClick={handleOpenAdd} aria-label="Add transaction">
        <Icon name="plus" size={22} />
      </button>

      {/* Modals */}
      <AddEditModal
        isOpen={showModal}
        editItem={editItem}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
      <DeleteConfirm
        isOpen={!!deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
      <Toast toast={toast} />
    </div>
  )
}
