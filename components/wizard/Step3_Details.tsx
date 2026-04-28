'use client'
import { ClaimData } from '@/app/start/page'
import WizardShell from './WizardShell'
import Field, { inputClass, inputStyle } from './Field'

type Props = { data: ClaimData; update: (f: Partial<ClaimData>) => void; next: () => void; back: () => void }

export default function Step3_Details({ data, update, next, back }: Props) {
  const valid = data.claimAmount && data.incidentDate && data.claimDescription.length > 20
  return (
    <WizardShell
      title="Tell us what happened"
      subtitle="Be specific — dates, amounts, and what the other party did or didn't do. Judges love specifics."
      onNext={next}
      onBack={back}
      nextDisabled={!valid}
    >
      <Field label="How much are you owed?" hint="Enter the total amount you're claiming in dollars">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
          <input
            type="number"
            placeholder="0.00"
            value={data.claimAmount}
            onChange={e => update({ claimAmount: e.target.value })}
            className={inputClass + ' pl-8'}
            style={inputStyle}
          />
        </div>
      </Field>

      <Field label="When did this happen?" hint="The date of the incident or when the dispute started">
        <input
          type="date"
          value={data.incidentDate}
          onChange={e => update({ incidentDate: e.target.value })}
          className={inputClass}
          style={inputStyle}
        />
      </Field>

      <Field label="Describe what happened" hint="At least 20 characters. Be as detailed as possible — this becomes your claim narrative.">
        <textarea
          rows={5}
          placeholder="Explain what happened, who did what, when it happened, and why you believe you're owed money..."
          value={data.claimDescription}
          onChange={e => update({ claimDescription: e.target.value })}
          className={inputClass}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        <div className="text-xs mt-1 text-right" style={{ color: data.claimDescription.length > 20 ? '#f0c040' : 'rgba(255,255,255,0.3)' }}>
          {data.claimDescription.length} characters
        </div>
      </Field>
    </WizardShell>
  )
}
