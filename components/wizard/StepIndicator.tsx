type Props = { current: number; steps: string[] }

export default function StepIndicator({ current, steps }: Props) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="w-full h-1 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${((current - 1) / (steps.length - 1)) * 100}%`, background: 'linear-gradient(90deg, #f0c040, #e6ac20)' }}
        />
      </div>
      {/* Step labels */}
      <div className="flex justify-between">
        {steps.map((label, i) => {
          const num = i + 1
          const done = num < current
          const active = num === current
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: done ? '#f0c040' : active ? 'rgba(240,192,64,0.15)' : 'rgba(255,255,255,0.05)',
                  border: active ? '1px solid #f0c040' : done ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  color: done ? '#0a0e1a' : active ? '#f0c040' : 'rgba(255,255,255,0.3)',
                }}
              >
                {done ? '✓' : num}
              </div>
              <span className="text-xs hidden md:block" style={{ color: active ? '#f0c040' : 'rgba(255,255,255,0.3)' }}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
