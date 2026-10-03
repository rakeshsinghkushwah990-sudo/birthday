import { LottieLight } from 'lottie-react'
import heartbeat from '../../assets/lottie/heartbeat.json'
import sparkles from '../../assets/lottie/sparkles.json'

// Our Lottie files use no expressions, so the light build is enough.

export function LottieHeart({ size = 80, play = true, style, className }) {
  return <LottieLight src={heartbeat} loop autoplay={play} style={{ width: size, height: size, ...style }} className={className} aria-hidden="true" />
}

export function LottieSparkles({ size = 120, style, className }) {
  return <LottieLight src={sparkles} loop autoplay style={{ width: size, height: size, pointerEvents: 'none', ...style }} className={className} aria-hidden="true" />
}
