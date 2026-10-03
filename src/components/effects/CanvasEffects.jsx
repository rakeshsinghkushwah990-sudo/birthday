import { useEffect, useRef } from 'react'

const PALETTE = ['#f4a6c1', '#ec7fa3', '#d9557c', '#c3b0ea', '#9479cc', '#f4c76b', '#ffe3a3', '#ecc1b3', '#9fd9c8']

function useCanvas(ref) {
  // Keeps the canvas sized to its box at a capped device-pixel-ratio
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      c.width = c.clientWidth * dpr
      c.height = c.clientHeight * dpr
      c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [ref])
}

const canvasStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }

function drawHeart(ctx, size) {
  const s = size / 2
  ctx.beginPath()
  ctx.moveTo(0, s * 0.9)
  ctx.bezierCurveTo(-s * 1.4, -s * 0.1, -s * 0.7, -s * 1.3, 0, -s * 0.45)
  ctx.bezierCurveTo(s * 0.7, -s * 1.3, s * 1.4, -s * 0.1, 0, s * 0.9)
  ctx.fill()
}

/**
 * Confetti explosion. Increment `fire` to launch a new burst.
 * `origin` is a fraction of the canvas size ({x: 0.5, y: 0.5} = centre).
 */
export function ConfettiBurst({ fire = 0, origin = { x: 0.5, y: 0.5 }, amount = 160, style }) {
  const ref = useRef(null)
  const parts = useRef([])
  const raf = useRef(0)
  useCanvas(ref)

  useEffect(() => {
    if (!fire) return
    const c = ref.current
    const ctx = c.getContext('2d')
    const W = c.clientWidth
    const H = c.clientHeight
    const n = window.innerWidth < 700 ? Math.round(amount * 0.6) : amount
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const sp = 4 + Math.random() * 11
      parts.current.push({
        x: origin.x * W,
        y: origin.y * H,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 6,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        w: 6 + Math.random() * 7,
        h: 9 + Math.random() * 9,
        kind: Math.random() < 0.18 ? 'heart' : Math.random() < 0.3 ? 'dot' : 'rect',
        color: PALETTE[(Math.random() * PALETTE.length) | 0],
        life: 0,
        max: 140 + Math.random() * 80,
        wob: Math.random() * 10,
      })
    }
    cancelAnimationFrame(raf.current)
    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      parts.current = parts.current.filter((p) => p.life < p.max && p.y < H + 40)
      for (const p of parts.current) {
        p.life++
        p.vx *= 0.985
        p.vy = p.vy * 0.985 + 0.22
        p.x += p.vx + Math.sin((p.life + p.wob) / 9) * 0.6
        p.y += p.vy
        p.r += p.vr
        ctx.save()
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.max)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.r)
        ctx.fillStyle = p.color
        if (p.kind === 'heart') drawHeart(ctx, p.w * 1.8)
        else if (p.kind === 'dot') {
          ctx.beginPath()
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.scale(1, Math.cos(p.life / 6 + p.wob))
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        }
        ctx.restore()
      }
      if (parts.current.length) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fire])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  return <canvas ref={ref} style={{ ...canvasStyle, ...style }} aria-hidden="true" />
}

/** Fireworks show (with the occasional heart-shaped burst) while `active`. */
export function Fireworks({ active = true, style }) {
  const ref = useRef(null)
  useCanvas(ref)

  useEffect(() => {
    if (!active) return
    const c = ref.current
    const ctx = c.getContext('2d')
    let rockets = []
    let sparks = []
    let frame = 0
    let raf = 0
    const small = window.innerWidth < 700
    const colors = ['#ffd6e5', '#f4a6c1', '#ffe3a3', '#f4c76b', '#ddd0f5', '#c3b0ea', '#ffffff', '#ffb3c7']

    const launch = () => {
      const W = c.clientWidth
      const H = c.clientHeight
      rockets.push({
        x: W * (0.15 + Math.random() * 0.7),
        y: H + 10,
        vy: -(H * 0.012 + 6 + Math.random() * 3),
        targetY: H * (0.12 + Math.random() * 0.35),
        color: colors[(Math.random() * colors.length) | 0],
        heart: Math.random() < 0.35,
      })
    }

    const explode = (r) => {
      const n = small ? 46 : 80
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2
        let vx, vy
        if (r.heart) {
          // parametric heart curve
          const hx = 16 * Math.sin(t) ** 3
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
          vx = hx * 0.26
          vy = hy * 0.26
        } else {
          const sp = 2 + Math.random() * 4.5
          vx = Math.cos(t) * sp
          vy = Math.sin(t) * sp
        }
        sparks.push({ x: r.x, y: r.y, px: r.x, py: r.y, vx, vy, life: 0, max: 60 + Math.random() * 30, color: r.color })
      }
    }

    const tick = () => {
      frame++
      const W = c.clientWidth
      const H = c.clientHeight
      ctx.clearRect(0, 0, W, H)
      if (frame % (small ? 46 : 34) === 1) launch()
      ctx.globalCompositeOperation = 'lighter'
      rockets = rockets.filter((r) => {
        r.y += r.vy
        r.vy *= 0.985
        ctx.fillStyle = r.color
        ctx.beginPath()
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2)
        ctx.fill()
        if (r.y <= r.targetY || r.vy > -1.5) {
          explode(r)
          return false
        }
        return true
      })
      sparks = sparks.filter((s) => s.life < s.max)
      for (const s of sparks) {
        s.life++
        s.px = s.x
        s.py = s.y
        s.vx *= 0.965
        s.vy = s.vy * 0.965 + 0.045
        s.x += s.vx
        s.y += s.vy
        ctx.globalAlpha = Math.max(0, 1 - s.life / s.max)
        ctx.strokeStyle = s.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(s.px - s.vx * 2, s.py - s.vy * 2)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ctx.clearRect(0, 0, c.clientWidth, c.clientHeight)
    }
  }, [active])

  return <canvas ref={ref} style={{ ...canvasStyle, ...style }} aria-hidden="true" />
}
