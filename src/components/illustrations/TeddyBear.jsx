import './illustrations.css'

/**
 * Soft illustrated teddy bear.
 * pose: 'heart' (hugging a heart) | 'cheer' (arms up, celebrating)
 */
export default function TeddyBear({ size = 160, pose = 'heart', hat = false, fur = '#d6a283', className = '', style }) {
  const light = '#f6dcc9'
  const dark = '#5b3640'
  const id = `bear-${pose}-${hat ? 'h' : 'n'}`
  return (
    <svg
      viewBox="0 -22 200 262"
      width={size}
      height={size * 1.31}
      className={`teddy teddy-${pose} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-fur`} cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#ecc0a2" />
          <stop offset="1" stopColor={fur} />
        </radialGradient>
        <linearGradient id={`${id}-heart`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f79bb8" />
          <stop offset="1" stopColor="#d9426e" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="232" rx="62" ry="7" fill="rgba(120,60,90,0.18)" />

      {/* Arms raised (cheer pose) sit behind the body */}
      {pose === 'cheer' && (
        <>
          <g className="teddy-arm-l">
            <ellipse cx="52" cy="128" rx="15" ry="30" transform="rotate(35 52 128)" fill={`url(#${id}-fur)`} />
            <circle cx="40" cy="104" r="12" fill={light} />
          </g>
          <g className="teddy-arm-r">
            <ellipse cx="148" cy="128" rx="15" ry="30" transform="rotate(-35 148 128)" fill={`url(#${id}-fur)`} />
            <circle cx="160" cy="104" r="12" fill={light} />
          </g>
        </>
      )}

      {/* Body */}
      <g className="teddy-body">
        <ellipse cx="100" cy="178" rx="54" ry="50" fill={`url(#${id}-fur)`} />
        <ellipse cx="100" cy="186" rx="33" ry="31" fill={light} />
        <ellipse cx="66" cy="221" rx="22" ry="13" fill={`url(#${id}-fur)`} />
        <ellipse cx="134" cy="221" rx="22" ry="13" fill={`url(#${id}-fur)`} />
        <ellipse cx="66" cy="222" rx="12" ry="7" fill={light} />
        <ellipse cx="134" cy="222" rx="12" ry="7" fill={light} />
      </g>

      {/* Heart + hugging arms */}
      {pose === 'heart' && (
        <g>
          <g className="teddy-heart">
            <path
              d="M100 205C70 188 58 170 64 156C70 142 88 140 100 154C112 140 130 142 136 156C142 170 130 188 100 205Z"
              fill={`url(#${id}-heart)`}
            />
            <ellipse cx="82" cy="160" rx="6" ry="9" fill="rgba(255,255,255,0.45)" transform="rotate(-30 82 160)" />
          </g>
          <ellipse cx="62" cy="168" rx="14" ry="26" transform="rotate(-28 62 168)" fill={`url(#${id}-fur)`} />
          <ellipse cx="138" cy="168" rx="14" ry="26" transform="rotate(28 138 168)" fill={`url(#${id}-fur)`} />
          <circle cx="72" cy="182" r="11" fill={light} />
          <circle cx="128" cy="182" r="11" fill={light} />
        </g>
      )}

      {/* Head */}
      <g className="teddy-head">
        <circle cx="52" cy="50" r="22" fill={`url(#${id}-fur)`} />
        <circle cx="148" cy="50" r="22" fill={`url(#${id}-fur)`} />
        <circle cx="52" cy="52" r="12" fill="#f2b8b0" />
        <circle cx="148" cy="52" r="12" fill="#f2b8b0" />
        <ellipse cx="100" cy="88" rx="60" ry="54" fill={`url(#${id}-fur)`} />
        <ellipse cx="100" cy="108" rx="27" ry="20" fill={light} />
        <ellipse cx="100" cy="99" rx="9" ry="6.5" fill={dark} />
        <ellipse cx="97" cy="97" rx="3" ry="1.6" fill="rgba(255,255,255,0.6)" />
        <path d="M100 105Q100 114 91 115M100 105Q100 114 109 115" stroke={dark} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <g className="teddy-eyes">
          <circle cx="76" cy="84" r="6" fill={dark} />
          <circle cx="124" cy="84" r="6" fill={dark} />
          <circle cx="78" cy="82" r="2" fill="#fff" />
          <circle cx="126" cy="82" r="2" fill="#fff" />
        </g>
        <ellipse cx="62" cy="104" rx="10" ry="6" fill="#f08fae" opacity="0.5" />
        <ellipse cx="138" cy="104" rx="10" ry="6" fill="#f08fae" opacity="0.5" />
        {hat && (
          <g transform="rotate(14 130 30)">
            <path d="M108 44L134 -8L160 44Z" fill="#c3b0ea" />
            <path d="M116 28L152 28L156 36L112 36Z" fill="#f4c76b" opacity="0.9" />
            <path d="M123 14L146 14L149 20L120 20Z" fill="#f4a6c1" />
            <circle cx="134" cy="-9" r="7" fill="#f4c76b" />
            <ellipse cx="134" cy="44" rx="27" ry="5" fill="#9479cc" />
          </g>
        )}
      </g>
    </svg>
  )
}
