'use client'
import { ClaimData } from '@/app/start/page'
import WizardShell from './WizardShell'

const STATES = [
  { code: 'CA', name: 'California', limit: '$12,500', flag: '🌴' },
  { code: 'TX', name: 'Texas', limit: '$20,000', flag: '⭐' },
  { code: 'FL', name: 'Florida', limit: '$8,000', flag: '🌊' },
]

const CA_COUNTIES = ['Los Angeles','San Diego','Orange','Riverside','San Bernardino','Santa Clara','Alameda','Sacramento','Contra Costa','Fresno']
const TX_COUNTIES = ['Harris','Dallas','Tarrant','Bexar','Travis','Collin','Denton','Fort Bend','Montgomery','Williamson']
const FL_COUNTIES = ['Miami-Dade','Broward','Palm Beach','Hillsborough','Orange','Pinellas','Duval','Lee','Polk','Brevard']

const COUNTIES: Record<string, string[]> = { CA: CA_COUNTIES, TX: TX_COUNTIES, FL: FL_COUNTIES }

type Props = { data: ClaimData; update: (f: Partial<ClaimData>) => void; next: () => void }

export default function Step1_State({ data, update, next }: Props) {
  return (
    <WizardShell
      title="Where did this happen?"
      subtitle="We'll file in the correct court for your jurisdiction. Small claims limits vary by state."
      onNext={next}
      nextDisabled={!data.state || !data.county}
    >
      <div className="grid grid-cols-3 gap-3">
        {STATES.map(s => (
          <button key={s.code} onClick={() => update({ state: s.code, county: '' })}
            className="p-4 rounded-2xl text-center transition-all"
            style={{
              background: data.state === s.code ? 'rgba(240,192,64,0.1)' : 'rgba(255,255,255,0.03)',
              border: data.state === s.code ? '1px solid #f0c040' : '1px solid rgba(255,255,255,0.08)',
            }}>
            <div className="text-2xl mb-1">{s.flag}</div>
            <div className="font-semibold text-sm">{s.name}</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Up to {s.limit}</div>
          </button>
        ))}
      </div>

      {data.state && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-white/70 mb-2">Select your county</label>
          <select
            value={data.county}
            onChange={e => update({ county: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <option value="">Choose a county...</option>
            {(COUNTIES[data.state] || []).map(c => <option key={c} value={c}>{c} County</option>)}
          </select>
        </div>
      )}
    </WizardShell>
  )
}
