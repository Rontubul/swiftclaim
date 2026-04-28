'use client'
import { useState } from 'react'
import { ClaimData } from '@/app/start/page'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const CLAIM_LABELS: Record<string, string> = {
  landlord_tenant: 'Landlord / Tenant',
  consumer: 'Consumer / Product',
  contract: 'Breach of Contract',
  property_damage: 'Property Damage',
  unpaid_wages: 'Unpaid Wages',
  other: 'Other',
}

const FEES: Record<string, number> = { CA: 30, TX: 54, FL: 55 }

type Props = { data: ClaimData; back: () => void }

export default function Step6_Review({ data, back }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const courtFee = FEES[data.state] || 50
  const swiftFee = 49
  const total = courtFee + swiftFee

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession()

      let userId = session?.user?.id

      // If not logged in, redirect to auth first
      if (!userId) {
        sessionStorage.setItem('pendingClaim', JSON.stringify(data))
        window.location.href = '/auth?next=start'
        return
      }

      // Save claim to Supabase
      const { data: claim, error: claimError } = await supabase
        .from('claims')
        .insert({
          user_id: userId,
          status: 'review',
          state: data.state,
          county: data.county,
          claim_type: data.claimType,
          claim_amount: parseFloat(data.claimAmount),
          incident_date: data.incidentDate,
          claim_description: data.claimDescription,
          current_step: 6,
          total_steps: 6,
        })
        .select()
        .single()

      if (claimError) throw claimError

      // Save defendant
      await supabase.from('defendants').insert({
        claim_id: claim.id,
        defendant_type: data.defendantType,
        full_name: data.defendantType === 'individual' ? data.defendantName : null,
        business_name: data.defendantType === 'business' ? data.defendantName : null,
        address_line1: data.defendantAddress,
        city: data.defendantCity,
        state: data.state,
        zip: data.defendantZip,
        email: data.defendantEmail,
        phone: data.defendantPhone,
      })

      // Log filing event
      await supabase.from('filing_events').insert({
        claim_id: claim.id,
        event_type: 'claim_created',
        event_description: 'Claim submitted for review and payment.',
      })

      // Create Stripe checkout session
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId: claim.id, state: data.state }),
      })

      const { url, error: stripeError } = await res.json()
      if (stripeError) throw new Error(stripeError)

      window.location.href = url
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Review your claim</h1>
      <p className="text-white/50 mb-8 text-sm">Double-check everything below before we file.</p>

      <div className="space-y-3 mb-6">
        <ReviewRow label="State" value={`${data.state} — ${data.county} County`} />
        <ReviewRow label="Claim type" value={CLAIM_LABELS[data.claimType] || data.claimType} />
        <ReviewRow label="Amount" value={`$${parseFloat(data.claimAmount || '0').toLocaleString()}`} highlight />
        <ReviewRow label="Incident date" value={data.incidentDate} />
        <ReviewRow label="Defendant" value={`${data.defendantName} — ${data.defendantCity}, ${data.state}`} />
        <ReviewRow label="Evidence files" value={data.files.length > 0 ? `${data.files.length} file(s) attached` : 'None attached'} />
      </div>

      <div className="rounded-2xl p-4 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Your claim narrative</div>
        <p className="text-sm text-white/70 leading-relaxed">{data.claimDescription}</p>
      </div>

      <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(240,192,64,0.05)', border: '1px solid rgba(240,192,64,0.15)' }}>
        <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Filing fees</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-white/60">SwiftClaim service fee</span><span>${swiftFee}</span></div>
          <div className="flex justify-between"><span className="text-white/60">Court filing fee ({data.state})</span><span>${courtFee}</span></div>
          <div className="border-t border-white/10 my-2" />
          <div className="flex justify-between font-semibold"><span>Total today</span><span style={{ color: '#f0c040' }}>${total}</span></div>
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mb-4 px-1">{error}</p>}

      <div className="flex gap-3">
        <button onClick={back} className="px-6 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          ← Edit
        </button>
        <button onClick={handleSubmit} disabled={loading}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
          {loading ? 'Saving...' : `Pay $${total} & File My Claim →`}
        </button>
      </div>

      <p className="text-xs text-white/25 text-center mt-4">
        Secure payment via Stripe. By filing, you confirm all information is accurate.
        SwiftClaim is not your lawyer and no attorney-client relationship is formed.
      </p>
    </div>
  )
}

function ReviewRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-start px-4 py-3 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-medium text-right max-w-xs" style={{ color: highlight ? '#f0c040' : 'white' }}>{value}</span>
    </div>
  )
}
