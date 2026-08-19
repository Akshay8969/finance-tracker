import { calcSavingsRate } from '../utils/helpers'
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_EMOJI } from '../constants'
import styles from './QuickStats.module.css'

function ProgressBar({ value, color }) {
  return (
    <div className={styles.progTrack}>
      <div
        className={styles.progFill}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%`, background: color }}
      />
    </div>
  )
}

export default function QuickStats({ transactions, totalIncome, totalExpense, balance }) {
  const savingsRate = calcSavingsRate(totalIncome, balance)

  const topCategories = CATEGORIES
    .map(cat => ({
      cat,
      value: transactions
        .filter(t => t.type === 'expense' && t.category === cat)
        .reduce((s, t) => s + t.amount, 0),
    }))
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)

  const avgTx = transactions.length > 0
    ? (transactions.reduce((s, t) => s + t.amount, 0) / transactions.length)
    : 0

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>Quick Stats</h2>

      {/* Savings rate */}
      <div className={styles.statRow}>
        <span className={styles.label}>Savings Rate</span>
        <span className={styles.value} style={{ color: 'var(--accent)' }}>
          {savingsRate.toFixed(1)}%
        </span>
      </div>
      <ProgressBar
        value={savingsRate}
        color="linear-gradient(90deg, #10B981, #6366F1)"
      />

      {/* Top categories */}
      <p className={styles.sectionLabel}>Top Expenses</p>
      {topCategories.map(({ cat, value }) => (
        <div key={cat}>
          <div className={styles.statRow}>
            <span className={styles.label}>{CATEGORY_EMOJI[cat]} {cat}</span>
            <span className={styles.valueMono}>₹{value.toLocaleString('en-IN')}</span>
          </div>
          <ProgressBar
            value={totalExpense > 0 ? (value / totalExpense) * 100 : 0}
            color={CATEGORY_COLORS[cat]}
          />
        </div>
      ))}

      <div className={styles.divider} />

      {/* Summary stats */}
      <div className={styles.statRow}>
        <span className={styles.label}>Avg Transaction</span>
        <span className={styles.valueMono}>₹{avgTx.toFixed(0)}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>Total Entries</span>
        <span className={styles.valueMono}>{transactions.length}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.label}>Income Sources</span>
        <span className={styles.valueMono}>
          {transactions.filter(t => t.type === 'income').length}
        </span>
      </div>
    </section>
  )
}
