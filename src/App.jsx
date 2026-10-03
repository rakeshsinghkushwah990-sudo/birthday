import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from './config'
import { AudioProvider, useAudio } from './hooks/AudioProvider'
import { ParallaxProvider } from './hooks/Parallax'
import { Loader, MusicPlayer, ProgressIndicator } from './components/ui/Controls'
import Welcome from './screens/Welcome'
import BirthdayWish from './screens/BirthdayWish'
import Conversations from './screens/Conversations'
import Engagement from './screens/Engagement'
import FutureDreams from './screens/FutureDreams'
import MysteryGift from './screens/MysteryGift'
import FinalMessage from './screens/FinalMessage'

const SCREENS = [Welcome, BirthdayWish, Conversations, Engagement, FutureDreams, MysteryGift, FinalMessage]
// Screens with dark backgrounds get light-coloured controls
const DARK = [false, false, false, true, false, true, true]

const pageVariants = {
  initial: { opacity: 0, scale: 1.04 },
  animate: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
}

// Preview helper while editing: add ?chapter=5 to the URL to jump straight to chapter 5
function initialStep() {
  const n = parseInt(new URLSearchParams(window.location.search).get('chapter'), 10)
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), SCREENS.length - 1) : 0
}

function Journey() {
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(initialStep)
  const [maxStep, setMaxStep] = useState(initialStep)
  const [run, setRun] = useState(0) // bumps on replay so every screen resets
  const { startOnInteraction } = useAudio()

  useEffect(() => {
    document.title = config.partnerName ? `${config.pageTitle} · ${config.partnerName}` : config.pageTitle
    const minDelay = new Promise((r) => setTimeout(r, 2200))
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const cap = new Promise((r) => setTimeout(r, 5000))
    Promise.race([Promise.all([minDelay, fonts]), cap]).then(() => setLoading(false))
  }, [])

  const go = useCallback((i) => {
    setStep(i)
    setMaxStep((m) => Math.max(m, i))
  }, [])

  const next = useCallback(() => go(Math.min(step + 1, SCREENS.length - 1)), [go, step])

  const restart = useCallback(() => {
    setRun((r) => r + 1)
    setStep(0)
  }, [])

  const Screen = SCREENS[step]
  const dark = DARK[step]

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" name={config.partnerName} line={config.loading.line} />}</AnimatePresence>

      {!loading && (
        <>
          <AnimatePresence mode="wait">
            <motion.div key={`${run}-${step}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ position: 'fixed', inset: 0 }}>
              <Screen
                onNext={next}
                onInteract={startOnInteraction}
                onRestart={restart}
              />
            </motion.div>
          </AnimatePresence>

          <ProgressIndicator step={step} total={SCREENS.length} chapters={config.chapters} dark={dark} onJump={go} maxStep={maxStep} />
          <MusicPlayer dark={dark} />
        </>
      )}
    </>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <ParallaxProvider>
        <Journey />
      </ParallaxProvider>
    </AudioProvider>
  )
}
