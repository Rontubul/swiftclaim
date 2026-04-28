'use client'
import { useState } from 'react'
import StepIndicator from '@/components/wizard/StepIndicator'
import Step1_State from '@/components/wizard/Step1_State'
import Step2_ClaimType from '@/components/wizard/Step2_ClaimType'
import Step3_Details from '@/components/wizard/Step3_Details'
import Step4_Defendant from '@/components/wizard/Step4_Defendant'
import Step5_Evidence from '@/components/wizard/Step5_Evidence'
import Step6_Review from '@/components/wizard/Step6_Review'

export type ClaimData = {
  state: string
  county: string
  claimType: string
  claimAmount: string
  incidentDate: string
  claimDescription: string
  defendantType: string
  defendantName: string
  defendantAddress: string
  defendantCity: string
  defendantZip: string
  defendantEmail: string
  defendantPhone: string
  files: File[]
}

const EMPTY: ClaimData = {
  state: '', county: '', claimType: '', claimAmount: '', incidentDate: '',
  claimDescription: '', defendantType: 'individual', defendantName: '',
  defendantAddress: '', defendantCity: '', defendantZip: '',
  defendantEmail: '', defendantPhone: '', files: []
}

const STEPS = ['Jurisdiction', 'Claim Type', 'Your Story', 'Defendant', 'Evidence', 'Review']

export default function StartPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<ClaimData>(EMPTY)

  const update = (fields: Partial<ClaimData>) => setData(prev => ({ ...prev, ...fields }))
  const next = () => setStep(s => Math.min(s + 1, STEPS.length))
  const back = () => setStep(s => Math.max(s - 1, 1))

  return (
    <main className="min-h-screen" style={{ background: '#0a0e1a' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" className="font-display text-xl font-bold tracking-tight">
          Swift<span style={{ color: '#f0c040' }}>Claim</span>
        </a>
        <div className="text-sm text-white/40">
          Step {step} of {STEPS.length}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <StepIndicator current={step} steps={STEPS} />

        <div className="mt-10">
          {step === 1 && <Step1_State data={data} update={update} next={next} />}
          {step === 2 && <Step2_ClaimType data={data} update={update} next={next} back={back} />}
          {step === 3 && <Step3_Details data={data} update={update} next={next} back={back} />}
          {step === 4 && <Step4_Defendant data={data} update={update} next={next} back={back} />}
          {step === 5 && <Step5_Evidence data={data} update={update} next={next} back={back} />}
          {step === 6 && <Step6_Review data={data} back={back} />}
        </div>
      </div>
    </main>
  )
}
