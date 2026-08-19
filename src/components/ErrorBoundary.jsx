import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh', gap: '1rem',
          fontFamily: 'inherit', color: 'var(--text-primary, #fff)',
          background: 'var(--bg-primary, #0f172a)',
        }}>
          <div style={{ fontSize: '3rem' }}>⚠️</div>
          <h2 style={{ margin: 0 }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-secondary, #94a3b8)', margin: 0 }}>
            {this.state.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '0.5rem', padding: '0.6rem 1.4rem',
              borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: 'var(--accent, #6366f1)', color: '#fff',
              fontWeight: 600, fontSize: '0.9rem',
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
