import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/** Normalize the server user shape to what the rest of the app expects */
function normalizeUser(u) {
  return {
    ...u,
    displayName: u.name,
    // Mirror Firebase's metadata.creationTime so Navbar's joinedDate still works
    metadata: { creationTime: u.createdAt },
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // ── Restore session on mount ──────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('ft_token')
    if (!token) { setLoading(false); return }

    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((u) => setUser(normalizeUser(u)))
      .catch(() => localStorage.removeItem('ft_token'))
      .finally(() => setLoading(false))
  }, [])

  // ── Auth actions ──────────────────────────────────────────
  const signup = async (email, password, name) => {
    const r = await fetch(`${API}/api/auth/signup`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, password }),
    })
    const data = await r.json()
    if (!r.ok) throw new Error(data.message)
    localStorage.setItem('ft_token', data.token)
    setUser(normalizeUser(data.user))
  }

  const login = async (email, password) => {
    const r = await fetch(`${API}/api/auth/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    })
    const data = await r.json()
    if (!r.ok) throw new Error(data.message)
    localStorage.setItem('ft_token', data.token)
    setUser(normalizeUser(data.user))
  }

  const logout = () => {
    localStorage.removeItem('ft_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {loading ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', background: 'var(--bg-primary, #0f172a)',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '4px solid var(--border, #1e293b)',
            borderTopColor: 'var(--accent, #6366f1)',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}