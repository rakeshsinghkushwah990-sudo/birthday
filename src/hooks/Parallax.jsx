import { createContext, useContext, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ParallaxCtx = createContext(null)

/** Tracks the pointer and exposes smoothed values in the range -1..1 */
export function ParallaxProvider({ children }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 40, damping: 18, mass: 0.6 })
  const y = useSpring(my, { stiffness: 40, damping: 18, mass: 0.6 })

  useEffect(() => {
    const onMove = (e) => {
      const p = e.touches ? e.touches[0] : e
      if (!p) return
      mx.set((p.clientX / window.innerWidth) * 2 - 1)
      my.set((p.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [mx, my])

  return <ParallaxCtx.Provider value={{ x, y }}>{children}</ParallaxCtx.Provider>
}

/** Moves its children opposite to the pointer; larger depth = closer layer */
export function Parallax({ depth = 1, children, className = 'bg-layer', style }) {
  const ctx = useContext(ParallaxCtx)
  const fallback = useMotionValue(0)
  const x = useTransform(ctx?.x ?? fallback, (v) => v * -14 * depth)
  const y = useTransform(ctx?.y ?? fallback, (v) => v * -10 * depth)
  return (
    <motion.div className={className} style={{ x, y, ...style }}>
      {children}
    </motion.div>
  )
}
