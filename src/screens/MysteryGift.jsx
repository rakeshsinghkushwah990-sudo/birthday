import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../config'
import { scrollToEl } from '../hooks/scroll'
import { Parallax } from '../hooks/Parallax'
import { Fireflies, Twinkles } from '../components/effects/Ambient'
import { StarrySky } from '../components/illustrations/Scenes'
import GiftBox3D from '../components/illustrations/GiftBox3D'
import GlowButton from '../components/ui/GlowButton'
import { LottieHeart, LottieSparkles } from '../components/ui/LottieHeart'
import './mystery.css'

const LINE_GAP = 1.9 // seconds between note lines

// Gradient text turns emojis into flat silhouettes, so keep emojis in their own span
const EMOJI = /(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)/u
function ShinyText({ text, className }) {
  // group: [plain text] [last word + emojis kept together on one line]
  const parts = text.split(EMOJI).filter(Boolean)
  const out = []
  for (let i = 0; i < parts.length; i++) {
    if (!EMOJI.test(parts[i])) {
      const next = parts[i + 1]
      if (next && EMOJI.test(next)) {
        const m = parts[i].match(/^(.*?)(\S*\s*)$/s)
        if (m[1]) out.push(<span key={`t${i}`} className={className}>{m[1]}</span>)
        let emojis = ''
        let j = i + 1
        while (j < parts.length && (EMOJI.test(parts[j]) || /^\s+$/.test(parts[j]))) emojis += parts[j++]
        out.push(
          <span key={`g${i}`} style={{ whiteSpace: 'nowrap' }}>
            <span className={className}>{m[2]}</span>
            <span className="emoji">{emojis.trim()}</span>
          </span>
        )
        i = j - 1
      } else out.push(<span key={`t${i}`} className={className}>{parts[i]}</span>)
    } else out.push(<span key={`e${i}`} className="emoji">{parts[i]}</span>)
  }
  return out
}

export default function MysteryGift({ onNext }) {
  const t = config.mystery
  const [opened, setOpened] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const msgRef = useRef(null)
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000
  const size = Math.round(Math.min(170, vw * 0.38))

  const open = () => {
    if (opened) return
    setOpened(true)
    setTimeout(() => {
      setRevealed(true)
      setTimeout(() => scrollToEl(msgRef.current, 'center'), 400)
    }, 3200)
  }

  return (
    <div className={`screen mystery on-dark ${opened ? 'is-open' : ''}`}>
      <div className="mystery-dusk" />
      <div className="mystery-night">
        <Parallax depth={0.6}>
          <StarrySky density={80} />
        </Parallax>
      </div>
      {!opened && <Twinkles count={24} color="#ffe3a3" glow="rgba(255,220,140,0.9)" />}
      {opened && <Fireflies count={36} />}

      <div className="screen-scroll">
        <div className="screen-content mystery-content">
          <motion.p
            className="mystery-teaser"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: opened ? 0.8 : 1, y: 0, scale: opened ? 0.92 : 1 }}
            transition={{ duration: 1.2 }}
          >
            <ShinyText text={t.teaser} className="shiny" />
          </motion.p>

          <div className="mystery-stage">
            {!opened &&
              ['?', '?', '?', '✦', '?'].map((q, i) => (
                <span key={i} className={`qmark q${i}`} aria-hidden="true">
                  {q}
                </span>
              ))}
            <GiftBox3D size={size} theme="midnight" open={opened} onClick={open} slow shake label="Open the mystery gift">
              <motion.div
                className="rising-heart"
                initial={{ y: 0, scale: 0.2, opacity: 0 }}
                animate={opened ? { y: -size * 1.15, scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.1, duration: 2.4, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="rising-glow" />
                <LottieHeart size={Math.round(size * 0.8)} />
              </motion.div>
            </GiftBox3D>
            {opened && <LottieSparkles size={size * 2} className="mystery-sparkles" />}
          </div>

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.p key="hint" className="hint" initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} exit={{ opacity: 0, transition: { duration: 0.25 } }} transition={{ delay: 1.5, duration: 2.2, repeat: Infinity }}>
                {t.hint}
              </motion.p>
            ) : (
              revealed && (
                <motion.div
                  key="msg"
                  ref={msgRef}
                  className={`mystery-msg ${t.paragraphs.length || t.wishLine ? '' : 'is-empty'}`}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {(t.paragraphs.length > 0 || t.wishLine) && (
                    <>
                      <span className="note-corner tl" aria-hidden="true">✦</span>
                      <span className="note-corner tr" aria-hidden="true">♥</span>
                      <span className="note-corner bl" aria-hidden="true">♥</span>
                      <span className="note-corner br" aria-hidden="true">✦</span>
                      <motion.div className="note-ribbon" aria-hidden="true" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.4, type: 'spring', stiffness: 220, damping: 12 }}>
                        💌
                      </motion.div>
                    </>
                  )}
                  {t.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.6 + i * LINE_GAP, duration: 1.4 }}
                    >
                      {p}
                    </motion.p>
                  ))}
                  {t.wishLine && (
                    <motion.p
                      className="note-wish"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + t.paragraphs.length * LINE_GAP, duration: 1.2, type: 'spring', stiffness: 120, damping: 12 }}
                    >
                      <ShinyText text={t.wishLine} className="shiny" />
                    </motion.p>
                  )}
                  <GlowButton onClick={onNext} delay={0.6 + (t.paragraphs.length + (t.wishLine ? 1 : 0)) * LINE_GAP + 0.4} variant="gold">
                    {t.button}
                  </GlowButton>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
