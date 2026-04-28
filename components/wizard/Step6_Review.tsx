'use client'
import { useState } from 'react'
import { ClaimData } from '@/app/start/page'

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
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const courtFee = FEES[data.state] || 50
  const swiftFee = 49
  const total = courtFee + swiftFee

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display text-3xl font-bold mb-3">Claim submitted!</h2>
        <p className="text-white/50 mb-6 max-w-sm mx-auto text-sm">
          We're preparing your filing. You'll receive a confirmation email within 24 hours with your case number and next steps.
        </p>
        <a href="/" className="inline-block px-8 py-3 rounded-full text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
          Back to Home
        </a>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Review your claim</h1>
      <p className="text-white/50 mb-8 text-sm">Double-check everything below before we file.</p>

      {/* Summary cards */}
      <div className="space-y-3 mb-6">
        <ReviewRow label="State" value={`${data.state} — ${data.county} County`} />
        <ReviewRow label="Claim type" value={CLAIM_LABELS[data.claimType] || data.claimType} />
        <ReviewRow label="Amount" value={`$${parseFloat(data.claimAmount || '0').toLocaleString()}`} highlight />
        <ReviewRow label="Incident date" value={data.incidentDate} />
        <ReviewRow label="Defendant" value={`${data.defendantName} — ${data.defendantCity}, ${data.state}`} />
        <ReviewRow label="Evidence files" value={data.files.length > 0 ? `${data.files.length} file(s) attached` : 'None attached'} />
      </div>

      {/* Story preview */}
      <div className="rounded-2xl p-4 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Your claim narrative</div>
        <p className="text-sm text-white/70 leading-relaxed">{data.claimDescription}</p>
      </div>

      {/* Fees */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(240,192,64,0.05)', border: '1px solid rgba(240,192,64,0.15)' }}>
        <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Filing fees</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-white/60">SwiftClaim service fee</span><span>${swiftFee}</span></div>
          <div className="flex justify-between"><span className="text-white/60">Court filing fee ({data.state})</span><span>${courtFee}</span></div>
          <div className="border-t border-white/10 my-2" />
          <div className="flex justify-between font-semibold"><span>Total today</span><span style={{ color: '#f0c040' }}>${total}</span></div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={back} className="px-6 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          ← Edit
        </button>
        <button onClick={handleSubmit} disabled={loading}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
          {loading ? 'Processing...' : `Pay $${total} & File My Claim →`}
        </button>
      </div>

      <p className="text-xs text-white/25 text-center mt-4">
        By filing, you confirm all information is accurate. SwiftClaim is not your lawyer and no attorney-client relationship is formed.
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
