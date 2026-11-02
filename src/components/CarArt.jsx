const BODIES = {
  sedan: {
    body: 'M36 172 C38 158 52 150 74 146 C104 141 128 138 154 126 C182 113 214 105 256 104 C300 103 336 112 366 126 C394 138 424 143 470 148 C504 151 524 158 522 172 L520 178 L40 178 C36 178 34 176 36 172 Z',
    glass: 'M178 130 C200 112 232 106 264 106 C296 106 322 114 342 130 Z',
    pillars: [262],
    wheelR: 28,
  },
  suv: {
    body: 'M36 172 C38 156 52 148 76 144 C100 140 118 136 140 122 C160 109 190 100 240 98 C300 96 352 104 390 122 C414 133 440 140 478 146 C506 150 524 157 522 171 L520 178 L40 178 C36 178 34 176 36 172 Z',
    glass: 'M170 130 C190 108 216 101 252 100 C292 99 324 107 348 128 L348 130 L170 130 Z',
    pillars: [256, 310],
    wheelR: 30,
    rails: true,
  },
  hatchback: {
    body: 'M36 172 C38 158 54 150 78 146 C104 142 124 138 148 126 C172 114 200 106 244 105 C292 104 330 112 360 126 C386 137 420 143 466 148 C500 151 520 158 518 172 L516 178 L40 178 C36 178 34 176 36 172 Z',
    glass: 'M176 130 C198 112 230 106 262 106 C294 106 320 114 340 130 Z',
    pillars: [258],
    wheelR: 27,
  },
}

export default function CarArt({ car, className = '' }) {
  const shape = BODIES[car.art] || BODIES.sedan
  const [g0, g1] = car.gradient

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${g0} 0%, ${g1} 100%)` }}
      aria-hidden="true"
    >
      <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full bg-white/10" />
      <div className="absolute left-8 top-10 h-20 w-20 rounded-full bg-white/10" />
      <svg viewBox="0 0 560 220" className="relative h-full w-full" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="280" cy="188" rx="212" ry="9" fill="#000000" opacity="0.20" />
        {shape.rails && <rect x="205" y="89" width="140" height="5" rx="2.5" fill="#0C0A09" />}
        <path d={shape.body} fill="#1C1917" />
        <path d={shape.glass} fill="#FAF7F2" opacity="0.92" />
        {shape.pillars.map((x) => (
          <line key={x} x1={x} y1="106" x2={x} y2="130" stroke="#1C1917" strokeWidth="5" />
        ))}
        <line x1="300" y1="136" x2="296" y2="170" stroke="#000000" strokeOpacity="0.25" strokeWidth="2" />
        <rect x="306" y="140" width="16" height="4" rx="2" fill="#000000" opacity="0.25" />
        <ellipse cx="506" cy="158" rx="12" ry="5" fill="#FCD34D" />
        <ellipse cx="42" cy="158" rx="8" ry="4" fill="#F87171" opacity="0.9" />
        {[132, 428].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="176" r={shape.wheelR} fill="#0C0A09" />
            <circle cx={cx} cy="176" r="13" fill="#D6D3D1" />
            <circle cx={cx} cy="176" r="5" fill="#78716C" />
          </g>
        ))}
      </svg>
    </div>
  )
}
