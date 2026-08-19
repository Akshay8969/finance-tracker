import { NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth }  from '../context/AuthContext'
import Icon from './Icon'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout }       = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    setDropdownOpen(false)
    await logout()
  }

  // Derive display name from email
  const email      = user?.email || ''
  const displayName = user?.displayName || ''
  const initial    = displayName ? displayName[0].toUpperCase() : email ? email[0].toUpperCase() : 'U'
  const username   = displayName || (email ? email.split('@')[0] : 'User')
  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : null

  return (
    <header className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Icon name="wallet" size={16} />
        </div>
        <span className={styles.logoText}>
          {'FinTrack'.split('').map((char, i) => (
            <span key={i} className={styles.logoLetter} style={{ animationDelay: `${i * 0.06}s` }}>
              {char}
            </span>
          ))}
        </span>
      </div>

      {/* Nav links */}
      <nav className={styles.navLinks} aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <Icon name="home" size={15} /> Dashboard
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <Icon name="list" size={15} /> Transactions
        </NavLink>
      </nav>

      {/* Right controls */}
      <div className={styles.navRight}>
        {/* Theme toggle */}
        <button
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title="Toggle theme"
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
        </button>

        {/* Avatar + dropdown */}
        <div className={styles.profileWrap} ref={dropdownRef}>
          <button
            className={`${styles.avatar} ${dropdownOpen ? styles.avatarActive : ''}`}
            onClick={() => setDropdownOpen(o => !o)}
            aria-label="Open profile menu"
            aria-expanded={dropdownOpen}
          >
            {initial}
          </button>

          {dropdownOpen && (
            <div className={styles.dropdown} role="menu">
              {/* User info header */}
              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownAvatar}>{initial}</div>
                <div className={styles.dropdownInfo}>
                  <p className={styles.dropdownName}>{username}</p>
                  <p className={styles.dropdownEmail}>{email}</p>
                  {joinedDate && (
                    <p className={styles.dropdownJoined}>Joined {joinedDate}</p>
                  )}
                </div>
              </div>

              <div className={styles.dropdownDivider} />

              {/* Menu items */}
              <NavLink
                to="/"
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
                role="menuitem"
              >
                <Icon name="home" size={15} />
                Dashboard
              </NavLink>

              <NavLink
                to="/transactions"
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
                role="menuitem"
              >
                <Icon name="list" size={15} />
                Transactions
              </NavLink>

              <div className={styles.dropdownDivider} />

              {/* Theme toggle inside dropdown */}
              <button
                className={styles.dropdownItem}
                onClick={() => { toggleTheme(); setDropdownOpen(false) }}
                role="menuitem"
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>

              <div className={styles.dropdownDivider} />

              {/* Sign out */}
              <button
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                onClick={handleLogout}
                role="menuitem"
              >
                <Icon name="logout" size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}