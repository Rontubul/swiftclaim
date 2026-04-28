'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0a0e1a' }}>
      <div className="w-full max-w-sm">
        <a href="/" className="block font-display text-2xl font-bold text-center mb-10">
          Swift<span style={{ color: '#f0c040' }}>Claim</span>
        </a>

        {/* Toggle */}
        <div className="flex rounded-xl p-1 mb-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['signin', 'signup'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize"
              style={{
                background: mode === m ? 'rgba(240,192,64,0.12)' : 'transparent',
                color: mode === m ? '#f0c040' : 'rgba(255,255,255,0.4)',
                border: mode === m ? '1px solid rgba(240,192,64,0.3)' : '1px solid transparent',
              }}>
              {m === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Full name</label>
              <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
          )}
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Email</label>
            <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>

          {error && <p className="text-sm text-red-400 px-1">{error}</p>}
          {message && <p className="text-sm px-1" style={{ color: '#4ade80' }}>{message}</p>}

          <button onClick={handleSubmit} disabled={loading || !email || !password}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all mt-2"
            style={{
              background: (!email || !password) ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #f0c040, #e6ac20)',
              color: (!email || !password) ? 'rgba(255,255,255,0.2)' : '#0a0e1a',
              cursor: (!email || !password) ? 'not-allowed' : 'pointer'
            }}>
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
          </button>
        </div>

        <p className="text-center text-xs text-white/25 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  )
}
