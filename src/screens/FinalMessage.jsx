import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, FastForward } from 'lucide-react'
import config from '../config'
import { scrollToEl } from '../hooks/scroll'
import { Parallax } from '../hooks/Parallax'
import { FloatingHearts, RosePetals } from '../components/effects/Ambient'
import { Fireworks } from '../components/effects/CanvasEffects'
import { StarrySky } from '../components/illustrations/Scenes'
import GlowButton from '../components/ui/GlowButton'
import { LottieHeart } from '../components/ui/LottieHeart'
import './final.css'

export default function FinalMessage({ onRestart }) {
  const t = config.final
  const total = t.lines.length
  const [count, setCount] = useState(0)
  const [ending, setEnding] = useState(false)
  const lastRef = useRef(null)
  const endRef = useRef(null)
  const done = count >= total

  // Reveal the letter one line at a time
  useEffect(() => {
    if (done) {
      const id = setTimeout(() => setEnding(true), 1400)
      return () => clearTimeout(id)
    }
    // longer lines get more reading time before the next one appears
    const prev = count > 0 ? t.lines[count - 1] : ''
    const wait = count === 0 ? 1200 : Math.max(t.lineDelayMs, prev.length * (t.msPerChar ?? 0))
    const id = setTimeout(() => setCount((c) => c + 1), wait)
    return () => clearTimeout(id)
  }, [count, done, t.lineDelayMs, t.msPerChar, t.lines])

  useEffect(() => {
    if (count > 1) scrollToEl(lastRef.current, 'center')
  }, [count])

  useEffect(() => {
    if (ending) setTimeout(() => scrollToEl(endRef.current, 'center'), 500)
  }, [ending])

  const isHeading = (i) => i === 0 || i === total - 1

  return (
    <div className="screen final on-dark">
      <Parallax depth={0.5}>
        <StarrySky density={110} />
      </Parallax>
      <RosePetals count={18} />
      <FloatingHearts count={10} colors={['#f4a6c1', '#ffd6e5', '#c3b0ea']} opacity={0.35} />
      <Fireworks active={ending} style={{ zIndex: 4 }} />

      <div className="screen-scroll">
        <div className="screen-content final-content">
          <div className="final-letter">
            {t.lines.slice(0, count).map((line, i) => (
              <motion.p
                key={i}
                ref={i === count - 1 ? lastRef : null}
                className={isHeading(i) ? 'final-heading' : 'final-line'}
                initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <AnimatePresence>
            {ending && (
              <motion.div ref={endRef} className="final-end" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
                <LottieHeart size={92} />
                <p className="final-closing">{t.closing}</p>
                <div className="final-actions">
                  <GlowButton onClick={onRestart} delay={1.2} variant="gold" icon={<RotateCcw size={18} />}>
                    {t.replay}
                  </GlowButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!done && count > 0 && (
            <motion.button type="button" className="final-skip" onClick={() => setCount(total)} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 4 }}>
              <FastForward size={14} /> {t.skip}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
