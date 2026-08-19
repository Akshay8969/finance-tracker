import Icon from './Icon'
import { formatCurrency, formatDate } from '../utils/helpers'
import { CATEGORY_COLORS, CATEGORY_EMOJI } from '../constants'
import styles from './TransactionItem.module.css'

export default function TransactionItem({ transaction, onEdit, onDelete, style }) {
  const { title, amount, type, category, date } = transaction
  const color = CATEGORY_COLORS[category] ?? '#94A3B8'
  const emoji = CATEGORY_EMOJI[category] ?? '📦'

  return (
    <div className={styles.item} style={style}>
      {/* Category icon bubble */}
      <div
        className={styles.iconBubble}
        style={{ background: `${color}22` }}
        aria-hidden="true"
      >
        <span>{emoji}</span>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <div className={styles.meta}>
          <span
            className={styles.tag}
            style={{ background: `${color}22`, color }}
          >
            {category}
          </span>
          <span className={styles.date}>{formatDate(date)}</span>
        </div>
      </div>

      {/* Amount */}
      <p
        className={styles.amount}
        style={{ color: type === 'income' ? 'var(--income)' : 'var(--expense)' }}
      >
        {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
      </p>

      {/* Actions – reveal on hover */}
      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${styles.edit}`}
          onClick={() => onEdit(transaction)}
          aria-label={`Edit ${title}`}
          title="Edit"
        >
          <Icon name="edit" size={13} />
        </button>
        <button
          className={`${styles.actionBtn} ${styles.delete}`}
          onClick={() => onDelete(transaction.id)}
          aria-label={`Delete ${title}`}
          title="Delete"
        >
          <Icon name="trash" size={13} />
        </button>
      </div>
    </div>
  )
}
