import { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
  hint?: string
}

export default function Field({ label, children, hint }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-white/30 mt-1">{hint}</p>}
    </div>
  )
}

export const inputClass = `w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all`
export const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
}
export const inputFocusStyle = {
  borderColor: '#f0c040',
}
