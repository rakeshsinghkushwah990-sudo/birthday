import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronsDown, Heart, Sparkles } from 'lucide-react'
import config from '../config'
import { scrollToEl } from '../hooks/scroll'
import { HeartShape } from '../components/effects/Ambient'
import GlowButton from '../components/ui/GlowButton'
import './future.css'

function Doodles({ flip }) {
  // hand-drawn hearts + a blossom sprig in the text panel corner
  return (
    <svg className={`fslide-doodle ${flip ? 'flip' : ''}`} viewBox="0 0 160 120" aria-hidden="true">
      <path d="M118 30c-6-8-18-6-18 4 0 8 12 14 18 22 6-8 18-14 18-22 0-10-12-12-18-4z" stroke="#f08fae" strokeWidth="2" fill="none" />
      <path d="M92 52c-4-5-11-4-11 2 0 5 7 8 11 13 4-5 11-8 11-13 0-6-7-7-11-2z" stroke="#f4a6c1" strokeWidth="1.6" fill="none" />
      <g opacity="0.75">
        {[
          [130, 96, 9],
          [148, 84, 7],
          [114, 108, 6],
          [146, 108, 8],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="#fbd3df" />
            <circle cx={x} cy={y} r={r * 0.35} fill="#f4a6c1" />
          </g>
        ))}
      </g>
    </svg>
  )
}

// A painted picture with a slow zoom, drifting hearts and a warm glow when revealed
function Painting({ src, focus = '50%', on = false, alt = '', eager = false }) {
  const hearts = [
    [18, 70, 14, 0],
    [36, 40, 10, 1.4],
    [62, 64, 12, 0.7],
    [80, 34, 9, 2.1],
    [50, 20, 11, 2.8],
  ]
  return (
    <div className={`painting ${on ? 'on' : ''}`}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: String(focus).includes(' ') ? focus : `${focus} 50%` }} />
      <div className="painting-glow" />
      <div className="painting-hearts" aria-hidden="true">
        {hearts.map(([l, t, s, d], i) => (
          <span key={i} style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${d}s` }}>
            <HeartShape size={on ? s * 1.4 : s} color={i % 2 ? '#ffd6e5' : '#ff9fbf'} />
          </span>
        ))}
      </div>
    </div>
  )
}

function FirstSlide({ item, index, total, label }) {
  const [on, setOn] = useState(false)
  const flip = index % 2 === 1
  return (
    <motion.article
      className={`fslide ${flip ? 'flip' : ''}`}
      initial={{ opacity: 0, x: flip ? 90 : -90 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="fslide-art">
        <Painting src={item.image} focus={item.focus} on={on} alt={item.title} />
      </div>
      <div className="fslide-text">
        <Doodles flip={flip} />
        <span className="fslide-num">
          <Heart size={13} fill="currentColor" /> {index + 1}/{total}
        </span>
        <h3>{item.title}</h3>
        {item.message && <p>{item.message}</p>}
        <AnimatePresence mode="wait">
          {!on ? (
            <motion.button key="btn" type="button" className="fslide-reveal" onClick={() => setOn(true)} exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}>
              <Sparkles size={17} className="fslide-reveal-spark" />
              <span>{label}</span>
              <Heart size={14} fill="currentColor" className="fslide-reveal-heart" />
            </motion.button>
          ) : (
            <motion.div key="secret" className="fslide-secret" initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}>
              <span className="fslide-burst" aria-hidden="true">
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.span
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                    animate={{ x: Math.cos((i / 8) * 6.28) * 60, y: Math.sin((i / 8) * 6.28) * 36 - 20, opacity: 0, scale: 1 }}
                    transition={{ duration: 1.3, ease: 'easeOut' }}
                  >
                    <HeartShape size={12} color={i % 2 ? '#f4a6c1' : '#ec7fa3'} />
                  </motion.span>
                ))}
              </span>
              {item.reveal}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export default function FutureDreams({ onNext }) {
  const t = config.future
  const scrollDown = (e) => scrollToEl(e.currentTarget.closest('.screen-scroll')?.querySelector('.fslide'), 'start')

  return (
    <div className="screen future">
      <div className="future-paper" />
      <div className="screen-scroll">
        <div className="firsts-wrap">
          {/* hero banner */}
          <motion.section className="fh" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
            <div className="fh-art">
              <Painting src={t.heroImage} focus={t.heroFocus} alt="" eager />
            </div>
            <div className="fh-shade" />
            <div className="fh-text">
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}>
                {t.title} <span className="fh-heart">♡</span>
              </motion.h1>
            </div>
            <motion.div className="fh-note" initial={{ opacity: 0, rotate: -14 }} animate={{ opacity: 1, rotate: -8 }} transition={{ delay: 1.3, duration: 1 }}>
              {t.note}
              <svg viewBox="0 0 120 30" aria-hidden="true">
                <path d="M4 20C30 6 50 26 70 14C80 8 90 6 96 14M96 14c-3-4-9-3-9 2 0 4 6 7 9 10 3-3 9-6 9-10 0-5-6-6-9-2z" stroke="#fff" strokeWidth="1.6" fill="none" />
              </svg>
            </motion.div>
            <button type="button" className="fh-down" onClick={scrollDown} aria-label="Scroll to the first slide">
              <ChevronsDown size={22} />
            </button>
          </motion.section>

          {t.items.map((item, i) => (
            <FirstSlide key={item.title} item={item} index={i} total={t.items.length} label={t.revealLabel} />
          ))}

          {/* continue */}
          <div className="ff-next">
            <GlowButton onClick={onNext} delay={0.2} icon={<ChevronRight size={20} />}>
              {t.next}
            </GlowButton>
          </div>
        </div>
      </div>
    </div>
  )
}
