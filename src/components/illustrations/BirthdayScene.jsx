import { motion } from 'framer-motion'
import { useState } from 'react'
import './birthdayScene.css'

/* ---------------- Arched "HAPPY BIRTHDAY" bunting (single row) ---------------- */
const FLAG_COLORS = ['#f6b3c8', '#fbd3a6', '#f4a6c1', '#fff1dc', '#ec8fae', '#f9c9a8']

export function ArchBanner({ text = 'HAPPY BIRTHDAY' }) {
  const chars = text.split('')
  const n = chars.length
  return (
    <div className="arch-banner" aria-label={text} role="img">
      <svg className="arch-string" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 2Q50 34 100 2" stroke="rgba(160,90,110,0.55)" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      {chars.map((ch, i) => {
        const t = n > 1 ? i / (n - 1) : 0.5
        const sag = Math.sin(t * Math.PI) * 26 // follows the string's curve
        const tilt = (t - 0.5) * -18
        if (ch === ' ') return <span key={i} className="arch-gap" />
        return (
          <motion.span
            key={i}
            className="arch-flag"
            style={{ '--c': FLAG_COLORS[i % FLAG_COLORS.length], marginTop: sag, rotate: `${tilt}deg` }}
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.05, type: 'spring', stiffness: 170, damping: 12 }}
          >
            <span className="arch-flag-inner" style={{ animationDelay: `${i * 0.14}s` }}>
              {ch}
            </span>
          </motion.span>
        )
      })}
    </div>
  )
}

/* ---------------- Balloon bunch for the top corners ---------------- */
export function BalloonBunch({ side = 'left', colors = ['#f4a6c1', '#f9c98a', '#ec7fa3'] }) {
  const b = [
    { x: 40, y: 50, s: 1.15, c: colors[0], d: 0 },
    { x: 92, y: 30, s: 1, c: colors[1], d: 0.6 },
    { x: 70, y: 92, s: 0.9, c: colors[2], d: 1.2 },
  ]
  return (
    <svg viewBox="0 0 160 240" className={`balloon-bunch ${side}`} aria-hidden="true">
      {b.map((o, i) => (
        <g key={i} className="bunch-balloon" style={{ animationDelay: `${o.d}s`, transformOrigin: `${o.x}px 240px` }}>
          <path d={`M${o.x} ${o.y + 44 * o.s}C${o.x - 6} ${o.y + 100} ${o.x + 18} ${o.y + 140} 80 236`} stroke="rgba(150,90,110,0.5)" strokeWidth="1.3" fill="none" />
          <g transform={`translate(${o.x} ${o.y}) scale(${o.s})`}>
            <path d="M0-40C-24-40-36-20-36 0C-36 24-14 40 0 44C14 40 36 24 36 0C36-20 24-40 0-40Z" fill={o.c} />
            <path d="M-5 44L0 50L5 44Z" fill={o.c} />
            <ellipse cx="-14" cy="-18" rx="7" ry="13" fill="rgba(255,255,255,0.5)" transform="rotate(25 -14 -18)" />
          </g>
        </g>
      ))}
    </svg>
  )
}

