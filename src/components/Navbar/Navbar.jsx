import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.scss'

// One source of links for both the mobile overlay and the desktop row.
// `end` stops "/" matching every route, since all paths start with "/".
const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.classList.add('is-menu-open')
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.classList.remove('is-menu-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand" end>
        My Site
      </NavLink>

      <button
        type="button"
        className="navbar__toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {/* The icon is decorative; the .sr-only text is what gets announced */}
        {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <nav id="primary-nav" className={`navbar__links${open ? ' is-open' : ''}`}>
        {links.map(({ to, label, end }) => (
          // Navigating doesn't unmount the overlay, so each link closes it itself.
          <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
