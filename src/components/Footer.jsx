import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Left — Brand */}
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <Icon name="wallet" size={14} />
          </div>
          <span className={styles.logoText}>FinTrack</span>
          <span className={styles.tagline}>Your personal finance companion</span>
        </div>

        {/* Center — Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          <NavLink to="/" end className={styles.link}>
            Dashboard
          </NavLink>
          <NavLink to="/transactions" className={styles.link}>
            Transactions
          </NavLink>
        </nav>

        {/* Right — Info */}
        <div className={styles.right}>
          <div className={styles.badges}>
            <span className={styles.badge}>
              <span className={styles.dot} />
              Firebase
            </span>
            <span className={styles.badge}>
              <span className={styles.dot} style={{ background: '#6366F1' }} />
              React
            </span>
            <span className={styles.badge}>
              <span className={styles.dot} style={{ background: '#F59E0B' }} />
              Vite
            </span>
          </div>
          <p className={styles.copy}>© {year} FinTrack. All rights reserved.</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <p className={styles.bottomText}>
          Built with React · Firebase · Recharts · CSS Modules
        </p>
      </div>
    </footer>
  )
}