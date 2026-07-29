import Reveal from './Reveal'
import './Services.css'

const SERVICES = [
  {
    name: 'Talent Acquisition',
    tagline: 'Connecting the right people with the right opportunities.',
    body: 'We identify, assess, and connect qualified talent with organisations seeking skilled and reliable professionals.',
  },
  {
    name: 'Workforce Solutions',
    tagline: 'Supporting business growth through people.',
    body: 'We provide tailored recruitment solutions that help organisations address workforce needs efficiently and effectively.',
  },
  {
    name: 'Career Pathways',
    tagline: 'Enabling professional growth.',
    body: 'We support individuals in accessing opportunities that contribute to long-term career development and personal advancement.',
  },
  {
    name: 'Advisory & Support',
    tagline: 'Guidance throughout the journey.',
    body: 'We provide practical support, information, and coordination to ensure a smooth and transparent experience for all stakeholders.',
  },
  {
    name: 'Global Mobility',
    tagline: 'Facilitating international opportunities.',
    body: 'We help individuals and organisations navigate the processes involved in overseas employment and workforce movement.',
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Services</p>
        </Reveal>

        <ul className="services__list">
          {SERVICES.map((service, i) => (
            <Reveal as="li" key={service.name} delay={i * 0.06} className="service">
              <span className="service__index">{String(i + 1).padStart(2, '0')}</span>
              <div className="service__content">
                <h3 className="service__name">{service.name}</h3>
                <p className="service__tagline">{service.tagline}</p>
                <p className="service__body">{service.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
