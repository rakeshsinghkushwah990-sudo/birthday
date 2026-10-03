import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import './illustrations.css'

/* ---------------- Cake ---------------- */
function drips(x0, x1, y, n, lens) {
  const w = (x1 - x0) / n
  let d = `M${x0},${y - 6} L${x0},${y + 4}`
  for (let i = 0; i < n; i++) {
    const cx = x0 + w * i
    const L = lens[i % lens.length]
    d += ` C${cx + w * 0.12},${y + 4} ${cx + w * 0.22},${y + 4 + L} ${cx + w * 0.5},${y + 4 + L}`
    d += ` C${cx + w * 0.78},${y + 4 + L} ${cx + w * 0.88},${y + 4} ${cx + w},${y + 4}`
  }
  return d + ` L${x1},${y - 6} Z`
}

export function Cake({ blown = false, onClick, size = 260 }) {
  const candles = [104, 130, 156]
  return (
    <motion.div
      className={`cake ${blown ? 'blown' : ''}`}
      style={{ width: size }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Birthday cake — tap to blow out the candles"
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      whileHover={!blown ? { scale: 1.03, rotate: -1 } : {}}
      whileTap={!blown ? { scale: 0.97 } : {}}
    >
      <div className="cake-glow" />
      <svg viewBox="0 0 260 260" width="100%" aria-hidden="true">
        <defs>
          <linearGradient id="tier1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f9c9da" />
            <stop offset="1" stopColor="#ec8fae" />
          </linearGradient>
          <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e7dbf8" />
            <stop offset="1" stopColor="#bba4e6" />
          </linearGradient>
          <linearGradient id="tier3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff8f0" />
            <stop offset="1" stopColor="#f3dcc6" />
          </linearGradient>
          <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff6c9" />
            <stop offset="0.5" stopColor="#ffc94d" />
            <stop offset="1" stopColor="#ff7a3d" />
          </linearGradient>
          <radialGradient id="flameGlow">
            <stop offset="0" stopColor="rgba(255,214,120,0.85)" />
            <stop offset="1" stopColor="rgba(255,214,120,0)" />
          </radialGradient>
        </defs>

        {/* plate */}
        <ellipse cx="130" cy="240" rx="118" ry="15" fill="#ffffff" />
        <ellipse cx="130" cy="237" rx="104" ry="10" fill="#f6e9f1" />

        {/* bottom tier */}
        <rect x="30" y="168" width="200" height="70" rx="14" fill="url(#tier1)" />
        <ellipse cx="130" cy="168" rx="100" ry="14" fill="#fbd3e1" />
        <path d={drips(30, 230, 168, 8, [14, 22, 10, 26, 16, 12, 24, 18])} fill="#fff6f8" />
        {[48, 72, 96, 120, 144, 168, 192, 214].map((x) => (
          <circle key={x} cx={x} cy="226" r="4.2" fill="#fff" opacity="0.9" />
        ))}

        {/* middle tier */}
        <rect x="56" y="118" width="148" height="56" rx="12" fill="url(#tier2)" />
        <ellipse cx="130" cy="118" rx="74" ry="11" fill="#efe6fb" />
        <path d={drips(56, 204, 118, 6, [12, 20, 9, 18, 14, 22])} fill="#fff8f0" />
        {[82, 130, 178].map((x) => (
          <path key={x} d={`M${x} 162c-9-6-12-11-10-15 2-4 7-4 10 0 3-4 8-4 10 0 2 4-1 9-10 15z`} fill="#e46b8f" />
        ))}

        {/* top tier */}
        <rect x="82" y="78" width="96" height="46" rx="10" fill="url(#tier3)" />
        <ellipse cx="130" cy="78" rx="48" ry="8" fill="#fffaf4" />
        <path d={drips(82, 178, 78, 5, [9, 15, 7, 13, 10])} fill="#f4a6c1" />

        {/* candles */}
        {candles.map((x, i) => (
          <g key={x}>
            <rect x={x - 4} y="44" width="8" height="36" rx="3" fill="#fff" />
            <path d={`M${x - 4} 52l8-5M${x - 4} 62l8-5M${x - 4} 72l8-5`} stroke="#f4a6c1" strokeWidth="2.4" />
            <line x1={x} y1="44" x2={x} y2="38" stroke="#5b3640" strokeWidth="1.6" />
            <g className="flame-wrap" style={{ transformOrigin: `${x}px 40px`, animationDelay: `${i * 0.13}s` }}>
              <circle cx={x} cy="28" r="20" fill="url(#flameGlow)" className="flame-glow" />
              <path className="flame" d={`M${x} 14C${x + 7} 24 ${x + 7} 34 ${x} 38C${x - 7} 34 ${x - 7} 24 ${x} 14Z`} fill="url(#flame)" />
            </g>
          </g>
        ))}
      </svg>

      <AnimatePresence>
        {blown &&
          candles.map((x, i) => (
            <motion.span
              key={x}
              className="smoke"
              style={{ left: `${(x / 260) * 100}%`, top: `${(30 / 260) * 100}%` }}
              initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -60, scale: 1.8, x: (i - 1) * 8 }}
              transition={{ duration: 2, delay: i * 0.1, ease: 'easeOut' }}
            />
          ))}
      </AnimatePresence>
    </motion.div>
  )
}

