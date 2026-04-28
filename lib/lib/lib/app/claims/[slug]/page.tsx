import { CLAIMS, getClaimBySlug } from '@/lib/claims-data'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return CLAIMS.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const claim = getClaimBySlug(params.slug)
  if (!claim) return {}
  return {
    title: `${claim.title} — SwiftClaim`,
    description: claim.description.slice(0, 160),
  }
}

export default function ClaimPage({ params }: { params: { slug: string } }) {
  const claim = getClaimBySlug(params.slug)
  if (!claim) notFound()

  return (
    <main className="min-h-screen" style={{ background: '#0a0e1a' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-display text-xl font-bold">Swift<span style={{ color: '#f0c040' }}>Claim</span></Link>
        <Link href="/start" className="px-5 py-2 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>Start a Claim</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/claims" className="hover:text-white transition-colors">Claims</Link>
          <span>/</span>
          <span className="text-white/70">{claim.title}</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <div className="text-5xl mb-4">{claim.icon}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{claim.title}</h1>
          <p className="text-xl text-white/60 mb-6">{claim.tagline}</p>
          <p className="text-white/70 leading-relaxed text-lg">{claim.description}</p>
        </div>

        {/* State limits */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { state: 'California', code: 'CA', amount: claim.maxAmount.CA },
            { state: 'Texas', code: 'TX', amount: claim.maxAmount.TX },
            { state: 'Florida', code: 'FL', amount: claim.maxAmount.FL },
          ].map(s => (
            <div key={s.code} className="rounded-2xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="font-display text-2xl font-bold mb-1" style={{ color: '#f0c040' }}>{s.amount}</div>
              <div className="text-sm text-white/50">Max in {s.state}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Common scenarios */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="font-display text-xl font-bold mb-4">Common Scenarios</h2>
            <ul className="space-y-3">
              {claim.commonScenarios.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/70">
                  <span style={{ color: '#f0c040', flexShrink: 0 }}>✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What you need */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="font-display text-xl font-bold mb-4">Evidence You'll Need</h2>
            <ul className="space-y-3">
              {claim.whatYouNeed.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/70">
                  <span style={{ color: '#60a5fa', flexShrink: 0 }}>→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-2xl p-6 mb-12" style={{ background: 'rgba(240,192,64,0.05)', border: '1px solid rgba(240,192,64,0.15)' }}>
          <h2 className="font-display text-xl font-bold mb-4">💡 Expert Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {claim.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 text-sm text-white/70">
                <span style={{ color: '#f0c040', flexShrink: 0 }}>•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time limit */}
        <div className="rounded-2xl p-5 mb-12 flex items-center gap-4" style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}>
          <span className="text-2xl">⏰</span>
          <div>
            <div className="font-semibold text-sm mb-1">Statute of Limitations</div>
            <div className="text-sm text-white/60">{claim.timeLimit} — don't wait too long or your case may be dismissed</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 rounded-3xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="font-display text-3xl font-bold mb-3">Ready to file your {claim.title.toLowerCase()} case?</h2>
          <p className="text-white/50 mb-6">SwiftClaim handles everything — paperwork, filing, and service of process. You just show up and win.</p>
          <Link href="/start" className="inline-block px-10 py-4 rounded-full font-semibold text-lg" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
            Start Your Claim — From $49 →
          </Link>
        </div>
      </div>

      <footer className="py-8 px-8 text-center text-white/25 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2026 SwiftClaim. Not a law firm. We prepare and file documents on your behalf. No attorney-client relationship is formed.
      </footer>
    </main>
  )
}
