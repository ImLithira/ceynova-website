import { motion, useReducedMotion } from 'framer-motion'

export default function RouteMark() {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className="route-mark"
      viewBox="0 0 560 120"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d="M20 96C120 96 210 96 280 60C350 24 440 16 540 20"
        stroke="var(--bronze)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="20"
        cy="96"
        r="4.5"
        fill="var(--bronze)"
        initial={reduceMotion ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="540"
        cy="20"
        r="4.5"
        fill="var(--ink)"
        initial={reduceMotion ? undefined : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}
