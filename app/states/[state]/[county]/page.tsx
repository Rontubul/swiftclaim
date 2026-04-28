import { STATES, getState, getCounty } from '@/lib/states-data'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const params = []
  for (const state of Object.values(STATES)) {
    for (const county of state.counties) {
      params.push({ state: state.code.toLowerCase(), county: county.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: { state: string; county: string } }) {
  const state = getState(params.state)
  const county = getCounty(params.state, params.county)
  if (!state || !county) return {}
  return {
    title: `Small Claims Court ${county.name} County, ${state.name} — SwiftClaim`,
    description: `File a small claims case in ${county.name} County, ${state.name}. Court information, filing fees, e-filing, and how SwiftClaim can file for you.`,
  }
}

export default function CountyPage({ params }: { params: { state: string; county: string } }) {
  const state = getState(params.state)
  const county = getCounty(params.state, params.county)
  if (!state || !county) notFound()

  return (
    <main className="min-h-screen" style={{ background: '#0a0e1a' }}>
      <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-display text-xl font-bold">Swift<span style={{ color: '#f0c040' }}>Claim</span></Link>
        <Link href="/start" className="px-5 py-2 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>Start a Claim</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/states" className="hover:text-white transition-colors">States</Link>
          <span>/</span>
          <Link href={`/states/${state.code.toLowerCase()}`} className="hover:text-white transition-colors">{state.name}</Link>
          <span>/</span>
          <span className="text-white/70">{county.name} County</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Small Claims Court<br />
            <span style={{ color: '#f0c040' }}>{county.name} County, {state.name}</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Everything you need to file a small claims case in {county.name} County. SwiftClaim files directly with {county.court} on your behalf — no courthouse visits required.
          </p>
        </div>

        {/* Court info cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="font-semibold text-sm uppercase tracking-wider text-white/40">Court Information</h2>
            <div>
              <div className="text-xs text-white/40 mb-0.5">Court Name</div>
              <div className="text-sm font-medium">{county.court}</div>
            </div>
            <div>
              <div className="text-xs text-white/40 mb-0.5">Address</div>
              <div className="text-sm font-medium">{county.address}</div>
            </div>
            <div>
              <div className="text-xs text-white/40 mb-0.5">Phone</div>
              <div className="text-sm font-medium">{county.phone}</div>
            </div>
            <div>
              <div className="text-xs text-white/40 mb-0.5">Hours</div>
              <div className="text-sm font-medium">{county.hours}</div>
            </div>
          </div>

          <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="font-semibold text-sm uppercase tracking-wider text-white/40">Filing Details</h2>
            <div>
              <div className="text-xs text-white/40 mb-0.5">Maximum Claim Amount</div>
              <div className="font-display text-2xl font-bold" style={{ color: '#f0c040' }}>{county.maxAmount}</div>
            </div>
            <div>
              <div className="text-xs text-white/40 mb-0.5">Court Filing Fee</div>
              <div className="text-sm font-medium">{county.filingFee}</div>
            </div>
            <div>
              <div className="text-xs text-white/40 mb-0.5">E-Filing</div>
              <div className="text-sm font-medium" style={{ color: county.eFilingAvailable ? '#4ade80' : '#f87171' }}>
                {county.eFilingAvailable ? '✓ Available — SwiftClaim files electronically' : '✗ Paper filing required'}
              </div>
            </div>
            <div>
              <div className="text-xs text-white/40 mb-0.5">E-Filing Portal</div>
              <div className="text-sm font-medium text-blue-400">{state.eFilingPortal}</div>
            </div>
          </div>
        </div>

        {/* County-specific notes */}
        <div className="rounded-2xl p-6 mb-12" style={{ background: 'rgba(240,192,64,0.05)', border: '1px solid rgba(240,192,64,0.15)' }}>
          <h2 className="font-display text-xl font-bold mb-3">📍 {county.name} County Notes</h2>
          <p className="text-white/70 leading-relaxed">{county.notes}</p>
        </div>

        {/* State general notes */}
        <div className="rounded-2xl p-6 mb-12" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 className="font-display text-xl font-bold mb-3">{state.name} Small Claims Rules</h2>
          <p className="text-white/70 leading-relaxed">{state.generalNotes}</p>
        </div>

        {/* How to file steps */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6">How to File in {county.name} County</h2>
          <div className="space-y-4">
            {[
              { num: '01', title: 'Gather your evidence', desc: 'Collect contracts, receipts, photos, emails, texts — anything that supports your claim.' },
              { num: '02', title: 'Start your claim on SwiftClaim', desc: 'Answer simple questions about your dispute. Takes under 10 minutes.' },
              { num: '03', title: 'We prepare your forms', desc: `We generate the correct forms for ${county.court} tailored to your specific case.` },
              { num: '04', title: 'We file electronically', desc: `SwiftClaim submits directly to ${county.court}${county.eFilingAvailable ? ' via e-filing' : ''}. Your case number is assigned immediately.` },
              { num: '05', title: 'Defendant is served', desc: 'We arrange certified service of process so everything is legally compliant.' },
              { num: '06', title: 'You attend the hearing', desc: 'We prep you for court. Show up, present your case, collect your judgment.' },
            ].map(step => (
              <div key={step.num} className="flex gap-5 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="font-display text-2xl font-bold flex-shrink-0" style={{ color: 'rgba(240,192,64,0.4)' }}>{step.num}</div>
                <div>
                  <div className="font-semibold mb-1">{step.title}</div>
                  <div className="text-sm text-white/50">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 rounded-3xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="font-display text-3xl font-bold mb-3">Ready to file in {county.name} County?</h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">SwiftClaim files directly with {county.court}. Starting at $49 — court fees separate.</p>
          <Link href="/start" className="inline-block px-10 py-4 rounded-full font-semibold text-lg" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
            Start Your {county.name} Claim →
          </Link>
        </div>
      </div>

      <footer className="py-8 px-8 text-center text-white/25 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2026 SwiftClaim. Not a law firm. Court information is subject to change — verify directly with the court.
      </footer>
    </main>
  )
}
