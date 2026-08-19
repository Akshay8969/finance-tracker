import Icon from './Icon'
import { CATEGORIES, SORT_OPTIONS } from '../constants'
import styles from './Filters.module.css'

export default function Filters({ search, onSearch, filterType, onFilterType, filterCategory, onFilterCategory, sortBy, onSortBy }) {
  return (
    <div className={styles.wrap}>
      {/* Search */}
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon} aria-hidden="true">
          <Icon name="search" size={15} />
        </span>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search transactions…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          aria-label="Search transactions"
        />
      </div>

      {/* Type filter */}
      <select
        className={styles.select}
        value={filterType}
        onChange={e => onFilterType(e.target.value)}
        aria-label="Filter by type"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category filter */}
      <select
        className={styles.select}
        value={filterCategory}
        onChange={e => onFilterCategory(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        className={styles.select}
        value={sortBy}
        onChange={e => onSortBy(e.target.value)}
        aria-label="Sort transactions"
      >
        {SORT_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
