import { useMemo } from 'react'
import { Twinkles, ShootingStars } from '../effects/Ambient'
import './scenes.css'

const qPoint = (p0, p1, p2, t) => [
  (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
]

/* ---------------- Dreamy garden at dusk with fairy lights ---------------- */
export function GardenScene() {
  const strands = useMemo(
    () => [
      { p0: [-40, 40], p1: [300, 230], p2: [640, 60], n: 14 },
      { p0: [560, 60], p1: [900, 240], p2: [1240, 40], n: 14 },
      { p0: [-40, 150], p1: [600, 380], p2: [1240, 150], n: 22 },
    ],
    [],
  )
  const colors = ['#ffe3a3', '#ffd6e5', '#fff3c4', '#f4c76b', '#ffc4d8']
  return (
    <svg className="scene-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="bulb">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset="0.25" stopColor="rgba(255,226,160,0.95)" />
          <stop offset="1" stopColor="rgba(255,200,140,0)" />
        </radialGradient>
        <radialGradient id="moonGlow">
          <stop offset="0" stopColor="rgba(255,244,220,0.9)" />
          <stop offset="0.3" stopColor="rgba(255,230,240,0.35)" />
          <stop offset="1" stopColor="rgba(255,230,240,0)" />
        </radialGradient>
        <linearGradient id="bushFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d3f7a" />
          <stop offset="1" stopColor="#3b2756" />
        </linearGradient>
        <linearGradient id="bushNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f2a5c" />
          <stop offset="1" stopColor="#21183c" />
        </linearGradient>
      </defs>

      <circle cx="1010" cy="120" r="170" fill="url(#moonGlow)" />
      <circle cx="1010" cy="120" r="38" fill="#fff4e0" opacity="0.95" />

      {/* string lights */}
      {strands.map((s, si) => (
        <g key={si}>
          <path d={`M${s.p0} Q${s.p1} ${s.p2}`} stroke="rgba(40,25,60,0.55)" strokeWidth="2" fill="none" />
          {Array.from({ length: s.n }, (_, i) => {
            const [x, y] = qPoint(s.p0, s.p1, s.p2, (i + 0.5) / s.n)
            return (
              <g key={i} className="bulb" style={{ animationDelay: `${((i * 0.37 + si) % 2.5).toFixed(2)}s` }}>
                <circle cx={x} cy={y + 9} r="22" fill="url(#bulb)" />
                <circle cx={x} cy={y + 9} r="5" fill={colors[(i + si) % colors.length]} />
              </g>
            )
          })}
        </g>
      ))}

      {/* bushes + glowing flowers */}
      <path
        d="M0 640C60 580 120 600 170 620C220 560 300 570 340 610C390 570 450 580 480 620L480 800L0 800Z M720 620C760 570 830 570 870 610C920 560 990 570 1030 615C1080 580 1150 590 1200 630L1200 800L720 800Z"
        fill="url(#bushFar)"
      />
      <path
        d="M0 700C50 660 110 670 150 700C200 650 260 660 300 700C330 680 380 690 400 720L400 800L0 800Z M800 720C830 680 890 670 930 700C970 655 1040 660 1080 700C1120 670 1170 675 1200 700L1200 800L800 800Z"
        fill="url(#bushNear)"
      />
      <path d="M380 800C420 760 520 742 600 742C680 742 780 760 820 800Z" fill="#2c1f47" />
      {[
        [90, 640], [160, 612], [250, 600], [330, 628], [420, 618], [760, 618], [840, 600], [930, 595], [1010, 620], [1120, 626],
        [60, 700], [200, 690], [290, 705], [880, 700], [990, 690], [1130, 700],
      ].map(([x, y], i) => (
        <g key={i} className="glow-flower" style={{ animationDelay: `${(i * 0.41) % 3}s` }}>
          <circle cx={x} cy={y} r="14" fill="rgba(255,190,215,0.25)" />
          <circle cx={x} cy={y} r="4.5" fill={i % 3 ? '#ffc4d8' : '#fff3c4'} />
        </g>
      ))}
    </svg>
  )
}

/* ---------------- Road leading toward a glowing sunset ---------------- */
export function SunsetScene() {
  const posts = [0.06, 0.3, 0.5, 0.65, 0.76]
  return (
    <svg className="scene-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a996dc" />
          <stop offset="0.35" stopColor="#e7a6cf" />
          <stop offset="0.55" stopColor="#ffb7b0" />
          <stop offset="0.66" stopColor="#ffd59a" />
          <stop offset="1" stopColor="#ffe9c4" />
        </linearGradient>
        <radialGradient id="sunGlow">
          <stop offset="0" stopColor="rgba(255,248,214,1)" />
          <stop offset="0.25" stopColor="rgba(255,226,150,0.8)" />
          <stop offset="0.6" stopColor="rgba(255,190,170,0.3)" />
          <stop offset="1" stopColor="rgba(255,190,170,0)" />
        </radialGradient>
        <linearGradient id="road" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#5a3f6e" />
          <stop offset="0.7" stopColor="#9a6f97" />
          <stop offset="1" stopColor="#f2c0a8" />
        </linearGradient>
        <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a5f97" />
          <stop offset="1" stopColor="#5c3c70" />
        </linearGradient>
        <radialGradient id="lamp">
          <stop offset="0" stopColor="rgba(255,240,200,1)" />
          <stop offset="1" stopColor="rgba(255,220,160,0)" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#sky)" />
      <g className="sun-rays" style={{ transformOrigin: '600px 520px' }}>
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d="M600 520L585 40L615 40Z" fill="rgba(255,240,200,0.18)" transform={`rotate(${i * 20} 600 520)`} />
        ))}
      </g>
      <circle cx="600" cy="520" r="330" fill="url(#sunGlow)" />
      <circle className="sun" cx="600" cy="520" r="78" fill="#fff3cf" />

      {/* soft cloud wisps */}
      <g fill="rgba(255,235,240,0.55)" className="wisps">
        <ellipse cx="260" cy="250" rx="150" ry="16" />
        <ellipse cx="330" cy="230" rx="90" ry="14" />
        <ellipse cx="930" cy="300" rx="170" ry="15" />
        <ellipse cx="870" cy="282" rx="80" ry="12" />
      </g>

      {/* hills */}
      <path d="M0 540C140 470 260 500 380 520C460 490 540 500 600 522C680 495 760 488 840 515C960 470 1080 490 1200 530L1200 800L0 800Z" fill="#c695bd" opacity="0.8" />
      <path d="M0 590C120 540 240 560 340 590C420 570 500 560 590 524L610 524C700 560 780 570 860 590C960 556 1080 548 1200 590L1200 800L0 800Z" fill="url(#hillNear)" />

      {/* road */}
      <path d="M250 800L588 522L612 522L950 800Z" fill="url(#road)" />
      <path d="M250 800L588 522M950 800L612 522" stroke="rgba(255,230,210,0.55)" strokeWidth="3" />
      <path className="road-dash" d="M600 800L600 526" stroke="#fff1d6" strokeWidth="7" strokeDasharray="34 30" />
      <path d="M560 800L598 524L602 524L640 800Z" fill="rgba(255,236,190,0.18)" />

      {/* lamp posts with heart lanterns, receding in perspective */}
      {posts.map((t, i) =>
        [-1, 1].map((side) => {
          const x = 600 + side * (370 - 340 * t) * 1.05
          const y = 800 - 278 * t
          const s = 1 - t * 0.9
          return (
            <g key={`${i}${side}`} transform={`translate(${x} ${y}) scale(${s})`}>
              <rect x="-4" y="-190" width="8" height="190" rx="3" fill="#4a3160" />
              <circle cx="0" cy="-200" r="42" fill="url(#lamp)" className="lamp-glow" style={{ animationDelay: `${i * 0.3}s` }} />
              <path d="M0 -186c-11-7-15-13-12-18 2-5 9-5 12 0 3-5 10-5 12 0 3 5-1 11-12 18z" fill="#ffd6e5" />
            </g>
          )
        }),
      )}

      {/* birds */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="bird" style={{ animationDelay: `${i * 2.2}s`, '--by': `${180 + i * 50}px` }}>
          <path d="M0 0Q8-8 16 0Q24-8 32 0" stroke="#6d4a7e" strokeWidth="2.5" fill="none" strokeLinecap="round" className="bird-wing" />
        </g>
      ))}
    </svg>
  )
}

/* ---------------- Starry midnight sky ---------------- */
export function StarrySky({ moon = true, shooting = true, density = 70 }) {
  return (
    <div className="starry" aria-hidden="true">
      <div className="starry-nebula" />
      <Twinkles count={density} color="#ffffff" glow="rgba(200,210,255,0.9)" sizes={[1.5, 3.5]} />
      <Twinkles count={Math.round(density / 4)} color="#ffe3a3" glow="rgba(255,220,150,0.9)" sizes={[2, 4]} />
      {moon && (
        <div className="moon">
          <div className="moon-glow" />
        </div>
      )}
      {shooting && <ShootingStars count={3} />}
    </div>
  )
}
