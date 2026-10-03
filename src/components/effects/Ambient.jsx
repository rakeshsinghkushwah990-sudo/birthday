import { useMemo } from 'react'
import './ambient.css'

/* Small helpers ------------------------------------------------------- */
const rand = (a, b) => a + Math.random() * (b - a)
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const isSmallScreen = () => typeof window !== 'undefined' && window.innerWidth < 700
const scaleCount = (n) => Math.max(3, Math.round(n * (isSmallScreen() ? 0.55 : 1)))

export const HeartShape = ({ size = 24, color = '#ec7fa3', style, className }) => (
  <svg viewBox="-60 -60 120 125" width={size} height={size} style={style} className={className} aria-hidden="true">
    <path d="M0 60C-50 25-70-10-45-40C-25-62 0-50 0-32C0-50 25-62 45-40C70-10 50 25 0 60Z" fill={color} />
  </svg>
)

/* Floating hearts that drift up the screen ---------------------------- */
export function FloatingHearts({ count = 14, colors = ['#f4a6c1', '#ec7fa3', '#f9c9da', '#d9557c', '#ecc1b3'], opacity = 0.8 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: scaleCount(count) }, () => ({
        left: rand(0, 100),
        size: rand(12, 34),
        dur: rand(9, 18),
        delay: -rand(0, 18),
        drift: rand(-60, 60),
        color: pick(colors),
        o: rand(0.45, 1) * opacity,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  )
  return (
    <div className="fx-layer" aria-hidden="true">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="fx-float-heart"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            '--drift': `${h.drift}px`,
            '--o': h.o,
          }}
        >
          <HeartShape size={h.size} color={h.color} />
        </span>
      ))}
    </div>
  )
}

