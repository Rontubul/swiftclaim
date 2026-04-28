'use client'
import { useState } from 'react'
import { ClaimData } from '@/app/start/page'
import WizardShell from './WizardShell'

type Props = { data: ClaimData; update: (f: Partial<ClaimData>) => void; next: () => void; back: () => void }

const TIPS = [
  { icon: '📄', text: 'Contracts or agreements' },
  { icon: '💬', text: 'Text messages or emails' },
  { icon: '📸', text: 'Photos of damage' },
  { icon: '🧾', text: 'Receipts or invoices' },
  { icon: '🏦', text: 'Bank statements' },
  { icon: '📋', text: 'Estimates or quotes' },
]

export default function Step5_Evidence({ data, update, next, back }: Props) {
  const [dragging, setDragging] = useState(false)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files)
    update({ files: [...data.files, ...newFiles] })
  }

  const removeFile = (i: number) => {
    const updated = data.files.filter((_, idx) => idx !== i)
    update({ files: updated })
  }

  return (
    <WizardShell
      title="Add your evidence"
      subtitle="Strong evidence wins cases. Upload anything that supports your claim — you can add more later."
      onNext={next}
      onBack={back}
      nextLabel={data.files.length > 0 ? `Continue with ${data.files.length} file${data.files.length > 1 ? 's' : ''} →` : 'Skip for now →'}
    >
      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
        className="relative rounded-2xl p-8 text-center cursor-pointer transition-all"
        style={{
          border: dragging ? '2px dashed #f0c040' : '2px dashed rgba(255,255,255,0.1)',
          background: dragging ? 'rgba(240,192,64,0.05)' : 'rgba(255,255,255,0.02)',
        }}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input id="file-input" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="hidden" onChange={e => handleFiles(e.target.files)} />
        <div className="text-3xl mb-3">📎</div>
        <div className="font-medium text-sm mb-1">Drop files here or click to upload</div>
        <div className="text-xs text-white/30">PDF, JPG, PNG, DOC — up to 10MB each</div>
      </div>

      {/* Uploaded files */}
      {data.files.length > 0 && (
        <div className="space-y-2">
          {data.files.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ background: 'rgba(240,192,64,0.06)', border: '1px solid rgba(240,192,64,0.15)' }}>
              <div className="flex items-center gap-3">
                <span>📄</span>
                <div>
                  <div className="text-sm font-medium">{f.name}</div>
                  <div className="text-xs text-white/30">{(f.size / 1024).toFixed(0)} KB</div>
                </div>
              </div>
              <button onClick={() => removeFile(i)} className="text-white/30 hover:text-red-400 text-lg transition-colors">×</button>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="mt-2">
        <p className="text-xs text-white/30 mb-3 font-medium uppercase tracking-wider">Helpful evidence to include</p>
        <div className="grid grid-cols-3 gap-2">
          {TIPS.map((tip, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-white/40 p-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span>{tip.icon}</span>
              <span>{tip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </WizardShell>
  )
}
