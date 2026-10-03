import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play, Volume2, VolumeX, Heart } from 'lucide-react'
import { useAudio } from '../../hooks/AudioProvider'
import { LottieHeart } from './LottieHeart'
import './controls.css'

export function MusicPlayer({ dark }) {
  const { musicPlaying, muted, toggleMusic, toggleMute } = useAudio()
  return (
    <motion.div
      className={`music-player ${dark ? 'dark' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <span className={`music-disc ${musicPlaying && !muted ? 'spin' : ''}`} aria-hidden="true">
        <Music size={16} />
      </span>
      <span className={`eq ${musicPlaying && !muted ? 'on' : ''}`} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <button type="button" onClick={toggleMusic} aria-label={musicPlaying ? 'Pause music' : 'Play music'} title={musicPlaying ? 'Pause music' : 'Play music'}>
        {musicPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} title={muted ? 'Unmute' : 'Mute'}>
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </motion.div>
  )
}

export function ProgressIndicator({ step, total, chapters, dark, onJump, maxStep }) {
  const pct = total > 1 ? (step / (total - 1)) * 100 : 0
  return (
    <div className={`journey ${dark ? 'dark' : ''}`} aria-label={`Chapter ${step + 1} of ${total}: ${chapters[step]}`}>
      <div className="journey-track">
        <motion.div className="journey-fill" animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
        {chapters.map((c, i) => (
          <button
            type="button"
            key={c}
            className={`journey-dot ${i <= step ? 'done' : ''} ${i === step ? 'current' : ''}`}
            style={{ left: `${(i / (total - 1)) * 100}%` }}
            onClick={() => i <= maxStep && onJump(i)}
            disabled={i > maxStep}
            aria-label={`Go to ${c}`}
            title={i <= maxStep ? c : 'Not yet…'}
          />
        ))}
        <motion.div className="journey-heart" animate={{ left: `${pct}%` }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <Heart size={16} fill="currentColor" />
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={step} className="journey-label" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}>
          {step + 1} / {total} · {chapters[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function Loader({ name, line }) {
  return (
    <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.8 }}>
      <div className="loader-ring">
        <LottieHeart size={130} />
      </div>
      <motion.p className="loader-line" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {line}
      </motion.p>
      {name && (
        <motion.p className="loader-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          for {name}
        </motion.p>
      )}
      <div className="loader-bar">
        <span />
      </div>
    </motion.div>
  )
}
