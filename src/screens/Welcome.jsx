import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../config'
import { Parallax } from '../hooks/Parallax'
import { Clouds, FloatingHearts, Twinkles, HeartShape } from '../components/effects/Ambient'
import GiftBox3D from '../components/illustrations/GiftBox3D'
import TeddyBear from '../components/illustrations/TeddyBear'
import GlowButton from '../components/ui/GlowButton'
import { LottieSparkles } from '../components/ui/LottieHeart'
import './welcome.css'

export default function Welcome({ onNext, onInteract }) {
  const [opening, setOpening] = useState(false)
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000
  const giftSize = Math.round(Math.min(170, vw * 0.34))
  const bearSize = Math.round(Math.min(130, vw * 0.27))
  const t = config.welcome

  const [burst] = useState(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2 + Math.random() * 0.3
        const d = 140 + Math.random() * 160
        return { x: Math.cos(a) * d, y: Math.sin(a) * d - 120, s: 14 + Math.random() * 22, r: Math.random() * 60 - 30 }
      }),
  )

  const open = () => {
    if (opening) return
    onInteract?.() // first interaction → background music may start
    setOpening(true)
    setTimeout(onNext, 2600)
  }

  return (
    <div className="screen welcome">
      <Parallax depth={0.5}>
        <div className="welcome-glow" />
        <Clouds count={6} />
      </Parallax>
      <Parallax depth={1.3}>
        <Twinkles count={46} color="#ffffff" glow="rgba(255,214,229,1)" />
      </Parallax>
      <FloatingHearts count={18} />

      <div className="screen-scroll">
        <div className="screen-content welcome-content">
          <motion.h1
            className="script-title welcome-title"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.title}
          </motion.h1>
          <motion.p className="serif-lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1.2 }}>
            {t.message}
          </motion.p>

          <motion.div className="welcome-stage" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, type: 'spring', stiffness: 80, damping: 14 }}>
            <div className="welcome-bear">
              <TeddyBear size={bearSize} pose="heart" />
            </div>
            <div className="welcome-gift">
              <LottieSparkles size={giftSize * 1.6} className="welcome-sparkles" />
              <GiftBox3D size={giftSize} open={opening} onClick={open} label="Open your surprise" />
              <AnimatePresence>
                {opening &&
                  burst.map((b, i) => (
                    <motion.span
                      key={i}
                      className="welcome-burst"
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                      animate={{ x: b.x, y: b.y, scale: 1, opacity: [1, 1, 0], rotate: b.r }}
                      transition={{ duration: 1.8, delay: 0.35 + i * 0.02, ease: [0.2, 0.8, 0.3, 1] }}
                    >
                      <HeartShape size={b.s} color={i % 3 ? '#ec7fa3' : '#f4c76b'} />
                    </motion.span>
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <GlowButton onClick={open} delay={1.6} disabled={opening}>
            {t.button}
          </GlowButton>
        </div>
      </div>

      <AnimatePresence>
        {opening && (
          <motion.div
            className="welcome-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 2.6, times: [0, 0.55, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
