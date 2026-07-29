import { Player } from '@remotion/player'
import { useReducedMotion } from 'framer-motion'
import { Network } from './Network'
import './ConnectionNetworkBackground.css'

const FPS = 30
const DURATION_IN_FRAMES = 240
const WIDTH = 1920
const HEIGHT = 1080
// A representative settled frame for reduced-motion viewers: several
// connections have already fired at least once, nothing mid-sweep-in.
const STATIC_FRAME = 150

export default function ConnectionNetworkBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="connection-network" aria-hidden="true">
      <Player
        component={Network}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        compositionWidth={WIDTH}
        compositionHeight={HEIGHT}
        style={{ width: '100%', height: '100%' }}
        loop={!reduceMotion}
        autoPlay={!reduceMotion}
        initialFrame={reduceMotion ? STATIC_FRAME : 0}
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        allowFullscreen={false}
        showPosterWhenUnplayed={false}
      />
    </div>
  )
}
