import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import config from '../config'
import { scrollToEl } from '../hooks/scroll'
import { Parallax } from '../hooks/Parallax'
import { Fireflies, Twinkles } from '../components/effects/Ambient'
import { ConfettiBurst } from '../components/effects/CanvasEffects'
import { GardenScene } from '../components/illustrations/Scenes'
import RingMoment from '../components/illustrations/RingMoment'
import GlowButton from '../components/ui/GlowButton'
import './engagement.css'

export default function Engagement({ onNext }) {
  const t = config.engagement
  const [promised, setPromised] = useState(false)
  const [fire, setFire] = useState(0)
  const revealRef = useRef(null)

  // the ring has reached her finger
  const ringPlaced = () => {
    setFire((f) => f + 1)
    if (promised) return
    setPromised(true)
    setTimeout(() => scrollToEl(revealRef.current, 'center'), 900)
  }

  return (
    <div className="screen engage on-dark">
      <Parallax depth={0.35}>
        <GardenScene />
      </Parallax>
      <Twinkles count={40} color="#fff" glow="rgba(255,230,240,1)" area="top" sizes={[1.5, 3]} />
      <Fireflies count={30} />

      <div className="screen-scroll">
        <div className="screen-content engage-content">
          <motion.h1 className="script-title" initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.6 }}>
            {t.title}
          </motion.h1>

          <div className="engage-card">
            {t.paragraphs.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.9, duration: 1.1 }}>
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1.2 }} style={{ width: '100%' }}>
            <RingMoment hint={t.ringHint} replayLabel={t.replay} onDone={ringPlaced} />
          </motion.div>

          {config.engagementDate && <p className="engage-date">{config.engagementDate}</p>}

          <AnimatePresence>
            {promised && (
              <motion.div key="reveal" ref={revealRef} className="promise" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.p className="promise-line" initial={{ opacity: 0, y: 16, letterSpacing: '0.2em' }} animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }} transition={{ duration: 1.6 }}>
                  {t.ringReveal}
                </motion.p>
                <motion.div
                  className="forever"
                  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
                  animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                  transition={{ delay: 1.4, duration: 2.6, ease: [0.45, 0, 0.2, 1] }}
                >
                  {t.forever}
                </motion.div>
                <GlowButton onClick={onNext} delay={3.8} variant="gold" icon={<ChevronRight size={20} />}>
                  {t.next}
                </GlowButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfettiBurst fire={fire} origin={{ x: 0.5, y: 0.5 }} amount={110} style={{ zIndex: 20 }} />
    </div>
  )
}
