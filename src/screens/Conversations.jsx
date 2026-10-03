import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BatteryFull, ChevronLeft, ChevronRight, Phone, Send, Signal, Wifi, CheckCheck } from 'lucide-react'
import config from '../config'
import { scrollToEl } from '../hooks/scroll'
import { Parallax } from '../hooks/Parallax'
import { FloatingHearts, Twinkles, Clouds, HeartShape } from '../components/effects/Ambient'
import { TextingPerson } from '../components/illustrations/People'
import GlowButton from '../components/ui/GlowButton'
import { LottieHeart } from '../components/ui/LottieHeart'
import './conversations.css'

function TravelingHearts() {
  // Hearts that arc between the two phones, in both directions
  const hearts = [0, 1, 2, 3, 4, 5]
  return (
    <div className="travel-layer" aria-hidden="true">
      {hearts.map((i) => {
        const rtl = i % 2 === 1
        return (
          <motion.span
            key={i}
            className="travel-heart"
            initial={{ opacity: 0 }}
            animate={{
              left: rtl ? ['86%', '50%', '14%'] : ['14%', '50%', '86%'],
              top: ['58%', '4%', '58%'],
              scale: [0.4, 1.15, 0.4],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 3.4, repeat: Infinity, delay: i * 1.15, ease: 'easeInOut', times: [0, 0.5, 1] }}
          >
            <HeartShape size={22} color={rtl ? '#c3b0ea' : '#ec7fa3'} />
          </motion.span>
        )
      })}
    </div>
  )
}

export default function Conversations({ onNext }) {
  const t = config.conversations
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(null) // 'me' | 'you' | null
  const listRef = useRef(null)
  const actionsRef = useRef(null)
  const done = shown >= t.messages.length

  // Play the conversation: typing indicator, then the bubble
  useEffect(() => {
    if (shown >= t.messages.length) return
    const first = shown === 0
    const a = setTimeout(() => setTyping(t.messages[shown].side), first ? 1400 : 700)
    const b = setTimeout(
      () => {
        setTyping(null)
        setShown((s) => s + 1)
      },
      (first ? 1400 : 700) + 1500,
    )
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [shown, t.messages])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [shown, typing])

  useEffect(() => {
    if (!done) return
    const id = setTimeout(() => scrollToEl(actionsRef.current, 'center'), 900)
    return () => clearTimeout(id)
  }, [done])

  return (
    <div className="screen convo">
      <Parallax depth={0.5}>
        <Clouds count={4} opacity={0.6} />
      </Parallax>
      <Twinkles count={28} color="#fff" glow="rgba(221,208,245,1)" />
      <FloatingHearts count={10} colors={['#f4a6c1', '#c3b0ea', '#ddd0f5', '#f9c9da']} opacity={0.6} />

      <div className="screen-scroll">
        <div className="screen-content convo-content">
          <motion.h1 className="script-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            {t.title}
          </motion.h1>

          <div className="chat-stage">
            <div className="char-row">
              <motion.div className="char char-left" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                <TextingPerson variant="her" size={140} />
              </motion.div>
              <TravelingHearts />
              <motion.div className="char char-right" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 1 }}>
                <TextingPerson variant="him" flip size={140} />
              </motion.div>
            </div>

            <motion.div
              className="phone"
              initial={{ opacity: 0, y: 60, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 70, damping: 14 }}
            >
              <div className="phone-notch" />
              <div className="phone-status">
                <span>♥</span>
                <span className="phone-icons">
                  <Signal size={12} />
                  <Wifi size={12} />
                  <BatteryFull size={14} />
                </span>
              </div>
              <div className="chat-header">
                <ChevronLeft size={20} className="muted" />
                <div className="chat-avatar">
                  <LottieHeart size={40} />
                </div>
                <div className="chat-who">
                  <strong>{t.chatHeader}</strong>
                  <small>{typing ? 'typing…' : t.chatStatus}</small>
                </div>
                <Phone size={18} className="muted" />
              </div>

              <div className="chat-list" ref={listRef}>
                <div className="chat-day">Our story</div>
                {t.messages.slice(0, shown).map((m, i) => (
                  <motion.div
                    key={i}
                    className={`bubble ${m.side}`}
                    initial={{ opacity: 0, scale: 0.6, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    style={{ transformOrigin: m.side === 'me' ? '100% 100%' : '0% 100%' }}
                  >
                    {m.text}
                    {m.side === 'me' && <CheckCheck size={14} className="ticks" />}
                  </motion.div>
                ))}
                <AnimatePresence>
                  {typing && (
                    <motion.div
                      key="typing"
                      className={`bubble typing ${typing}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
                    >
                      <i />
                      <i />
                      <i />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="chat-input">
                <span>{done ? 'Forever to be continued…' : 'Type a message…'}</span>
                <span className="send">
                  <Send size={16} />
                </span>
              </div>
            </motion.div>
          </div>

          <div className="convo-actions" ref={actionsRef}>
            {done && (
              <GlowButton onClick={onNext} delay={0.6} icon={<ChevronRight size={20} />}>
                {t.next}
              </GlowButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
