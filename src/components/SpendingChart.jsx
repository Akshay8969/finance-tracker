import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_EMOJI } from '../constants'
import Icon from './Icon'
import styles from './SpendingChart.module.css'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className={styles.tooltip}>
      <span>{CATEGORY_EMOJI[name]} {name}</span>
      <strong>₹{value.toLocaleString('en-IN')}</strong>
    </div>
  )
}

export default function SpendingChart({ transactions, totalExpense }) {
  const data = CATEGORIES
    .map(cat => ({
      name:  cat,
      value: transactions
        .filter(t => t.type === 'expense' && t.category === cat)
        .reduce((s, t) => s + t.amount, 0),
    }))
    .filter(d => d.value > 0)

  if (data.length === 0) {
    return (
      <section className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Spending Breakdown</h2>
          <Icon name="chart" size={15} />
        </div>
        <p className={styles.noData}>No expense data yet</p>
      </section>
    )
  }

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Spending Breakdown</h2>
        <Icon name="chart" size={15} />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map(entry => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name] ?? '#94A3B8'}
                stroke="var(--surface)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <ul className={styles.legend}>
        {data.slice(0, 5).map(({ name, value }) => (
          <li key={name} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: CATEGORY_COLORS[name] }}
            />
            <span className={styles.legendLabel}>
              {CATEGORY_EMOJI[name]} {name}
            </span>
            <span className={styles.legendPct}>
              {totalExpense > 0 ? ((value / totalExpense) * 100).toFixed(0) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
