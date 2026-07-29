import { useState } from 'react'
import type { FormEvent } from 'react'
import './ContactForm.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never fill this hidden field.
    if (data.get('botcheck')) {
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const result = await response.json()

      if (result.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New enquiry from CeyNova website" />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="contact-form__honeypot"
        aria-hidden="true"
      />

      <div className="contact-form__field">
        <label htmlFor="cf-name">Full name</label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="contact-form__field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="contact-form__field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={4} required />
      </div>

      <button
        type="submit"
        className="button button--light"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Email us'}
      </button>

      <div className="contact-form__status" role="status" aria-live="polite">
        {status === 'success' &&
          'Thank you — your message has been sent. We will be in touch soon.'}
        {status === 'error' && (
          <>
            Something went wrong. Please try again, or email us directly at{' '}
            <a href="mailto:ransilige@gmail.com">ransilige@gmail.com</a>.
          </>
        )}
      </div>
    </form>
  )
}
