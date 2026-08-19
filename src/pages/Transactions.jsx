import { useState } from 'react'
import Filters        from '../components/Filters'
import TransactionItem from '../components/TransactionItem'
import AddEditModal   from '../components/AddEditModal'
import DeleteConfirm  from '../components/DeleteConfirm'
import Toast          from '../components/Toast'
import Icon           from '../components/Icon'
import { useTransactions } from '../hooks/useTransactions'
import { useToast }        from '../hooks/useToast'
import styles from './Transactions.module.css'

export default function Transactions() {
  const {
    transactions,
    totalIncome, totalExpense, balance,
    addTransaction, updateTransaction, deleteTransaction,
    getFiltered,
  } = useTransactions()

  const { toast, showToast } = useToast()

  const [search,         setSearch]         = useState('')
  const [filterType,     setFilterType]     = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy,         setSortBy]         = useState('date_desc')
  const [showModal,      setShowModal]      = useState(false)
  const [editItem,       setEditItem]       = useState(null)
  const [deleteTarget,   setDeleteTarget]   = useState(null)

  const filtered = getFiltered({ search, filterType, filterCategory, sortBy })

  const handleOpenEdit  = (tx) => { setEditItem(tx); setShowModal(true) }
  const handleOpenAdd   = ()   => { setEditItem(null); setShowModal(true) }
  const handleCloseModal = ()  => { setShowModal(false); setEditItem(null) }

  const handleSubmit = (data) => {
    if (editItem) {
      updateTransaction(editItem.id, data)
      showToast('Transaction updated!')
    } else {
      addTransaction(data)
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
      {/* Heading */}
      <div className={`${styles.heading} animate-fade-up`}>
        <div>
          <h1 className={styles.pageTitle}>Transactions</h1>
          <p className={styles.pageSubtitle}>{filtered.length} of {transactions.length} records</p>
        </div>
        <button className={styles.addBtn} onClick={handleOpenAdd}>
          <Icon name="plus" size={15} />
          Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div className={`${styles.filterPanel} animate-fade-up delay-1`}>
        <Filters
          search={search}            onSearch={setSearch}
          filterType={filterType}    onFilterType={setFilterType}
          filterCategory={filterCategory} onFilterCategory={setFilterCategory}
          sortBy={sortBy}            onSortBy={setSortBy}
        />
      </div>

      {/* List */}
      <div className={`animate-fade-up delay-2 ${styles.listWrap}`}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🔍</div>
            <p className={styles.emptyTitle}>No transactions found</p>
            <p className={styles.emptyDesc}>Try changing your filters or add a new transaction</p>
            <button className={styles.addBtn} onClick={handleOpenAdd} style={{ marginTop: 16 }}>
              <Icon name="plus" size={14} /> Add Transaction
            </button>
          </div>
        ) : (
          <ul className={styles.list} role="list">
            {filtered.map((tx, i) => (
              <li key={tx.id}>
                <TransactionItem
                  transaction={tx}
                  onEdit={handleOpenEdit}
                  onDelete={setDeleteTarget}
                  style={{ animationDelay: `${i * 30}ms` }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* FAB */}
      <button className={styles.fab} onClick={handleOpenAdd} aria-label="Add transaction">
        <Icon name="plus" size={22} />
      </button>

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