/* ---------------- Balloons ---------------- */
const BALLOON_COLORS = ['#f4a6c1', '#c3b0ea', '#f4c76b', '#ec7fa3', '#ecc1b3', '#9fd9c8', '#d9557c']

export function Balloons({ count = 7 }) {
  const [list] = useState(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i / count) * 100 + Math.random() * 8,
        size: 46 + Math.random() * 30,
        dur: 16 + Math.random() * 12,
        delay: -Math.random() * 26,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        sway: 2 + Math.random() * 2,
      })),
  )
  return (
    <div className="fx-layer" aria-hidden="true">
      {list.map((b, i) => (
        <div key={i} className="balloon" style={{ left: `${b.left}%`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}>
          <svg viewBox="0 0 60 130" width={b.size} style={{ animationDuration: `${b.sway}s` }} className="balloon-sway">
            <path d="M30 2C14 2 4 16 4 32C4 52 20 66 30 70C40 66 56 52 56 32C56 16 46 2 30 2Z" fill={b.color} />
            <path d="M26 70L30 76L34 70Z" fill={b.color} />
            <ellipse cx="20" cy="22" rx="6" ry="10" fill="rgba(255,255,255,0.45)" transform="rotate(20 20 22)" />
            <path d="M30 76C24 90 36 102 28 116C24 124 30 128 30 130" stroke="rgba(120,80,110,0.45)" strokeWidth="1.2" fill="none" />
          </svg>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Bunting banner ---------------- */
const FLAG_COLORS = ['#f4a6c1', '#c3b0ea', '#f4c76b', '#ecc1b3', '#ec7fa3']

export function Banner({ text = 'HAPPY BIRTHDAY' }) {
  const words = text.split(' ')
  let k = 0
  return (
    <div className="banner" aria-label={text}>
      {words.map((w, wi) => (
        <div className="banner-row" key={wi}>
          <svg className="banner-string" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 1Q50 12 100 1" stroke="rgba(150,90,120,0.5)" strokeWidth="0.6" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          {w.split('').map((ch, i) => {
            const n = w.length
            const t = n > 1 ? i / (n - 1) : 0.5
            const sag = Math.sin(t * Math.PI) * 14
            const idx = k++
            return (
              <motion.span
                key={i}
                className="flag"
                style={{ '--c': FLAG_COLORS[idx % FLAG_COLORS.length], marginTop: sag }}
                initial={{ y: -60, opacity: 0, rotate: -20 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 + idx * 0.06, type: 'spring', stiffness: 180, damping: 12 }}
              >
                <span className="flag-inner" style={{ animationDelay: `${idx * 0.15}s` }}>
                  {ch}
                </span>
              </motion.span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/* ---------------- Flowers ---------------- */
export function Flower({ size = 70, color = '#f4a6c1', center = '#f4c76b', delay = 0, className = '', style, petals = 6 }) {
  return (
    <motion.svg
      viewBox="-50 -50 100 150"
      width={size}
      height={size * 1.5}
      className={`flower ${className}`}
      style={style}
      initial={{ scale: 0, rotate: -40, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 90, damping: 11 }}
      aria-hidden="true"
    >
      <path d="M0 10C2 50-4 75 0 100" stroke="#7fb59a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M0 60C14 48 30 50 36 56C26 66 12 66 0 60Z" fill="#9fd0b5" />
      <path d="M0 78C-14 66-30 68-34 74C-24 84-10 84 0 78Z" fill="#8cc5a6" />
      <g className="flower-head">
        {Array.from({ length: petals }, (_, i) => (
          <ellipse key={i} cx="0" cy="-22" rx="14" ry="24" fill={color} opacity="0.92" transform={`rotate(${(360 / petals) * i})`} />
        ))}
        {Array.from({ length: petals }, (_, i) => (
          <ellipse key={`in${i}`} cx="0" cy="-12" rx="7" ry="12" fill="rgba(255,255,255,0.35)" transform={`rotate(${(360 / petals) * i + 30})`} />
        ))}
        <circle r="11" fill={center} />
        <circle r="5" cx="-3" cy="-3" fill="rgba(255,255,255,0.5)" />
      </g>
    </motion.svg>
  )
}
