'use client'
import { ClaimData } from '@/app/start/page'
import WizardShell from './WizardShell'
import Field, { inputClass, inputStyle } from './Field'

type Props = { data: ClaimData; update: (f: Partial<ClaimData>) => void; next: () => void; back: () => void }

export default function Step4_Defendant({ data, update, next, back }: Props) {
  const valid = data.defendantName && data.defendantAddress && data.defendantCity && data.defendantZip
  return (
    <WizardShell
      title="Who are you suing?"
      subtitle="We need accurate defendant info to file and serve them. Double-check names — they must match legal records."
      onNext={next}
      onBack={back}
      nextDisabled={!valid}
    >
      {/* Individual vs Business toggle */}
      <div className="flex gap-2">
        {['individual', 'business'].map(t => (
          <button key={t} onClick={() => update({ defendantType: t })}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all"
            style={{
              background: data.defendantType === t ? 'rgba(240,192,64,0.1)' : 'rgba(255,255,255,0.03)',
              border: data.defendantType === t ? '1px solid #f0c040' : '1px solid rgba(255,255,255,0.08)',
              color: data.defendantType === t ? '#f0c040' : 'rgba(255,255,255,0.5)',
            }}>
            {t === 'individual' ? '👤 Individual' : '🏢 Business'}
          </button>
        ))}
      </div>

      <Field label={data.defendantType === 'business' ? 'Business legal name' : 'Full legal name'}
        hint="Use their full legal name exactly as it appears on contracts or official documents">
        <input
          type="text"
          placeholder={data.defendantType === 'business' ? 'ABC Company LLC' : 'John Michael Smith'}
          value={data.defendantName}
          onChange={e => update({ defendantName: e.target.value })}
          className={inputClass}
          style={inputStyle}
        />
      </Field>

      <Field label="Street address">
        <input type="text" placeholder="123 Main Street, Apt 4B"
          value={data.defendantAddress}
          onChange={e => update({ defendantAddress: e.target.value })}
          className={inputClass} style={inputStyle} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="City">
          <input type="text" placeholder="Los Angeles"
            value={data.defendantCity}
            onChange={e => update({ defendantCity: e.target.value })}
            className={inputClass} style={inputStyle} />
        </Field>
        <Field label="ZIP code">
          <input type="text" placeholder="90001" maxLength={5}
            value={data.defendantZip}
            onChange={e => update({ defendantZip: e.target.value })}
            className={inputClass} style={inputStyle} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Email (optional)">
          <input type="email" placeholder="defendant@email.com"
            value={data.defendantEmail}
            onChange={e => update({ defendantEmail: e.target.value })}
            className={inputClass} style={inputStyle} />
        </Field>
        <Field label="Phone (optional)">
          <input type="tel" placeholder="(555) 000-0000"
            value={data.defendantPhone}
            onChange={e => update({ defendantPhone: e.target.value })}
            className={inputClass} style={inputStyle} />
        </Field>
      </div>
    </WizardShell>
  )
}
