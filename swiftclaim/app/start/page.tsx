export default function StartPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{background:'#0a0e1a'}}>
      <div className="text-center max-w-lg">
        <div className="font-display text-3xl font-bold mb-4">
          Swift<span style={{color:'#f0c040'}}>Claim</span>
        </div>
        <h1 className="font-display text-4xl font-bold mb-4">Start Your Claim</h1>
        <p className="text-white/50 mb-8">The full claim wizard is coming soon. Your Supabase database is live and ready.</p>
        <a href="/" className="inline-block px-6 py-3 rounded-full text-sm font-semibold" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)'}}>
          ← Back to Home
        </a>
      </div>
    </main>
  )
}
