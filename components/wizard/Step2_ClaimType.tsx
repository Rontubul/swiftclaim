'use client'
import { ClaimData } from '@/app/start/page'
import WizardShell from './WizardShell'

const TYPES = [
  { id: 'landlord_tenant', icon: '🏠', label: 'Landlord / Tenant', desc: 'Security deposit, repairs, eviction, lease disputes' },
  { id: 'consumer', icon: '🛍️', label: 'Consumer / Product', desc: 'Defective products, false advertising, refunds' },
  { id: 'contract', icon: '📝', label: 'Breach of Contract', desc: 'Unpaid services, broken agreements, business disputes' },
  { id: 'property_damage', icon: '🚗', label: 'Property Damage', desc: 'Vehicle accidents, damaged property, negligence' },
  { id: 'unpaid_wages', icon: '💰', label: 'Unpaid Wages', desc: 'Withheld pay, overtime, wrongful deductions' },
  { id: 'other', icon: '⚖️', label: 'Other', desc: 'Loans, personal disputes, any money owed to you' },
]

type Props = { data: ClaimData; update: (f: Partial<ClaimData>) => void; next: () => void; back: () => void }

export default function Step2_ClaimType({ data, update, next, back }: Props) {
  return (
    <WizardShell
      title="What's your claim about?"
      subtitle="Choose the category that best fits your situation. This helps us prepare the right forms."
      onNext={next}
      onBack={back}
      nextDisabled={!data.claimType}
    >
      <div className="grid grid-cols-2 gap-3">
        {TYPES.map(t => (
          <button key={t.id} onClick={() => update({ claimType: t.id })}
            className="p-4 rounded-2xl text-left transition-all"
            style={{
              background: data.claimType === t.id ? 'rgba(240,192,64,0.1)' : 'rgba(255,255,255,0.03)',
              border: data.claimType === t.id ? '1px solid #f0c040' : '1px solid rgba(255,255,255,0.08)',
            }}>
            <div className="text-xl mb-2">{t.icon}</div>
            <div className="font-semibold text-sm mb-1">{t.label}</div>
            <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.desc}</div>
          </button>
        ))}
      </div>
    </WizardShell>
  )
}
