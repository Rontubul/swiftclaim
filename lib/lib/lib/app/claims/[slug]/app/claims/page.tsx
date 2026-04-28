import { CLAIMS } from '@/lib/claims-data'
import Link from 'next/link'

export const metadata = {
  title: 'Types of Small Claims — SwiftClaim',
  description: 'SwiftClaim handles all types of small claims disputes — landlord/tenant, breach of contract, property damage, personal injury, and more.',
}

export default function ClaimsIndex() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0e1a' }}>
      <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-display text-xl font-bold">Swift<span style={{ color: '#f0c040' }}>Claim</span></Link>
        <Link href="/start" className="px-5 py-2 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>Start a Claim</Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f0c040' }}>What We File</p>
          <h1 className="font-display text-5xl font-bold mb-4">Types of Small Claims</h1>
          <p className="text-white/50 max-w-xl mx-auto">SwiftClaim handles all monetary disputes in California, Texas, and Florida. Select your claim type to learn more.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {CLAIMS.map(claim => (
            <Link key={claim.slug} href={`/claims/${claim.slug}`}
              className="rounded-2xl p-6 block transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-3xl mb-3">{claim.icon}</div>
              <h2 className="font-semibold mb-2">{claim.title}</h2>
              <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{claim.tagline}</p>
              <div className="mt-3 text-xs" style={{ color: '#f0c040' }}>Learn more →</div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="py-8 px-8 text-center text-white/25 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2026 SwiftClaim. Not a law firm.
      </footer>
    </main>
  )
}
