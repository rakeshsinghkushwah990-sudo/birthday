import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'
import config from '../config'
import { scrollToEl } from '../hooks/scroll'
import { Parallax } from '../hooks/Parallax'
import { DriftConfetti, Twinkles, FloatingHearts } from '../components/effects/Ambient'
import { ConfettiBurst } from '../components/effects/CanvasEffects'
import { Cake } from '../components/illustrations/Celebration'
import { ArchBanner, BalloonBunch, Bokeh, RoseCorner, StringLights } from '../components/illustrations/BirthdayScene'
import GlowButton from '../components/ui/GlowButton'
import { LottieSparkles } from '../components/ui/LottieHeart'
import './birthday.css'

export default function BirthdayWish({ onNext }) {
  const t = config.birthday
  const [blown, setBlown] = useState(false)
  const [showWish, setShowWish] = useState(false)
  const [fire, setFire] = useState(0)
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.6 })
  const wishRef = useRef(null)
  const cakeRef = useRef(null)
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000
  const small = vw < 640
  const cakeSize = small ? Math.min(230, vw * 0.6) : 285

  const blow = () => {
    if (blown) return
    const r = cakeRef.current?.getBoundingClientRect()
    if (r) setOrigin({ x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height * 0.15) / window.innerHeight })
    setBlown(true)
    setTimeout(() => setFire((f) => f + 1), 650)
    setTimeout(() => setFire((f) => f + 1), 1250)
    setTimeout(() => {
      setShowWish(true)
      setTimeout(() => scrollToEl(wishRef.current, 'center'), 300)
    }, 1600)
  }

  return (
    <div className="screen birthday">
      <Parallax depth={0.4}>
        <Bokeh count={small ? 12 : 20} />
      </Parallax>
      <StringLights />
      <Twinkles count={24} color="#f4c76b" glow="rgba(255,220,140,0.9)" />
      <DriftConfetti count={14} />
      {blown && <FloatingHearts count={12} />}

      <BalloonBunch side="left" />
      <BalloonBunch side="right" colors={['#f9c98a', '#f4a6c1', '#ec7fa3']} />
      <RoseCorner corner="bl" delay={0.8} />
      <RoseCorner corner="br" delay={1} />
      {!small && <RoseCorner corner="tl" delay={1.2} />}
      {!small && <RoseCorner corner="tr" delay={1.3} />}

      <div className="screen-scroll">
        <div className="screen-content birthday-content">
          <ArchBanner text={t.banner} />
          {config.birthdayDate && (
            <motion.div className="date-badge" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}>
              {config.birthdayDate}
            </motion.div>
          )}

          <motion.h1 className="script-title birthday-title" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1.1 }}>
            {t.title}
          </motion.h1>

          <div className="birthday-message">
            {t.paragraphs.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.6, duration: 1 }}>
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div className="wish-scene" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <div className="scene-glow" />
            <div className="scene-table" />
            <div className="scene-cake" ref={cakeRef}>
              <Cake blown={blown} onClick={blow} size={cakeSize} />
              {blown && <LottieSparkles size={cakeSize * 1.1} className="cake-sparkles" />}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!blown && (
              <motion.button
                key="hint"
                type="button"
                className="cake-pill"
                onClick={blow}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ delay: 2.2 }}
              >
                <Sparkles size={15} /> {t.cakeHint}
              </motion.button>
            )}
          </AnimatePresence>

          {showWish && (
            <div ref={wishRef} className="wish-next">
              <GlowButton onClick={onNext} delay={0.3} icon={<ChevronRight size={20} />}>
                {t.next}
              </GlowButton>
            </div>
          )}
        </div>
      </div>

      <ConfettiBurst fire={fire} origin={origin} style={{ zIndex: 20 }} />
    </div>
  )
}
