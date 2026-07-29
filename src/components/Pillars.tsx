import Reveal from './Reveal'
import './Pillars.css'

const PILLARS = [
  {
    name: 'Trust',
    heading: 'Building Confidence Through Integrity',
    body: 'Trust is the foundation of every successful relationship. We operate with transparency, professionalism, and accountability, ensuring confidence among candidates, employers, and partners alike.',
  },
  {
    name: 'Simplicity',
    heading: 'Making Complex Journeys Easier',
    body: 'We believe access to opportunity should not be complicated. Through clear communication, efficient processes, and practical support, we simplify complex decisions and transitions for all stakeholders.',
  },
  {
    name: 'Impact',
    heading: 'Creating Lasting Value',
    body: 'Our success is measured by the positive outcomes we create. We strive to deliver meaningful and sustainable value for individuals, organizations, and the broader communities we serve.',
  },
]

export default function Pillars() {
  return (
    <section id="pillars" className="pillars">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Pillars</p>
        </Reveal>

        <div className="pillars__grid">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.name} delay={i * 0.1} className="pillar">
              <h3 className="pillar__name">{pillar.name}</h3>
              <p className="pillar__heading">{pillar.heading}</p>
              <p className="pillar__body">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
