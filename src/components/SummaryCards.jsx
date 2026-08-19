import Icon from './Icon'
import { formatCurrency } from '../utils/helpers'
import styles from './SummaryCards.module.css'

function SummaryCard({ variant, label, amount, icon, badge, badgeVariant, index }) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} animate-fade-up delay-${index}`}
    >
      <div className={styles.cardIcon}>
        <Icon name={icon} size={48} />
      </div>
      <p className={styles.label}>{label}</p>
      <p className={`${styles.amount} ${styles[`amount_${variant}`]}`}>
        {formatCurrency(amount)}
      </p>
      <span className={`${styles.badge} ${styles[`badge_${badgeVariant}`]}`}>
        {badge}
      </span>
    </div>
  )
}

export default function SummaryCards({ totalIncome, totalExpense, balance, incomeCount, expenseCount }) {
  const cards = [
    {
      variant:      'balance',
      label:        'Net Balance',
      amount:       balance,
      icon:         'wallet',
      badge:        balance >= 0 ? '▲ Positive' : '▼ Negative',
      badgeVariant: balance >= 0 ? 'up' : 'down',
    },
    {
      variant:      'income',
      label:        'Total Income',
      amount:       totalIncome,
      icon:         'arrowUp',
      badge:        `▲ ${incomeCount} source${incomeCount !== 1 ? 's' : ''}`,
      badgeVariant: 'up',
    },
    {
      variant:      'expense',
      label:        'Total Expenses',
      amount:       totalExpense,
      icon:         'arrowDown',
      badge:        `${expenseCount} transaction${expenseCount !== 1 ? 's' : ''}`,
      badgeVariant: 'down',
    },
  ]

  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <SummaryCard key={card.variant} {...card} index={i + 1} />
      ))}
    </div>
  )
}
