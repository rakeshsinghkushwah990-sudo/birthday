import { motion } from 'framer-motion'
import './giftbox.css'

/**
 * A real CSS-3D gift box whose lid flies open.
 * theme: 'pink' | 'midnight'
 */
export default function GiftBox3D({ size = 160, open = false, theme = 'pink', onClick, slow = false, children, label = 'Open the gift', shake = false }) {
  const s = size
  const lidAnim = open
    ? {
        y: -s * 1.1,
        x: s * 0.45,
        rotateZ: 28,
        rotateX: 30,
        opacity: [1, 1, 0],
        transition: { duration: slow ? 2.2 : 1.2, ease: [0.3, 0.7, 0.3, 1], opacity: { duration: slow ? 2.2 : 1.2, times: [0, 0.75, 1] } },
      }
    : { y: 0, x: 0, rotateZ: 0, rotateX: 0, opacity: 1 }

  return (
    <div
      className={`gift-scene theme-${theme} ${open ? 'is-open' : ''} ${shake && !open ? 'shake' : ''}`}
      style={{ '--s': `${s}px` }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? label : undefined}
      onKeyDown={(e) => onClick && (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className="gift-rays" />
      <div className="gift-content">{children}</div>
      <div className="gift-rot">
        <div className="gift-body">
          <div className="gf f-front" />
          <div className="gf f-back" />
          <div className="gf f-right" />
          <div className="gf f-left" />
          <div className="gf f-bottom" />
          <div className="gf f-light" />
        </div>
        <motion.div className="gift-lid" animate={lidAnim} initial={false}>
          <div className="lf l-front" />
          <div className="lf l-back" />
          <div className="lf l-right" />
          <div className="lf l-left" />
          <div className="lf l-top" />
          <Bow className="bow bow-a" />
          <Bow className="bow bow-b" />
        </motion.div>
      </div>
      <div className="gift-shadow" />
    </div>
  )
}

function Bow({ className }) {
  return (
    <svg className={className} viewBox="0 0 140 84" aria-hidden="true">
      <defs>
        <linearGradient id="bowg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--bow-a)' }} />
          <stop offset="1" style={{ stopColor: 'var(--bow-b)' }} />
        </linearGradient>
      </defs>
      <path d="M70 70C50 40 14 16 8 36C2 56 40 70 70 70Z" fill="url(#bowg)" />
      <path d="M70 70C90 40 126 16 132 36C138 56 100 70 70 70Z" fill="url(#bowg)" />
      <path d="M70 70C58 52 30 36 24 42" stroke="rgba(255,255,255,0.45)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M70 70C82 52 110 36 116 42" stroke="rgba(255,255,255,0.45)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="70" cy="70" rx="12" ry="10" style={{ fill: 'var(--bow-b)' }} />
      <ellipse cx="67" cy="67" rx="4" ry="3" fill="rgba(255,255,255,0.5)" />
    </svg>
  )
}
