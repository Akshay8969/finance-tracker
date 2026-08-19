import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/Icon'
import styles from './AuthPage.module.css'

const FEATURES = [
  { icon: '📊', text: 'Visual spending breakdowns' },
  { icon: '🔒', text: 'Secure Firebase storage' },
  { icon: '⚡', text: 'Real-time sync across devices' },
  { icon: '🌙', text: 'Dark & light mode' },
]

export default function AuthPage() {
  const { login, signup } = useAuth()

  const [mode, setMode]         = useState('login')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    if (mode === 'signup' && !name.trim()) { setError('Please enter your name'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }

    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await signup(email, password, name)
      }
    } catch (err) {
      const msgs = {
        'auth/user-not-found':       'No account found with this email.',
        'auth/wrong-password':       'Incorrect password.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email':        'Please enter a valid email address.',
        'auth/too-many-requests':    'Too many attempts. Try again later.',
        'auth/invalid-credential':   'Invalid email or password.',
      }
      setError(msgs[err.code] || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (m) => { setMode(m); setError(''); setName(''); setEmail(''); setPassword('') }
  const onKey = (e) => { if (e.key === 'Enter') handleSubmit() }

  return (
    <div className={styles.page}>

      {/* ── Left panel ── */}
      <div className={styles.left}>
        {/* Animated grid background */}
        <div className={styles.grid} aria-hidden="true" />

        {/* Central content */}
        <div className={styles.leftContent}>
          <div className={styles.brandMark}>
            <div className={styles.brandIcon}><Icon name="wallet" size={28} /></div>
            <span className={styles.brandName}>FinTrack</span>
          </div>
          <h1 className={styles.headline}>
            Your money,<br />
            <span className={styles.headlineAccent}>fully in control.</span>
          </h1>
          <p className={styles.tagline}>
            Track income, analyse spending, and hit your financial goals — all in one beautiful dashboard.
          </p>
          <ul className={styles.featureList}>
            {FEATURES.map(f => (
              <li key={f.text} className={styles.featureItem}>
                <span className={styles.featureDot} />
                <span>{f.icon} {f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className={styles.right}>
        <div className={styles.card}>

          {/* Mode tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => switchMode('login')}
            >
              Sign In
            </button>
            <button
              className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
              onClick={() => switchMode('signup')}
            >
              Sign Up
            </button>
            <div className={`${styles.tabSlider} ${mode === 'signup' ? styles.tabSliderRight : ''}`} />
          </div>

          <h2 className={styles.cardTitle}>
            {mode === 'login' ? 'Welcome back 👋' : 'Join FinTrack 🚀'}
          </h2>
          <p className={styles.cardSub}>
            {mode === 'login'
              ? 'Enter your credentials to access your dashboard'
              : 'Create your free account in seconds'}
          </p>

          {/* Error */}
          {error && (
            <div className={styles.errorBox}>
              <Icon name="alertTriangle" size={13} />
              {error}
            </div>
          )}

          {/* Name — signup only */}
          {mode === 'signup' && (
            <div className={`${styles.field} ${styles.slideIn}`}>
              <label className={styles.label} htmlFor="name">Full Name</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><Icon name="user" size={15} /></span>
                <input
                  id="name"
                  className={styles.input}
                  type="text"
                  placeholder="Akshay Singh"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={onKey}
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><Icon name="search" size={15} /></span>
              <input
                id="email"
                className={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={onKey}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="password">Password</label>
            </div>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><Icon name="wallet" size={15} /></span>
              <input
                id="password"
                className={styles.input}
                type={showPass ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={onKey}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                className={styles.eyeBtn}
                type="button"
                onClick={() => setShowPass(s => !s)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                {mode === 'login' ? 'Sign In to Dashboard' : 'Create My Account'}
                <span className={styles.btnArrow}>→</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className={styles.divider}><span>or</span></div>

          {/* Toggle */}
          <p className={styles.switchText}>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button className={styles.switchBtn} onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}