/* ---------------- Rose clusters for framing the corners ---------------- */
function Rose({ x, y, r, c, dark, rot = 0, delay = 0 }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 90, damping: 12 }}
    >
      <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${r / 20})`}>
        <circle r="20" fill={c} />
        <path d="M-19 4C-19-15 19-15 19 4C12-5-12-5-19 4Z" fill={dark} opacity="0.32" />
        <path d="M-15 9C-9 20 9 20 15 9C9 13-9 13-15 9Z" fill="rgba(255,255,255,0.4)" />
        <circle r="10" cy="-1" fill={c} />
        <path d="M-10-1C-10-10 10-10 10-1C5-5-5-5-10-1Z" fill={dark} opacity="0.45" />
        <path d="M-4 1C-4-5 5-5 5 0C5 3 1 4-1 2" stroke={dark} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    </motion.g>
  )
}

const LEAF = '#8fbf9f'
export function RoseCorner({ corner = 'bl', delay = 0.6 }) {
  const roses = [
    { x: 40, y: 140, r: 30, c: '#f4a6c1', dark: '#d9557c' },
    { x: 92, y: 158, r: 22, c: '#fbd3df', dark: '#ec7fa3' },
    { x: 20, y: 92, r: 20, c: '#f9c9a8', dark: '#e58f6a' },
    { x: 120, y: 176, r: 15, c: '#ec7fa3', dark: '#b73a62' },
    { x: 66, y: 110, r: 13, c: '#fff1dc', dark: '#ecc1b3' },
  ]
  return (
    <svg viewBox="0 0 180 200" className={`rose-corner ${corner}`} aria-hidden="true">
      {[
        [70, 150, 40],
        [110, 140, -20],
        [30, 120, 70],
        [140, 186, 10],
        [10, 150, 100],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="22" ry="9" fill={LEAF} transform={`rotate(${r} ${x} ${y})`} opacity="0.9" />
      ))}
      {roses.map((o, i) => (
        <Rose key={i} {...o} rot={i * 40} delay={delay + i * 0.12} />
      ))}
      {[
        [104, 120],
        [140, 160],
        [52, 80],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#fff6e0" />
      ))}
    </svg>
  )
}

/* ---------------- Warm fairy lights hanging across the top ---------------- */
export function StringLights() {
  const n = 18
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n
    return [t * 1200, 30 + Math.sin(t * Math.PI) * 90]
  })
  return (
    <svg className="string-lights" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="warmBulb">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset="0.3" stopColor="rgba(255,214,150,0.9)" />
          <stop offset="1" stopColor="rgba(255,200,140,0)" />
        </radialGradient>
      </defs>
      <path d="M0 30Q600 210 1200 30" stroke="rgba(150,90,100,0.4)" strokeWidth="1.5" fill="none" />
      {pts.map(([x, y], i) => (
        <g key={i} className="warm-bulb" style={{ animationDelay: `${(i * 0.31) % 2.4}s` }}>
          <ellipse cx={x} cy={y + 10} rx="16" ry="16" fill="url(#warmBulb)" />
          <ellipse cx={x} cy={y + 10} rx="3.5" ry="4.5" fill="#fff3c4" />
        </g>
      ))}
    </svg>
  )
}

/* ---------------- Soft bokeh circles ---------------- */
export function Bokeh({ count = 18 }) {
  const [dots] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      s: 30 + Math.random() * 90,
      c: ['rgba(255,214,170,0.35)', 'rgba(244,166,193,0.3)', 'rgba(255,240,210,0.4)', 'rgba(221,190,240,0.28)'][i % 4],
      dur: 8 + Math.random() * 10,
      delay: -Math.random() * 10,
    })),
  )
  return (
    <div className="bokeh" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.s, height: d.s, background: d.c, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
  )
}

/* ---------------- A girl resting her chin on her hands, making a wish ---------------- */
export function WishingGirl({ size = 220, happy = false }) {
  const skin = '#f6cfb5'
  const skinShade = '#ebb796'
  const hair = '#6b3a2c'
  const hairLight = '#8a4f3b'
  const sweater = '#f4a3b8'
  const sweaterShade = '#e3879f'
  const ink = '#4a2a3e'
  return (
    <svg viewBox="0 0 220 250" width={size} height={size * (250 / 220)} className={`wishing-girl ${happy ? 'happy' : ''}`} aria-hidden="true">
      <g className="girl-body">
        {/* hair behind */}
        <path className="girl-hair-back" d="M58 112C42 40 178 40 162 112C172 150 178 190 170 236L50 236C42 190 48 150 58 112Z" fill={hair} />
        <path d="M150 120C162 160 166 196 160 230" stroke={hairLight} strokeWidth="3" fill="none" opacity="0.6" />
        {/* sweater / shoulders */}
        <path d="M30 250C30 212 62 192 110 192C158 192 190 212 190 250Z" fill={sweater} />
        <path d="M92 192Q110 204 128 192" stroke={sweaterShade} strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="99" y="160" width="22" height="36" rx="9" fill={skinShade} />

        {/* head */}
        <g className="girl-head">
          <ellipse cx="66" cy="124" rx="7" ry="10" fill={skin} />
          <ellipse cx="154" cy="124" rx="7" ry="10" fill={skin} />
          <ellipse cx="110" cy="120" rx="44" ry="48" fill={skin} />
          {/* fringe */}
          <path d="M64 118C58 70 98 54 128 62C152 68 164 92 158 120C150 98 134 86 114 90C94 92 76 102 64 118Z" fill={hair} />
          <path d="M100 66C92 80 88 92 86 102" stroke={hairLight} strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
          <g transform="translate(146 82)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-7" rx="5" ry="7" fill="#fbd3df" transform={`rotate(${a})`} />
            ))}
            <circle r="4" fill="#f4c76b" />
          </g>
          {/* eyes: closed while wishing, open & sparkly after */}
          {happy ? (
            <g>
              <ellipse cx="96" cy="126" rx="5" ry="6" fill={ink} />
              <ellipse cx="124" cy="126" rx="5" ry="6" fill={ink} />
              <circle cx="98" cy="123.5" r="2" fill="#fff" />
              <circle cx="126" cy="123.5" r="2" fill="#fff" />
            </g>
          ) : (
            <g>
              <path d="M88 126Q96 132 104 126M116 126Q124 132 132 126" stroke={ink} strokeWidth="2.6" fill="none" strokeLinecap="round" />
              <path d="M88 126l-3 3M104 126l2 3M116 126l-2 3M132 126l3 3" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
            </g>
          )}
          <path d="M84 112Q95 107 104 111M116 111Q125 107 136 112" stroke={hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <ellipse cx="84" cy="140" rx="9" ry="5.5" fill="#f08fae" opacity="0.5" />
          <ellipse cx="136" cy="140" rx="9" ry="5.5" fill="#f08fae" opacity="0.5" />
          {happy ? (
            <path d="M101 145Q110 154 119 145Q110 149 101 145Z" fill="#c9506f" />
          ) : (
            <path d="M103 146Q110 151 117 146" stroke="#c9506f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          )}
          {/* side locks over the shoulders */}
          <path d="M66 116C56 150 58 190 70 222C80 200 82 160 78 128Z" fill={hair} />
          <path d="M154 116C164 150 162 190 150 222C140 200 138 160 142 128Z" fill={hair} />
        </g>

        {/* arms in a V with hands clasped under the chin */}
        <path d="M44 250C52 214 72 190 98 172" stroke={sweater} strokeWidth="26" fill="none" strokeLinecap="round" />
        <path d="M176 250C168 214 148 190 122 172" stroke={sweater} strokeWidth="26" fill="none" strokeLinecap="round" />
        <path d="M60 236C66 214 80 196 96 184" stroke={sweaterShade} strokeWidth="3" fill="none" opacity="0.5" />
        <ellipse cx="101" cy="168" rx="13" ry="11" fill={skin} />
        <ellipse cx="119" cy="168" rx="13" ry="11" fill={skin} />
        <path d="M104 160v14M110 159v16M116 160v14" stroke={skinShade} strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* wish sparkles near her head */}
      <g className="wish-sparkles">
        <path d="M176 70l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#f4c76b" />
        <path d="M44 60l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#f4a6c1" />
        <path d="M188 120l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff1c9" />
      </g>
      {happy && (
        <g className="girl-hearts">
          <path d="M170 60c-7-4.5-9.5-8.5-8-11.5 1.5-3 5.5-3 8 0 2.5-3 6.5-3 8 0 1.5 3-1 7-8 11.5z" fill="#ec7fa3" />
          <path d="M52 76c-5-3-7-6-6-8 1-2 4-2 6 0 2-2 5-2 6 0 1 2-1 5-6 8z" fill="#f4a6c1" />
        </g>
      )}
    </svg>
  )
}
