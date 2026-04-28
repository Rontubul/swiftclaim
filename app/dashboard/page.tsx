'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const STATUS_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  draft:              { label: 'Draft',             color: 'rgba(255,255,255,0.3)',  icon: '✏️' },
  review:             { label: 'In Review',         color: '#60a5fa',                icon: '🔍' },
  submitted:          { label: 'Submitted',         color: '#a78bfa',                icon: '📤' },
  filed:              { label: 'Filed',             color: '#f0c040',                icon: '⚖️' },
  served:             { label: 'Served',            color: '#fb923c',                icon: '📬' },
  hearing_scheduled:  { label: 'Hearing Scheduled', color: '#f0c040',                icon: '📅' },
  resolved:           { label: 'Resolved',          color: '#4ade80',                icon: '✅' },
  dismissed:          { label: 'Dismissed',         color: '#f87171',                icon: '❌' },
}

const CLAIM_LABELS: Record<string, string> = {
  landlord_tenant: 'Landlord / Tenant',
  consumer: 'Consumer / Product',
  contract: 'Breach of Contract',
  property_damage: 'Property Damage',
  unpaid_wages: 'Unpaid Wages',
  other: 'Other',
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [claims, setClaims] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/auth'; return }
      setUser(session.user)

      const { data } = await supabase
        .from('claims')
        .select('*, defendants(*)')
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false })

      setClaims(data || [])
      setLoading(false)
    }
    init()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0e1a' }}>
      <div className="text-white/30 text-sm">Loading...</div>
    </div>
  )

  const activeClaims = claims.filter(c => !['resolved', 'dismissed'].includes(c.status))
  const resolvedClaims = claims.filter(c => ['resolved', 'dismissed'].includes(c.status))
  const totalOwed = claims.reduce((sum, c) => sum + (parseFloat(c.claim_amount) || 0), 0)
  const totalWon = claims.filter(c => c.outcome === 'won').reduce((sum, c) => sum + (parseFloat(c.outcome_amount) || 0), 0)

  return (
    <main className="min-h-screen" style={{ background: '#0a0e1a' }}>
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" className="font-display text-xl font-bold">
          Swift<span style={{ color: '#f0c040' }}>Claim</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/40">{user?.email}</span>
          <button onClick={signOut} className="text-sm text-white/40 hover:text-white transition-colors">Sign out</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">My Claims</h1>
            <p className="text-white/40 text-sm">Track and manage your active cases</p>
          </div>
          <Link href="/start"
            className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
            + New Claim
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Active Cases', value: activeClaims.length, suffix: '' },
            { label: 'Total Claimed', value: `$${totalOwed.toLocaleString()}`, suffix: '' },
            { label: 'Total Won', value: `$${totalWon.toLocaleString()}`, suffix: '' },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-white/40 text-xs mb-2">{stat.label}</div>
              <div className="font-display text-3xl font-bold" style={{ color: i === 2 ? '#4ade80' : 'white' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Claims list */}
        {claims.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚖️</div>
            <h2 className="font-display text-2xl font-bold mb-2">No claims yet</h2>
            <p className="text-white/40 mb-6 text-sm">Start a claim and we'll file it with the court on your behalf.</p>
            <Link href="/start" className="inline-block px-8 py-3 rounded-full text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
              File Your First Claim
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {claims.map(claim => {
              const status = STATUS_LABELS[claim.status] || STATUS_LABELS.draft
              const defendant = claim.defendants?.[0]
              return (
                <div key={claim.id} className="rounded-2xl p-5 flex items-center justify-between transition-all hover:scale-[1.005]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{status.icon}</div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5">
                        {defendant?.full_name || defendant?.business_name || 'Unknown Defendant'}
                      </div>
                      <div className="text-xs text-white/40">
                        {CLAIM_LABELS[claim.claim_type] || 'Claim'} · {claim.state} · {new Date(claim.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-semibold text-sm">${parseFloat(claim.claim_amount || 0).toLocaleString()}</div>
                      <div className="text-xs" style={{ color: status.color }}>{status.label}</div>
                    </div>
                    {claim.status === 'draft' && (
                      <Link href="/start" className="px-4 py-2 rounded-lg text-xs font-semibold"
                        style={{ background: 'rgba(240,192,64,0.1)', border: '1px solid rgba(240,192,64,0.25)', color: '#f0c040' }}>
                        Continue →
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
