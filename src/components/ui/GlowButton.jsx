import { motion } from 'framer-motion'

export default function GlowButton({ children, onClick, variant = '', className = '', delay = 0, icon = null, ...rest }) {
  return (
    <motion.button
      type="button"
      className={`glow-btn ${variant} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      {...rest}
    >
      {children}
      {icon}
    </motion.button>
  )
}
