import { FaLinkedin, FaGithub, FaBehance } from 'react-icons/fa'
import './Footer.scss'

// TODO: swap these for your real profile URLs
const socials = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/your-handle',
    Icon: FaLinkedin,
  },
  { name: 'GitHub', url: 'https://github.com/your-handle', Icon: FaGithub },
  { name: 'Behance', url: 'https://behance.net/your-handle', Icon: FaBehance },
]

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">
        © {new Date().getFullYear()} Juan Diego Perez Arias
      </p>

      <ul className="footer__socials">
        {socials.map(({ name, url, Icon }) => (
          <li key={name}>
            <a href={url} target="_blank" rel="noreferrer" title={name}>
              {/* The icon is decorative; the .sr-only text is what gets announced */}
              <Icon aria-hidden="true" />
              <span className="sr-only">
                {name} (se abre en una pestaña nueva)
              </span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}

export default Footer
