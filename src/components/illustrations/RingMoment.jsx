import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { asset } from '../../hooks/asset'
import './ringMoment.css'

// The ring moment: a painted dusk hilltop. Tap the rings → the couple walk together,
// he kneels, and the ring glides onto her finger. Pictures live in /public/images/engagement.
const IMG = {
  girl: asset('/images/engagement/girl.webp'),
  boy: asset('/images/engagement/boy.webp'),
  kneel: asset('/images/engagement/kneel.webp'),
}

const rnd = (a, b) => a + Math.random() * (b - a)
const NS = 'http://www.w3.org/2000/svg'

function useScenery() {
  return useMemo(() => {
    const stars = Array.from({ length: 55 }, () => ({
      cx: rnd(0, 400).toFixed(1),
      cy: rnd(0, 190).toFixed(1),
      r: rnd(0.4, 1.3).toFixed(2),
      delay: (-rnd(0, 3)).toFixed(2) + 's',
      dur: rnd(2, 5).toFixed(2) + 's',
    }))
    const greens = ['#4f7a4c', '#6d9660', '#3e6646', '#86ad73', '#355a43']
    const grass = Array.from({ length: 320 }, (_, i) => {
      const x = rnd(-5, 405)
      const y = rnd(382, 520)
      const h = rnd(4, 9) * (0.6 + (y - 380) / 180)
      const lean = rnd(-3, 3)
      return {
        d: `M${x.toFixed(1)} ${y.toFixed(1)} q ${(lean / 2).toFixed(1)} ${(-h / 2).toFixed(1)} ${lean.toFixed(1)} ${(-h).toFixed(1)}`,
        stroke: greens[i % greens.length],
        w: rnd(0.8, 1.6).toFixed(2),
      }
    })
    const petalColors = ['#ffffff', '#ffd6e6', '#ffe9a8', '#e9d8ff']
    const petals = Array.from({ length: 46 }, (_, i) => {
      const y = rnd(386, 515)
      return { cx: rnd(0, 400).toFixed(1), cy: y.toFixed(1), r: (rnd(0.8, 1.6) * (0.7 + (y - 380) / 200)).toFixed(2), fill: petalColors[i % 4] }
    })
    const flies = Array.from({ length: 16 }, () => ({
      cx: rnd(10, 390).toFixed(1),
      cy: rnd(250, 470).toFixed(1),
      r: rnd(1, 2.2).toFixed(2),
      dx: rnd(-15, 15).toFixed(1) + 'px',
      dy: rnd(-15, 15).toFixed(1) + 'px',
      delay: (-rnd(0, 7)).toFixed(2) + 's',
    }))
    const bulbs = Array.from({ length: 9 }, (_, i) => {
      const t = 0.04 + i * 0.115
      const x = (1 - t) * (1 - t) * -10 + 2 * (1 - t) * t * 200 + t * t * 410
      const y = (1 - t) * (1 - t) * 100 + 2 * (1 - t) * t * 150 + t * t * 100
      return { cx: x.toFixed(1), cy: (y + 4).toFixed(1), pink: i % 2 === 1, delay: (-i * 0.37).toFixed(2) + 's' }
    })
    return { stars, grass, petals, flies, bulbs }
  }, [])
}

