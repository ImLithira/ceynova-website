import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

// Two threads converge and, from the point they meet, continue as one —
// the brand's accent pink marking the moment the connection forms.
export default function RouteMark() {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      className="route-mark"
      viewBox="0 0 560 130"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="route-merge-gradient"
          gradientUnits="userSpaceOnUse"
          x1="300"
          y1="68"
          x2="544"
          y2="22"
        >
          <stop offset="0%" stopColor="var(--bronze)" />
          <stop offset="100%" stopColor="#e91e8c" />
        </linearGradient>
      </defs>

      <motion.path
        d="M16 96C120 96 220 80 300 68"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
      />
      <motion.path
        d="M16 40C120 40 220 56 300 68"
        stroke="var(--bronze)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.45, ease }}
      />
      <motion.path
        d="M300 68C380 50 460 26 544 22"
        stroke="url(#route-merge-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3, ease }}
      />
    </svg>
  )
}
