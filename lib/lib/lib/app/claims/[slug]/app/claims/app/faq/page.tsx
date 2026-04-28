'use client'
import { useState } from 'react'
import { FAQ_SECTIONS } from '@/lib/faq-data'
import Link from 'next/link'

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <main className="min-h-screen" style={{ background: '#0a0e1a' }}>
      <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-display text-xl font-bold">Swift<span style={{ color: '#f0c040' }}>Claim</span></Link>
        <Link href="/start" className="px-5 py-2 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>Start a Claim</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f0c040' }}>FAQ</p>
          <h1 className="font-display text-5xl font-bold mb-4">Common Questions</h1>
          <p className="text-white/50">Everything you need to know about small claims court and how SwiftClaim works.</p>
        </div>

        <div className="space-y-10">
          {FAQ_SECTIONS.map(section => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="font-display text-2xl font-bold">{section.title}</h2>
              </div>
              <div className="space-y-2">
                {section.faqs.map(faq => {
                  const id = `${section.title}-${faq.question}`
                  const isOpen = open === id
                  return (
                    <div key={id} className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                      <button
                        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                        style={{ background: isOpen ? 'rgba(240,192,64,0.06)' : 'rgba(255,255,255,0.02)' }}
                        onClick={() => setOpen(isOpen ? null : id)}
                      >
                        <span className="font-medium text-sm pr-4">{faq.question}</span>
                        <span className="text-lg flex-shrink-0 transition-transform" style={{ color: '#f0c040', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 text-sm text-white/60 leading-relaxed" style={{ background: 'rgba(240,192,64,0.03)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 py-12 rounded-3xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="font-display text-3xl font-bold mb-3">Still have questions?</h2>
          <p className="text-white/50 mb-6">Start a claim and our team will guide you through everything.</p>
          <Link href="/start" className="inline-block px-10 py-4 rounded-full font-semibold text-lg" style={{ background: 'linear-gradient(135deg, #f0c040, #e6ac20)', color: '#0a0e1a' }}>
            Start Your Claim →
          </Link>
        </div>
      </div>

      <footer className="py-8 px-8 text-center text-white/25 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2026 SwiftClaim. Not a law firm. We prepare and file documents on your behalf.
      </footer>
    </main>
  )
}
