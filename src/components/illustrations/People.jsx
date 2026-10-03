import { motion } from 'framer-motion'
import './people.css'

const SKIN = '#e9b896'
const SKIN_SHADE = '#d9a07e'
const HAIR = '#2f1f2b'
const INK = '#4a2a3e'

/**
 * Cartoon character texting on a phone.
 * variant 'her' (long hair) | 'him' (short hair). `flip` mirrors it.
 */
export function TextingPerson({ variant = 'her', flip = false, size = 150, className = '' }) {
  const her = variant === 'her'
  const outfit = her ? '#c3b0ea' : '#ecc1b3'
  const outfitShade = her ? '#a993d8' : '#d9a491'
  return (
    <svg
      viewBox="0 0 160 200"
      width={size}
      height={size * 1.25}
      className={`texter ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <g className="texter-body">
        {/* long hair behind */}
        {her && (
          <path
            d="M44 96C36 44 124 44 116 96C120 120 122 142 117 160C104 164 98 152 96 132L64 132C62 152 56 164 43 160C38 142 40 120 44 96Z"
            fill={HAIR}
          />
        )}
        {/* torso */}
        <path d="M24 200C24 160 36 140 62 132L98 132C124 140 136 160 136 200Z" fill={outfit} />
        <path d="M68 132L80 150L92 132Z" fill={outfitShade} />
        {her && <path d="M38 200C46 170 52 150 64 134" stroke="#f4c76b" strokeWidth="5" fill="none" opacity="0.8" />}
        <rect x="70" y="112" width="20" height="24" rx="8" fill={SKIN_SHADE} />

        {/* head */}
        <g className="texter-head">
          <ellipse cx="49" cy="92" rx="6" ry="9" fill={SKIN} />
          <ellipse cx="111" cy="92" rx="6" ry="9" fill={SKIN} />
          {her && <circle cx="49" cy="103" r="3.5" fill="#f4c76b" />}
          {her && <circle cx="111" cy="103" r="3.5" fill="#f4c76b" />}
          <ellipse cx="80" cy="88" rx="31" ry="35" fill={SKIN} />
          {her ? (
            <path d="M48 86C48 56 70 48 90 54C106 58 114 72 112 88C102 74 90 68 76 72C64 74 54 80 48 86Z" fill={HAIR} />
          ) : (
            <path d="M48 84C44 52 70 44 84 48C104 46 118 60 112 86C108 70 98 64 82 66C66 64 54 72 48 84Z" fill={HAIR} />
          )}
          {her && <circle cx="80" cy="73" r="2.2" fill="#d9426e" />}
          {/* eyes looking down at phone, smiling */}
          <path d="M65 94Q70 98 75 94M85 94Q90 98 95 94" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M73 106Q80 112 87 106" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <ellipse cx="62" cy="103" rx="7" ry="4.5" fill="#f08fae" opacity="0.45" />
          <ellipse cx="98" cy="103" rx="7" ry="4.5" fill="#f08fae" opacity="0.45" />
        </g>

        {/* arms + phone */}
        <path d="M40 200C40 176 48 162 66 160" stroke={outfit} strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M120 200C120 176 112 162 94 160" stroke={outfit} strokeWidth="18" fill="none" strokeLinecap="round" />
        <rect x="66" y="140" width="28" height="46" rx="6" fill="#2b2440" />
        <rect x="69" y="144" width="22" height="36" rx="3" fill="#ffe8f1" className="texter-screen" />
        <path d="M80 168c-5-3-7-6-6-8 1-2 4-2 6 0 2-2 5-2 6 0 1 2-1 5-6 8z" fill="#ec7fa3" />
        <circle cx="66" cy="164" r="8" fill={SKIN} />
        <circle cx="94" cy="164" r="8" fill={SKIN} />
        <ellipse className="thumb thumb-l" cx="72" cy="158" rx="3.5" ry="5" fill={SKIN_SHADE} />
        <ellipse className="thumb thumb-r" cx="88" cy="158" rx="3.5" ry="5" fill={SKIN_SHADE} />
      </g>
    </svg>
  )
}

/**
 * Elegant couple silhouettes standing apart, reaching toward each other,
 * with a glowing heart floating between their hands.
 */
export function ReachingCouple({ className = '', joined = false }) {
  return (
    <svg viewBox="0 0 400 270" className={`couple ${joined ? 'joined' : ''} ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="silA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a5f9e" />
          <stop offset="1" stopColor="#4c2f63" />
        </linearGradient>
        <linearGradient id="silB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d5596" />
          <stop offset="1" stopColor="#36295a" />
        </linearGradient>
        <radialGradient id="betweenGlow">
          <stop offset="0" stopColor="rgba(255,214,229,0.95)" />
          <stop offset="0.4" stopColor="rgba(244,166,193,0.5)" />
          <stop offset="1" stopColor="rgba(244,166,193,0)" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="258" rx="180" ry="8" fill="rgba(20,10,40,0.25)" />

      {/* Her — saree silhouette */}
      <g className="couple-her">
        <circle cx="92" cy="58" r="16" fill="url(#silA)" />
        <circle cx="80" cy="48" r="9" fill="url(#silA)" />
        <path d="M80 78C88 74 98 74 106 78L104 118C102 128 98 134 96 140L118 252L62 252L82 140C80 132 78 120 80 78Z" fill="url(#silA)" />
        <path d="M84 80C104 100 112 150 116 252" stroke="rgba(255,214,229,0.45)" strokeWidth="2" fill="none" />
        <g className="couple-arm-her">
          <path d="M102 84C120 92 136 100 156 104" stroke="url(#silA)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="158" cy="104" r="5" fill="#7a5290" />
        </g>
      </g>

      {/* Him — kurta silhouette */}
      <g className="couple-him">
        <circle cx="310" cy="52" r="17" fill="url(#silB)" />
        <path d="M292 74C302 70 318 70 328 74L332 190L324 190L322 252L312 252L310 196L306 252L296 252L294 190L288 190Z" fill="url(#silB)" />
        <g className="couple-arm-him">
          <path d="M294 80C276 90 260 98 242 102" stroke="url(#silB)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="240" cy="102" r="5.5" fill="#5a4380" />
        </g>
      </g>

      {/* the space between — a glowing heart */}
      <g className="between">
        <circle cx="199" cy="100" r="34" fill="url(#betweenGlow)" />
        <path d="M199 116c-14-9-19-17-16-23 3-6 11-6 16 0 5-6 13-6 16 0 3 6-2 14-16 23z" fill="#ffd6e5" />
      </g>
      <path className="thread" d="M162 104Q199 86 236 102" stroke="rgba(255,214,229,0.7)" strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
    </svg>
  )
}

/** Two engagement rings that drift together; `glow` intensifies on tap. */
export function Rings({ glow = false, size = 240 }) {
  // ring A centre (105, 110), ring B centre (155, 110), r = 42
  const arc = (cx, cy, r, a0, a1) => {
    const p = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]
    const [x0, y0] = p(a0)
    const [x1, y1] = p(a1)
    return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`
  }
  return (
    <svg viewBox="20 20 220 160" width={size} className={`rings ${glow ? 'glow' : ''}`} aria-hidden="true">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff1c1" />
          <stop offset="0.35" stopColor="#f4c76b" />
          <stop offset="0.7" stopColor="#c98a3c" />
          <stop offset="1" stopColor="#ffe3a3" />
        </linearGradient>
        <linearGradient id="roseGold" x1="63" y1="68" x2="147" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe0d6" />
          <stop offset="0.4" stopColor="#ecc1b3" />
          <stop offset="0.75" stopColor="#c98b7f" />
          <stop offset="1" stopColor="#f6d2c6" />
        </linearGradient>
        <linearGradient id="diamond" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#dff1ff" />
          <stop offset="1" stopColor="#b8d8f5" />
        </linearGradient>
      </defs>
      <motion.g initial={{ x: -55, rotate: -12 }} animate={{ x: 0, rotate: 0 }} transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
        <circle cx="105" cy="110" r="42" stroke="url(#roseGold)" strokeWidth="10" fill="none" />
        <circle cx="105" cy="110" r="42" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" strokeDasharray="30 230" />
        {/* diamond */}
        <g transform="translate(105 64)">
          <path d="M-6 6L6 6L9 -2L0 -10L-9 -2Z" fill="#e8c9a0" />
          <path d="M-14 -16L14 -16L20 -8L0 12L-20 -8Z" fill="url(#diamond)" stroke="#fff" strokeWidth="1" />
          <path d="M-14 -16L-6 -8L0 -16L6 -8L14 -16M-20 -8L20 -8M-6 -8L0 12L6 -8" stroke="rgba(150,190,230,0.8)" strokeWidth="0.8" fill="none" />
          <circle className="diamond-glint" cx="-5" cy="-11" r="2.4" fill="#fff" />
        </g>
      </motion.g>
      <motion.g initial={{ x: 55, rotate: 12 }} animate={{ x: 0, rotate: 0 }} transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}>
        <circle cx="155" cy="110" r="42" stroke="url(#gold)" strokeWidth="10" fill="none" />
        <circle cx="155" cy="110" r="42" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" strokeDasharray="24 240" strokeDashoffset="-120" />
      </motion.g>
      {/* interlock: a slice of ring A drawn over ring B */}
      <motion.path
        d={arc(105, 110, 42, -72, -36)}
        stroke="url(#roseGold)"
        strokeWidth="10"
        fill="none"
        initial={{ x: -55, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.4, opacity: { delay: 2.2, duration: 0.6 } }}
      />
    </svg>
  )
}