/* Twinkling stars / sparkles ----------------------------------------- */
export function Twinkles({ count = 40, color = '#fff', glow = 'rgba(255,240,200,0.9)', area = 'full', sizes = [2, 5] }) {
  const stars = useMemo(
    () =>
      Array.from({ length: scaleCount(count) }, () => ({
        top: area === 'top' ? rand(0, 60) : rand(0, 100),
        left: rand(0, 100),
        s: rand(sizes[0], sizes[1]),
        dur: rand(2, 5),
        delay: -rand(0, 5),
        sparkle: Math.random() < 0.18,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, area],
  )
  return (
    <div className="fx-layer" aria-hidden="true">
      {stars.map((s, i) =>
        s.sparkle ? (
          <svg
            key={i}
            className="fx-twinkle"
            viewBox="-10 -10 20 20"
            width={s.s * 4}
            height={s.s * 4}
            style={{ top: `${s.top}%`, left: `${s.left}%`, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s`, filter: `drop-shadow(0 0 4px ${glow})` }}
          >
            <path d="M0-10L2-2L10 0L2 2L0 10L-2 2L-10 0L-2-2Z" fill={color} />
          </svg>
        ) : (
          <span
            key={i}
            className="fx-twinkle fx-dot"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.s,
              height: s.s,
              background: color,
              boxShadow: `0 0 ${s.s * 3}px ${glow}`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ),
      )}
    </div>
  )
}

/* Soft drifting clouds ----------------------------------------------- */
export function Clouds({ count = 5, color = '#ffffff', opacity = 0.75 }) {
  const clouds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        top: rand(2, 70),
        w: rand(180, 380),
        dur: rand(60, 110),
        delay: -rand(0, 100),
        o: rand(0.5, 1) * opacity,
        dir: i % 2 ? 1 : -1,
      })),
    [count, opacity],
  )
  return (
    <div className="fx-layer" aria-hidden="true">
      {clouds.map((c, i) => (
        <svg
          key={i}
          className={`fx-cloud ${c.dir > 0 ? 'ltr' : 'rtl'}`}
          viewBox="0 0 200 80"
          width={c.w}
          style={{ top: `${c.top}%`, opacity: c.o, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
        >
          <g fill={color}>
            <ellipse cx="60" cy="52" rx="48" ry="24" />
            <ellipse cx="100" cy="38" rx="42" ry="32" />
            <ellipse cx="145" cy="50" rx="44" ry="25" />
            <ellipse cx="102" cy="60" rx="80" ry="18" />
          </g>
        </svg>
      ))}
    </div>
  )
}

/* Fireflies ---------------------------------------------------------- */
export function Fireflies({ count = 26, color = '#ffe9a6' }) {
  const flies = useMemo(
    () =>
      Array.from({ length: scaleCount(count) }, () => ({
        top: rand(10, 95),
        left: rand(0, 100),
        dx: rand(-80, 80),
        dy: rand(-90, 40),
        dur: rand(6, 13),
        blink: rand(1.4, 3.2),
        delay: -rand(0, 10),
        s: rand(3, 6),
      })),
    [count],
  )
  return (
    <div className="fx-layer" aria-hidden="true">
      {flies.map((f, i) => (
        <span
          key={i}
          className="fx-firefly"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: f.s,
            height: f.s,
            background: color,
            boxShadow: `0 0 ${f.s * 3}px ${f.s}px rgba(255, 220, 120, 0.55)`,
            '--dx': `${f.dx}px`,
            '--dy': `${f.dy}px`,
            animationDuration: `${f.dur}s, ${f.blink}s`,
            animationDelay: `${f.delay}s, ${f.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* Falling rose petals ------------------------------------------------ */
export function RosePetals({ count = 16, colors = ['#e46b8f', '#f08fae', '#c94572', '#f6b3c8'] }) {
  const petals = useMemo(
    () =>
      Array.from({ length: scaleCount(count) }, () => ({
        left: rand(-5, 100),
        s: rand(14, 26),
        dur: rand(10, 19),
        delay: -rand(0, 19),
        sway: rand(40, 140),
        spin: rand(240, 720) * (Math.random() < 0.5 ? -1 : 1),
        color: pick(colors),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  )
  return (
    <div className="fx-layer" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="fx-petal"
          style={{ left: `${p.left}%`, '--sway': `${p.sway}px`, '--spin': `${p.spin}deg`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        >
          <svg viewBox="0 0 30 34" width={p.s} height={p.s * 1.13}>
            <path d="M15 33C4 26 0 16 3 8C6 1 13 0 15 6C17 0 24 1 27 8C30 16 26 26 15 33Z" fill={p.color} opacity="0.92" />
            <path d="M15 31C11 22 11 14 15 7" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
          </svg>
        </span>
      ))}
    </div>
  )
}

/* Gently drifting confetti (ambient, not a burst) -------------------- */
export function DriftConfetti({ count = 26 }) {
  const colors = ['#f4a6c1', '#c3b0ea', '#f4c76b', '#ecc1b3', '#9fd9c8', '#d9557c']
  const bits = useMemo(
    () =>
      Array.from({ length: scaleCount(count) }, () => ({
        left: rand(0, 100),
        w: rand(6, 10),
        h: rand(10, 16),
        dur: rand(8, 16),
        delay: -rand(0, 16),
        color: pick(colors),
        round: Math.random() < 0.3,
        spin: rand(360, 1080),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  )
  return (
    <div className="fx-layer" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          className="fx-confetti"
          style={{
            left: `${b.left}%`,
            width: b.round ? b.w : b.w * 0.7,
            height: b.round ? b.w : b.h,
            borderRadius: b.round ? '50%' : 2,
            background: b.color,
            '--spin': `${b.spin}deg`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* Shooting stars ----------------------------------------------------- */
export function ShootingStars({ count = 3 }) {
  return (
    <div className="fx-layer" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="fx-shooting" style={{ top: `${8 + i * 14}%`, left: `${30 + i * 22}%`, animationDelay: `${i * 3.7 + 1}s` }} />
      ))}
    </div>
  )
}
