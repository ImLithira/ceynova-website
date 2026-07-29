import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__row">
        <span className="footer__mark">CeyNova</span>
        <span className="footer__meta">
          © {year} CeyNova. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
