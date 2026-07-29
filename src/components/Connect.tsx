import Reveal from './Reveal'
import ContactForm from './ContactForm'
import './Connect.css'

const WHATSAPP_NUMBERS = ['+94777333308', '+94777335777']
const EMAILS = ['ransilige@gmail.com', 'e.ransilige@gmail.com']

export default function Connect() {
  return (
    <section id="connect" className="connect">
      <div className="container connect__inner">
        <Reveal>
          <p className="eyebrow eyebrow--light">Connect</p>
        </Reveal>

        <Reveal delay={0.08}>
          <blockquote className="connect__promise">
            <p>
              &ldquo;To provide trusted, transparent, and effective talent
              solutions that create opportunities for people, deliver value
              for organizations, and contribute to a better future for all
              stakeholders.&rdquo;
            </p>
            <cite>— Ethan Ransilige, Client Promise</cite>
          </blockquote>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="connect__grid">
            <div className="connect__block">
              <h3>Office</h3>
              <p>
                No 33, St&rsquo; Peters Place
                <br />
                Colombo 4
                <br />
                Sri Lanka
              </p>
            </div>

            <div className="connect__block">
              <h3>Email</h3>
              {EMAILS.map((email) => (
                <p key={email}>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              ))}
            </div>

            <div className="connect__block">
              <h3>WhatsApp</h3>
              {WHATSAPP_NUMBERS.map((num) => (
                <p key={num}>
                  <a
                    href={`https://wa.me/${num.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {num}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.22} className="connect__form-block">
          <h3>Send a message</h3>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
