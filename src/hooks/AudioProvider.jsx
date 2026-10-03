import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import config from '../config'
import { asset } from './asset'

const AudioCtx = createContext(null)
export const useAudio = () => useContext(AudioCtx)

function fadeVolume(audio, to, ms = 600) {
  return new Promise((resolve) => {
    const from = audio.volume
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms)
      try {
        audio.volume = from + (to - from) * t
      } catch {
        /* iOS: volume is read-only, ignore */
      }
      if (t < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })
}

/**
 * Owns the background music.
 * Music never starts on its own — only after the first user interaction.
 */
export function AudioProvider({ children }) {
  const music = useRef(null)
  const wantsMusic = useRef(false) // user intent (survives tab switches)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const target = config.media.musicVolume ?? 0.45

  useEffect(() => {
    const m = new Audio(asset(config.media.backgroundMusic))
    m.loop = true
    m.preload = 'auto'
    m.volume = 0
    music.current = m

    const onVis = () => {
      if (document.hidden) m.pause()
      else if (wantsMusic.current) m.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      m.pause()
    }
  }, [])

  const playMusic = useCallback(async () => {
    const m = music.current
    if (!m) return
    wantsMusic.current = true
    try {
      await m.play()
      setMusicPlaying(true)
      fadeVolume(m, target, 1400)
    } catch {
      setMusicPlaying(false)
    }
  }, [target])

  const pauseMusic = useCallback(async () => {
    const m = music.current
    if (!m) return
    wantsMusic.current = false
    setMusicPlaying(false)
    await fadeVolume(m, 0, 400)
    m.pause()
  }, [])

  /** Call from a user gesture: starts music the very first time only. */
  const startOnInteraction = useCallback(() => {
    if (!wantsMusic.current && music.current?.paused) playMusic()
  }, [playMusic])

  const toggleMusic = useCallback(() => (musicPlaying ? pauseMusic() : playMusic()), [musicPlaying, playMusic, pauseMusic])

  const toggleMute = useCallback(() => {
    setMuted((mu) => {
      if (music.current) music.current.muted = !mu
      return !mu
    })
  }, [])

  return <AudioCtx.Provider value={{ musicPlaying, muted, toggleMusic, toggleMute, startOnInteraction }}>{children}</AudioCtx.Provider>
}
