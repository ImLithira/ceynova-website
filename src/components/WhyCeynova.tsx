import Reveal from './Reveal'
import './WhyCeynova.css'

export default function WhyCeynova() {
  return (
    <section id="why" className="why">
      <div className="container why__inner">
        <Reveal>
          <p className="eyebrow">Why CeyNova</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="why__statement">
            We believe the right people create exceptional organizations. With
            over 20 years of experience across local and international
            markets, we take the time to understand your business, culture,
            and goals before recommending solutions.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="why__support">
            By combining industry expertise with a deep understanding of
            organizational fit, we deliver talent solutions that create
            lasting value for both employers and candidates.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
