import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
      <Link href="/" className="font-display text-xl font-bold tracking-tight">
        Swift<span style={{ color: '#f0c040' }}>Claim</span>
      </Link>
      <div className="flex items-center gap-6 text-sm text-white/60">
        <Link href="/claims" className="hover:text-white transition-colors hidden md:block">Claim Types</Link>
        <Link href="/states" className="hover:text-white transition-colors hidden md:block">States</Link>
        <Link href="/faq" className="hover:text-white transition-colors hidden md:block">FAQ</Link>
        <Link href="/dashboard" className="hover:text-white transition-colors hidden md:block">My Claims</Link>
        <Link href="/start" className="px-5 py-2 rounded-full text-navy-900 font-semibold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
          Start a Claim
        </Link>
      </div>
    </nav>
  )
}
