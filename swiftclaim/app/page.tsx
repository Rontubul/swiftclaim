import Link from 'next/link'

const steps = [
  { num: '01', title: 'Tell us what happened', desc: 'Answer a few simple questions about your dispute. Takes under 5 minutes.' },
  { num: '02', title: 'We prepare your filing', desc: 'Our system generates court-ready documents tailored to your state and county.' },
  { num: '03', title: 'We file with the court', desc: 'SwiftClaim submits directly to the court\'s e-filing system on your behalf.' },
  { num: '04', title: 'We serve the defendant', desc: 'We handle certified service of process so everything is legally sound.' },
  { num: '05', title: 'You show up and win', desc: 'We prep you for your hearing. You walk in ready. 90%+ of our users win or settle.' },
]

const states = [
  { abbr: 'CA', name: 'California', limit: '$12,500', courts: '58 counties' },
  { abbr: 'TX', name: 'Texas', limit: '$20,000', courts: '254 counties' },
  { abbr: 'FL', name: 'Florida', limit: '$8,000', courts: '67 counties' },
]

const faqs = [
  { q: 'Do I need a lawyer?', a: 'No. Small claims court is designed for self-represented filers. SwiftClaim handles all the paperwork and filing so you don\'t need one.' },
  { q: 'How much does it cost?', a: 'SwiftClaim charges a flat fee starting at $49. Court filing fees ($30–$100) are separate and paid directly to the court.' },
  { q: 'What if I don\'t finish my claim in one sitting?', a: 'No problem — your progress is saved automatically. We\'ll email you a reminder if you leave and help you pick up right where you left off.' },
  { q: 'Which states do you support?', a: 'We currently support California, Texas, and Florida — all of which have e-filing systems. More states coming soon.' },
  { q: 'What types of cases can I file?', a: 'Landlord/tenant disputes, unpaid loans, property damage, consumer issues, unpaid services, and more. If it\'s a money dispute under the state limit, we can file it.' },
]

export default function Home() {
  return (
    <main className="noise-bg min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5" style={{background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
        <span className="font-display text-xl font-bold tracking-tight">
          Swift<span className="gold-shimmer">Claim</span>
        </span>
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#states" className="hover:text-white transition-colors">States</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <Link href="/start" className="px-5 py-2 rounded-full text-navy-900 font-semibold text-sm" style={{background: 'linear-gradient(135deg, #f0c040, #e6ac20)'}}>
            Start a Claim
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 pt-24 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle, rgba(240,192,64,0.06) 0%, transparent 70%)'}} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8" style={{background:'rgba(240,192,64,0.1)', border:'1px solid rgba(240,192,64,0.25)', color:'#f0c040'}}>
            ⚡ Now filing in California, Texas & Florida
          </div>

          <h1 className="animate-fade-up-delay font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6">
            Justice shouldn't<br />
            require a <span className="gold-shimmer">lawyer</span>
          </h1>

          <p className="animate-fade-up-delay-2 text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            SwiftClaim files your small claims case directly with the court — no legal jargon, no confusing forms, no wasted afternoons at the courthouse.
          </p>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="px-8 py-4 rounded-full font-semibold text-lg text-navy-900 transition-transform hover:scale-105 active:scale-95" style={{background:'linear-gradient(135deg, #f0c040, #e6ac20)'}}>
              File a Claim — Starting at $49
            </Link>
            <a href="#how-it-works" className="px-8 py-4 rounded-full font-semibold text-lg text-white/80 hover:text-white transition-colors" style={{border:'1px solid rgba(255,255,255,0.12)'}}>
              See how it works →
            </a>
          </div>

          <div className="animate-fade-up-delay-3 flex items-center justify-center gap-8 mt-12 text-sm text-white/40">
            <span>✓ 10,000+ cases filed</span>
            <span>✓ 90%+ win or settle</span>
            <span>✓ File in under 15 min</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">The Process</p>
          <h2 className="font-display text-5xl font-bold">Five steps to justice</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="step-card rounded-2xl p-6 relative">
              <div className="font-display text-4xl font-bold mb-4" style={{color:'rgba(240,192,64,0.3)'}}>{step.num}</div>
              <h3 className="font-semibold text-base mb-2 leading-snug">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATES */}
      <section id="states" className="py-32 px-6" style={{background:'rgba(255,255,255,0.015)', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">Coverage</p>
            <h2 className="font-display text-5xl font-bold">Where we file</h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">We support states with active e-filing systems so your claim goes straight to the court — no printing, no mailing, no delays.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {states.map((state, i) => (
              <div key={i} className="step-card rounded-3xl p-8 text-center">
                <div className="font-display text-6xl font-bold gold-shimmer mb-3">{state.abbr}</div>
                <div className="font-semibold text-lg mb-4">{state.name}</div>
                <div className="space-y-2 text-sm text-white/50">
                  <div className="flex justify-between px-4"><span>Max claim</span><span className="text-white/80">{state.limit}</span></div>
                  <div className="flex justify-between px-4"><span>Coverage</span><span className="text-white/80">{state.courts}</span></div>
                  <div className="flex justify-between px-4"><span>E-Filing</span><span style={{color:'#4ade80'}}>✓ Live</span></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-sm mt-8">More states coming soon — Illinois, Washington, Ohio, Maryland</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">FAQ</p>
          <h2 className="font-display text-5xl font-bold">Common questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="step-card rounded-2xl p-6">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Ready to get<br /><span className="gold-shimmer">what you're owed?</span>
          </h2>
          <p className="text-white/50 mb-10 text-lg">Join thousands who've filed with SwiftClaim. Start in minutes, finish today.</p>
          <Link href="/start" className="inline-block px-10 py-5 rounded-full font-semibold text-xl text-navy-900 transition-transform hover:scale-105 active:scale-95" style={{background:'linear-gradient(135deg, #f0c040, #e6ac20)'}}>
            Start Your Claim Now →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-8 text-center text-white/25 text-sm" style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <p className="font-display text-base font-bold text-white/40 mb-2">SwiftClaim</p>
        <p>© 2026 SwiftClaim. Not a law firm. We prepare and file documents on your behalf.</p>
        <p className="mt-1">SwiftClaim does not provide legal advice and no attorney-client relationship is formed.</p>
      </footer>

    </main>
  )
}
