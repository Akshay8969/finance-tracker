import TransactionItem from './TransactionItem'
import Icon from './Icon'
import styles from './TransactionList.module.css'

export default function TransactionList({ transactions, onEdit, onDelete, onAdd }) {
  return (
    <section className={styles.panel} aria-label="Transactions">
      <div className={styles.header}>
        <h2 className={styles.title}>Transactions</h2>
        <button
          className={styles.addBtn}
          onClick={onAdd}
          aria-label="Add transaction"
          title="Add transaction"
        >
          <Icon name="plus" size={15} />
          Add
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <p className={styles.emptyTitle}>No transactions found</p>
          <p className={styles.emptyDesc}>Try adjusting your filters or add a new transaction</p>
        </div>
      ) : (
        <ul className={styles.list} role="list">
          {transactions.map((tx, i) => (
            <li key={tx.id} role="listitem">
              <TransactionItem
                transaction={tx}
                onEdit={onEdit}
                onDelete={onDelete}
                style={{ animationDelay: `${i * 35}ms` }}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
