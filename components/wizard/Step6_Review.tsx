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
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const courtFee = FEES[data.state] || 50
  const swiftFee = 49
  const total = courtFee + swiftFee

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user?.id) {
        sessionStorage.setItem('pendingClaim', JSON.stringify(data))
        window.location.href = '/auth?next=start'
        return
      }

      const { data: claim, error: claimError } = await supabase
        .from('claims')
        .insert({
          user_id: session.user.id,
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

      await supabase.from('defendants').insert({
        claim_id: claim.id,
        defendant_type: data.defendantType,
        full_name: data.defendantType === 'individual' ? data.defendantName : null,
        business_name: data.defendantType === 'business' ? data.defendantName : null,
        address_line1: data.defendantAddress,
        city: data.defendantCity,
        state: data.state,
        zip: data.defendantZip,
        email: data.defendantEmail || null,
        phone: data.defendantPhone || null,
      })

      await supabase.from('filing_events').insert({
        claim_id: claim.id,
        event_type: 'claim_created',
        event_description: 'Claim submitted for review.',
      })

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="font-display text-3xl font-bold mb-3">Claim received!</h2>
        <p className="text-white/50 mb-3 max-w-sm mx-auto text-sm leading-relaxed">
          Your claim has been saved. We'll review it and reach out within 24 hours with next steps including payment and filing.
        </p>
        <div className="rounded-2xl p-4 mb-8 max-w-sm mx-auto text-left"
          style={{ background: 'rgba(240,192,64,0.06)', border: '1px solid rgba(240,192,64,0.15)' }}>
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2">What happens next</div>
          <div className="space-y-2 text-sm text-white/60">
            <div className="flex gap-2"><span style={{ color: '#f0c040' }}>1.</span><span>Our team reviews your claim details</span></div>
            <div className="flex gap-2"><span style={{ color: '#f0c040' }}>2.</span><span>You'll receive a payment link via email</span></div>
            <div className="flex gap-2"><span style={{ color: '#f0c040' }}>3.</span><span>We file with the court on your behalf</span></div>
            <div className="flex gap-2"><span style={{ color: '#f0c040' }}>4.</span><span>We serve the defendant and prep you for court</span></div>
          </div>
        </div>
        <a href="/dashboard" className="inline-block px-8 py-3 rounded-full text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
          View My Dashboard →
        </a>
      </div>
    )
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
        <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Estimated filing fees</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-white/60">SwiftClaim service fee</span><span>${swiftFee}</span></div>
          <div className="flex justify-between"><span className="text-white/60">Court filing fee ({data.state})</span><span>${courtFee}</span></div>
          <div className="border-t border-white/10 my-2" />
          <div className="flex justify-between font-semibold"><span>Estimated total</span><span style={{ color: '#f0c040' }}>${total}</span></div>
        </div>
        <p className="text-xs text-white/30 mt-3">Payment will be collected after our team reviews your claim.</p>
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
          {loading ? 'Saving your claim...' : 'Submit Claim →'}
        </button>
      </div>

      <p className="text-xs text-white/25 text-center mt-4">
        By submitting, you confirm all information is accurate. SwiftClaim is not your lawyer and no attorney-client relationship is formed.
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
