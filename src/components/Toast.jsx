import Icon from './Icon'
import styles from './Toast.module.css'

export default function Toast({ toast }) {
  if (!toast) return null

  return (
    <div
      key={toast.id}
      className={`${styles.toast} ${styles[toast.type]}`}
      role="status"
      aria-live="polite"
    >
      <Icon name={toast.type === 'success' ? 'check' : 'close'} size={14} />
      <span>{toast.message}</span>
    </div>
  )
}