export default function RingMoment({ hint = 'Tap the rings 💍', replayLabel = 'Play again ↻', onStart, onDone }) {
  const s = useScenery()
  const [phase, setPhase] = useState([]) // started, walking, kneel, flying, placed, done
  const [showReplay, setShowReplay] = useState(false)
  const [instant, setInstant] = useState(false)
  const timers = useRef([])
  const heartLoop = useRef(null)
  const fxRef = useRef(null)
  const ringsRef = useRef(null)
  const replayRef = useRef(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const k = reduce ? 0.15 : 1

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    clearInterval(heartLoop.current)
  }, [])
  useEffect(() => clearAll, [clearAll])

  const fxEl = (name, attrs) => {
    const n = document.createElementNS(NS, name)
    for (const a in attrs) n.setAttribute(a, attrs[a])
    fxRef.current?.appendChild(n)
    return n
  }

  const sparkleBurst = () => {
    const colors = ['#fff6d2', '#ffd877', '#ffe1f0', '#a9dcff', '#ffffff']
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2
      const d = rnd(20, 44)
      const sp = fxEl('circle', { class: 'rm-spark', r: rnd(1.2, 3).toFixed(2), fill: colors[i % colors.length] })
      sp.style.setProperty('--dx', (Math.cos(a) * d).toFixed(1) + 'px')
      sp.style.setProperty('--dy', (Math.sin(a) * d).toFixed(1) + 'px')
      setTimeout(() => sp.remove(), 1400)
    }
  }

  const floatHeart = () => {
    const h = fxEl('use', { href: '#rm-heart', class: 'rm-float-heart', fill: Math.random() < 0.5 ? '#ffe1f0' : '#f6a9cc' })
    h.style.setProperty('--x', rnd(150, 260).toFixed(1) + 'px')
    h.style.setProperty('--sway', rnd(-20, 20).toFixed(1) + 'px')
    const t = rnd(3, 5)
    h.style.setProperty('--t', t.toFixed(2) + 's')
    setTimeout(() => h.remove(), t * 1000 + 100)
  }

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms * k))

  const start = () => {
    if (phase.includes('started')) return
    setPhase(['started', 'walking'])
    onStart?.()
    later(() => setPhase(['started', 'kneel']), 2650)
    later(() => setPhase(['started', 'kneel', 'flying']), 3150)
    later(() => setPhase(['started', 'kneel', 'flying', 'placed']), 4800)
    later(() => {
      setPhase(['started', 'kneel', 'flying', 'placed', 'done'])
      sparkleBurst()
      for (let i = 0; i < 6; i++) setTimeout(floatHeart, i * 180)
      if (!reduce) heartLoop.current = setInterval(floatHeart, 650)
      onDone?.()
    }, 5900)
    later(() => setShowReplay(true), 7000)
  }

  const reset = () => {
    clearAll()
    if (fxRef.current) fxRef.current.innerHTML = ''
    setShowReplay(false)
    setInstant(true)
    setPhase([])
    requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)))
    ringsRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (showReplay) replayRef.current?.focus({ preventScroll: true })
  }, [showReplay])

  const cls = ['rm-stage', ...phase, instant ? 'rm-instant' : ''].join(' ')

  return (
    <div className={cls}>
      <svg viewBox="0 0 400 520" role="img" aria-label="A watercolor couple on a hilltop at dusk. Tap the rings: they walk together, he kneels and slides the ring onto her finger.">
        <defs>
          <linearGradient id="rm-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#25285e" />
            <stop offset=".26" stopColor="#4a3f8c" />
            <stop offset=".48" stopColor="#9a6fb0" />
            <stop offset=".62" stopColor="#e09aa8" />
            <stop offset=".72" stopColor="#f9c79f" />
          </linearGradient>
          <radialGradient id="rm-sunGlow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#fff0c8" stopOpacity=".85" />
            <stop offset="1" stopColor="#ffd2a8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rm-cloud" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff2f1" />
            <stop offset=".6" stopColor="#f3c3cf" />
            <stop offset="1" stopColor="#b48fc0" />
          </linearGradient>
          <linearGradient id="rm-meadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8bab6e" />
            <stop offset=".35" stopColor="#5b8656" />
            <stop offset="1" stopColor="#2e4f3f" />
          </linearGradient>
          <filter id="rm-soft" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <filter id="rm-softer" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
          <linearGradient id="rm-platinum" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".5" stopColor="#b9c4d2" />
            <stop offset="1" stopColor="#eef3f8" />
          </linearGradient>
          <linearGradient id="rm-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffe29a" />
            <stop offset=".5" stopColor="#e3a63e" />
            <stop offset="1" stopColor="#ffd27a" />
          </linearGradient>
          <linearGradient id="rm-gem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#a9dcff" />
          </linearGradient>
          <radialGradient id="rm-bulbWarm">
            <stop offset="0" stopColor="#fff6d2" />
            <stop offset=".35" stopColor="#ffd877" stopOpacity=".8" />
            <stop offset="1" stopColor="#ffd877" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rm-bulbPink">
            <stop offset="0" stopColor="#fff0f8" />
            <stop offset=".35" stopColor="#f2b0d8" stopOpacity=".8" />
            <stop offset="1" stopColor="#f2b0d8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rm-heartGlow">
            <stop offset="0" stopColor="#ffe0ef" stopOpacity=".75" />
            <stop offset="1" stopColor="#ffe0ef" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rm-ringGlow">
            <stop offset="0" stopColor="#fffbe8" stopOpacity=".7" />
            <stop offset="1" stopColor="#fffbe8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rm-shadow">
            <stop offset="0" stopColor="#1d3328" stopOpacity=".45" />
            <stop offset="1" stopColor="#1d3328" stopOpacity="0" />
          </radialGradient>
          <path id="rm-heart" d="M0,8 C-12,-1 -7,-12 0,-5 C7,-12 12,-1 0,8 Z" />
        </defs>

        {/* painted sky */}
        <rect width="400" height="520" fill="url(#rm-sky)" />
        <g className="rm-noclick">
          {s.stars.map((st, i) => (
            <circle key={i} className="rm-star" cx={st.cx} cy={st.cy} r={st.r} style={{ animationDelay: st.delay, animationDuration: st.dur }} />
          ))}
        </g>
        <ellipse cx="200" cy="372" rx="230" ry="90" fill="url(#rm-sunGlow)" />

        {/* clouds */}
        <g className="rm-cloud" filter="url(#rm-soft)" fill="url(#rm-cloud)" opacity=".92">
          <circle cx="18" cy="240" r="34" />
          <circle cx="62" cy="222" r="40" />
          <circle cx="108" cy="238" r="30" />
          <circle cx="140" cy="252" r="22" />
          <ellipse cx="70" cy="262" rx="95" ry="20" />
        </g>
        <g className="rm-cloud rm-c2" filter="url(#rm-soft)" fill="url(#rm-cloud)" opacity=".88">
          <circle cx="300" cy="222" r="28" />
          <circle cx="342" cy="200" r="40" />
          <circle cx="388" cy="214" r="34" />
          <ellipse cx="345" cy="244" rx="90" ry="18" />
        </g>
        <g className="rm-cloud" filter="url(#rm-soft)" fill="url(#rm-cloud)" opacity=".55">
          <circle cx="230" cy="292" r="16" />
          <circle cx="258" cy="284" r="20" />
          <circle cx="284" cy="294" r="14" />
          <ellipse cx="256" cy="302" rx="52" ry="9" />
        </g>

        {/* distant hills and trees */}
        <path d="M0 352 Q 60 322 120 342 T 240 336 T 400 330 L400 380 L0 380 Z" fill="#8a7db7" opacity=".75" filter="url(#rm-softer)" />
        <path d="M0 368 Q 80 344 160 362 T 320 354 T 400 352 L400 392 L0 392 Z" fill="#6c6aa1" opacity=".85" filter="url(#rm-softer)" />
        <g fill="#4b5576" opacity=".9" filter="url(#rm-softer)">
          <circle cx="30" cy="362" r="9" />
          <circle cx="42" cy="358" r="11" />
          <circle cx="54" cy="364" r="8" />
          <circle cx="350" cy="355" r="10" />
          <circle cx="364" cy="350" r="12" />
          <circle cx="378" cy="357" r="9" />
        </g>

        {/* meadow */}
        <path d="M0 392 Q 90 368 200 378 T 400 370 L400 520 L0 520 Z" fill="url(#rm-meadow)" />
        <g className="rm-noclick">
          {s.grass.map((g, i) => (
            <path key={i} d={g.d} stroke={g.stroke} strokeWidth={g.w} fill="none" strokeLinecap="round" opacity=".85" />
          ))}
          {s.petals.map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} opacity=".9" />
          ))}
        </g>
        <g className="rm-noclick">
          {s.flies.map((f, i) => (
            <circle key={i} className="rm-fly" cx={f.cx} cy={f.cy} r={f.r} style={{ '--dx': f.dx, '--dy': f.dy, animationDelay: f.delay }} />
          ))}
        </g>

        {/* fairy lights */}
        <path d="M-10 100 Q200 150 410 100" fill="none" stroke="#2a2440" strokeWidth="1.1" opacity=".7" />
        <g>
          {s.bulbs.map((b, i) => (
            <circle key={i} className="rm-bulb" cx={b.cx} cy={b.cy} r="14" fill={b.pink ? 'url(#rm-bulbPink)' : 'url(#rm-bulbWarm)'} style={{ animationDelay: b.delay }} />
          ))}
        </g>

        {/* tap target: the two rings */}
        <g
          ref={ringsRef}
          className="rm-rings-hit"
          role="button"
          tabIndex={0}
          aria-label="Tap the rings to start the proposal"
          onClick={start}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              start()
            }
          }}
        >
          <circle className="rm-focus-ring" cx="200" cy="80" r="62" fill="none" stroke="#fffaf3" strokeWidth="1.5" strokeDasharray="4 4" />
          <g className="rm-rings">
            <g className="rm-rings-inner">
              <circle cx="200" cy="80" r="72" fill="url(#rm-ringGlow)" />
              <circle cx="220" cy="84" r="29" fill="none" stroke="url(#rm-gold)" strokeWidth="8" />
              <circle cx="182" cy="84" r="29" fill="none" stroke="url(#rm-platinum)" strokeWidth="7" />
              <path d="M 196.2 67.4 A 29 29 0 0 1 207.7 57.7" fill="none" stroke="url(#rm-gold)" strokeWidth="8" />
              <g transform="translate(182 47)">
                <polygon points="-11,-5 -5,-12 5,-12 11,-5 0,9" fill="url(#rm-gem)" stroke="#d7efff" strokeWidth=".8" />
                <polyline points="-11,-5 11,-5" fill="none" stroke="#c6e6ff" strokeWidth=".7" />
                <polyline points="-5,-12 -3,-5 0,9 3,-5 5,-12" fill="none" stroke="#c6e6ff" strokeWidth=".6" />
              </g>
              <rect x="140" y="28" width="120" height="96" fill="transparent" />
            </g>
          </g>
        </g>
        <text className="rm-hint rm-label" x="200" y="160" textAnchor="middle">
          {hint}
        </text>

        {/* heart and tether between them */}
        <line className="rm-tether" x1="114" y1="258" x2="196" y2="267" stroke="#fff0f7" strokeWidth="1.6" />
        <line className="rm-tether" x1="218" y1="270" x2="300" y2="281" stroke="#fff0f7" strokeWidth="1.6" />
        <g className="rm-mid-heart">
          <circle r="32" fill="url(#rm-heartGlow)" />
          <g className="rm-mid-heart-inner">
            <use href="#rm-heart" transform="scale(1.9)" fill="#ffe1f0" />
          </g>
        </g>

        {/* girl (feet on the ground line y=452) */}
        <g className="rm-girl">
          <ellipse cx="50" cy="452" rx="44" ry="6" fill="url(#rm-shadow)" />
          <g className="rm-bob">
            <image href={IMG.girl} x="0" y="192" width="108.5" height="260" />
          </g>
        </g>

        {/* boy standing */}
        <g className="rm-boy">
          <g className="rm-boy-stand">
            <ellipse cx="68" cy="452" rx="42" ry="6" fill="url(#rm-shadow)" />
            <g className="rm-bob">
              <image href={IMG.boy} x="0" y="178" width="102" height="274" />
            </g>
          </g>
        </g>

        {/* boy kneeling */}
        <g className="rm-kneeler">
          <ellipse cx="72" cy="452" rx="70" ry="6" fill="url(#rm-shadow)" />
          <image href={IMG.kneel} x="0" y="249" width="140.8" height="203" />
        </g>

        {/* the ring that travels to her finger */}
        <g className="rm-travel">
          <circle className="rm-travel-glow" r="10" fill="url(#rm-ringGlow)" />
          <ellipse rx="2.6" ry="3.2" fill="none" stroke="url(#rm-platinum)" strokeWidth="1.2" />
          <polygon points="-2.2,-3.6 -1,-5.2 1,-5.2 2.2,-3.6 0,-2.2" fill="url(#rm-gem)" stroke="#ffffff" strokeWidth=".3" />
        </g>

        <g ref={fxRef} className="rm-noclick" />
      </svg>
      {showReplay && (
        <button ref={replayRef} className="rm-replay" type="button" onClick={reset}>
          {replayLabel}
        </button>
      )}
    </div>
  )
}
