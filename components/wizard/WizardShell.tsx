import { ReactNode } from 'react'

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
  onNext?: () => void
  onBack?: () => void
  nextLabel?: string
  nextDisabled?: boolean
}

export default function WizardShell({ title, subtitle, children, onNext, onBack, nextLabel = 'Continue →', nextDisabled }: Props) {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-white/50 mb-8 text-sm leading-relaxed">{subtitle}</p>}
      <div className="space-y-4">{children}</div>
      <div className="flex gap-3 mt-8">
        {onBack && (
          <button onClick={onBack} className="px-6 py-3 rounded-xl text-sm font-medium transition-colors text-white/50 hover:text-white"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            ← Back
          </button>
        )}
        {onNext && (
          <button onClick={onNext} disabled={nextDisabled}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: nextDisabled ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #f0c040, #e6ac20)',
              color: nextDisabled ? 'rgba(255,255,255,0.2)' : '#0a0e1a',
              cursor: nextDisabled ? 'not-allowed' : 'pointer'
            }}>
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  )
}
