import styles from './DeleteConfirm.module.css'

export default function DeleteConfirm({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div
      className={styles.overlay}
      role="alertdialog"
      aria-modal="true"
      aria-label="Confirm deletion"
      onClick={e => e.target === e.currentTarget && onCancel()}
    >
      <div className={styles.modal}>
        <div className={styles.icon} aria-hidden="true">🗑️</div>
        <h2 className={styles.title}>Delete Transaction?</h2>
        <p className={styles.desc}>
          This action cannot be undone. The record will be permanently removed.
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
