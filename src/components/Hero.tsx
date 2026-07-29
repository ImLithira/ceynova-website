import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './Hero.css'

const ConnectionNetworkBackground = lazy(() => import('./ConnectionNetworkBackground'))

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduceMotion ? undefined : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  })

  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <motion.p className="eyebrow hero__eyebrow" {...rise(0)}>
          Talent Acquisition &amp; Recruitment
        </motion.p>

        <motion.blockquote className="hero__quote" {...rise(0.1)}>
          <p>
            &ldquo;We connect Sri Lankan talent with trusted international
            opportunities through ethical recruitment, professional
            development, and global partnerships.&rdquo;
          </p>
          <cite>— Ashan Ransilige</cite>
        </motion.blockquote>

        <motion.div className="hero__network" {...rise(0.2)}>
          <Suspense fallback={null}>
            <ConnectionNetworkBackground />
          </Suspense>
        </motion.div>

        <motion.div className="hero__actions" {...rise(0.3)}>
          <a className="button" href="#connect">
            Connect with us
          </a>
          <a className="hero__scroll" href="#pillars">
            Explore our pillars
          </a>
        </motion.div>
      </div>
    </section>
  )
}
