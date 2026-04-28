import { STATES } from '@/lib/states-data'
import Link from 'next/link'

export const metadata = {
  title: 'Small Claims Filing by State — SwiftClaim',
  description: 'SwiftClaim files small claims cases in California, Texas, and Florida. Find court information for every county.',
}

export default function StatesPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0e1a' }}>
      <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-display text-xl font-bold">Swift<span style={{ color: '#f0c040' }}>Claim</span></Link>
        <Link href="/start" className="px-5 py-2 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>Start a Claim</Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f0c040' }}>Coverage</p>
          <h1 className="font-display text-5xl font-bold mb-4">Where We File</h1>
          <p className="text-white/50 max-w-xl mx-auto">SwiftClaim currently supports e-filing in California, Texas, and Florida. Select your state to find your county.</p>
        </div>

        <div className="space-y-10">
          {Object.values(STATES).map(state => (
            <div key={state.code}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-display text-3xl font-bold">{state.name}</h2>
                  <div className="flex gap-4 text-sm text-white/40 mt-1">
                    <span>Max claim: <span className="text-white/70">{state.maxAmount}</span></span>
                    <span>Filing fees: <span className="text-white/70">{state.filingFeeRange}</span></span>
                    <span>E-filing: <span style={{ color: '#4ade80' }}>✓ {state.eFilingPortal}</span></span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {state.counties.map(county => (
                  <Link key={county.slug} href={`/states/${state.code.toLowerCase()}/${county.slug}`}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-center transition-all hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {county.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-8 px-8 text-center text-white/25 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2026 SwiftClaim. Not a law firm.
      </footer>
    </main>
  )
}
