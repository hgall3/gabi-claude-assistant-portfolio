import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaLinkedin, FaYoutube } from 'react-icons/fa'
import { menus, contact, socials } from './navigation.js'
import Signature from '../Signature/Signature.jsx'
import './Navbar.scss'

// Scroll distances that drive the bar's two behaviours.
const HIDE_AFTER = 80 // px scrolled down before the bar leaves
const SHRINK_AFTER = 40 // px before the signature steps down in size

// One item in a dropdown. Items without a `to` are pages that don't exist yet,
// so they render as text rather than as a link to nowhere.
function PanelItem({ item, onNavigate }) {
  const body = (
    <>
      <span>{item.label}</span>
      {item.subtitle && (
        <span className="navbar__subtitle">{item.subtitle}</span>
      )}
    </>
  )

  if (!item.to) {
    return <span className="navbar__item navbar__item--inert">{body}</span>
  }

  return (
    <Link to={item.to} className="navbar__item" onClick={onNavigate}>
      {body}
    </Link>
  )
}

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState(null)
  const [hidden, setHidden] = useState(false)
  const [shrunk, setShrunk] = useState(false)

  const headerRef = useRef(null)
  // True only while the bar is on screen because the cursor found the reveal
  // strip. Leaving the bar re-hides it in that case and in no other — otherwise
  // the nav would vanish every time the pointer wandered off the top of a page.
  const revealedByHover = useRef(false)
  const location = useLocation()

  const closeAll = useCallback(() => {
    setOpenMenu(null)
    setMobileOpen(false)
    setOpenSection(null)
  }, [])

  // Close on navigation. Every in-app link already closes on click, but browser
  // back and forward go through no handler of ours. Adjusting state during the
  // render that follows the route change — rather than in an effect — means the
  // menu is never briefly painted open on top of the new page.
  const [lastPath, setLastPath] = useState(location.pathname)

  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setOpenMenu(null)
    setMobileOpen(false)
    setOpenSection(null)
  }

  // Hide on the way down, come back on the way up.
  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const onScroll = () => {
      if (frame) return

      // Scroll fires far faster than the screen repaints; batching into a frame
      // keeps this off the critical path.
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY

        setShrunk(y > SHRINK_AFTER)

        if (y > HIDE_AFTER && y > lastY) {
          setHidden(true)
          setOpenMenu(null)
          revealedByHover.current = false
        } else if (y < lastY) {
          setHidden(false)
          revealedByHover.current = false
        }

        lastY = y
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Escape closes whatever is open.
  useEffect(() => {
    if (!openMenu && !mobileOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeAll()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openMenu, mobileOpen, closeAll])

  // A press anywhere outside the header closes the open panel. pointerdown
  // rather than click, so the panel is gone before the press completes.
  useEffect(() => {
    if (!openMenu) return

    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpenMenu(null)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openMenu])

  // Stop the page behind the full-screen mobile panel from scrolling.
  useEffect(() => {
    if (!mobileOpen) return

    document.body.classList.add('is-menu-open')
    return () => document.body.classList.remove('is-menu-open')
  }, [mobileOpen])

  const activeMenu = menus.find((menu) => menu.id === openMenu)

  return (
    <>
      {/* An invisible strip along the top edge. Only mounted while the bar is
          away, so it can never swallow a click meant for the page. */}
      {hidden && !mobileOpen && (
        <div
          className="navbar__reveal"
          aria-hidden="true"
          onMouseEnter={() => {
            revealedByHover.current = true
            setHidden(false)
          }}
        />
      )}

      <header
        ref={headerRef}
        className={`navbar${hidden ? ' is-hidden' : ''}${shrunk ? ' is-shrunk' : ''}`}
        onMouseLeave={() => {
          // Only undo a hover-reveal, and never while a panel is open — the
          // pointer has to be able to leave on its way to the page.
          if (revealedByHover.current && !openMenu) {
            revealedByHover.current = false
            setHidden(true)
          }
        }}
      >
        <div className="navbar__bar">
          <Link to="/" className="navbar__brand" onClick={closeAll}>
            <Signature className="navbar__signature" />
          </Link>

          <nav className="navbar__nav" aria-label="Principal">
            {menus.map((menu) => (
              <button
                key={menu.id}
                type="button"
                className={`navbar__trigger${openMenu === menu.id ? ' is-open' : ''}`}
                aria-expanded={openMenu === menu.id}
                aria-controls={`nav-panel-${menu.id}`}
                onClick={() =>
                  setOpenMenu((current) =>
                    current === menu.id ? null : menu.id,
                  )
                }
              >
                {menu.label}
                <span className="navbar__caret" aria-hidden="true">
                  ▾
                </span>
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="navbar__burger"
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="navbar__stroke" aria-hidden="true" />
            <span className="navbar__stroke" aria-hidden="true" />
            <span className="sr-only">Abrir menú</span>
          </button>
        </div>

        {/* Inside the header on purpose: as a sibling it would sit outside the
            hover region, and moving the pointer into it would read as leaving
            the bar. */}
        {activeMenu && (
          <div
            id={`nav-panel-${activeMenu.id}`}
            role="region"
            aria-label={activeMenu.label}
            className="navbar__panel"
          >
            {activeMenu.layout === 'columns' ? (
              <div className="navbar__columns">
                {activeMenu.groups.map((group) => (
                  <div key={group.heading} className="navbar__group">
                    {group.to ? (
                      <NavLink
                        to={group.to}
                        className="navbar__heading navbar__heading--link"
                        onClick={closeAll}
                      >
                        {group.heading}
                      </NavLink>
                    ) : (
                      <p className="navbar__heading">{group.heading}</p>
                    )}

                    <div className="navbar__list">
                      {group.items.map((item) => (
                        <PanelItem
                          key={item.label}
                          item={item}
                          onNavigate={closeAll}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="navbar__featured">
                {activeMenu.seeAll && (
                  <NavLink
                    to={activeMenu.seeAll.to}
                    className="navbar__see-all"
                    onClick={closeAll}
                  >
                    {activeMenu.seeAll.label}
                  </NavLink>
                )}

                <div className="navbar__group">
                  {activeMenu.featured.heading && (
                    <p className="navbar__heading">
                      {activeMenu.featured.heading}
                    </p>
                  )}

                  <div className="navbar__list navbar__list--rows">
                    {activeMenu.featured.items.map((item) => (
                      <PanelItem
                        key={item.label}
                        item={item}
                        onNavigate={closeAll}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {mobileOpen && (
        <div id="nav-mobile" className="navbar__mobile">
          <div className="navbar__mobile-head">
            <Link to="/" className="navbar__brand" onClick={closeAll}>
              <Signature className="navbar__signature" />
            </Link>

            <button
              type="button"
              className="navbar__close"
              onClick={() => setMobileOpen(false)}
            >
              <span aria-hidden="true">✕</span>
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>

          <nav className="navbar__mobile-nav" aria-label="Principal">
            {menus.map((menu, index) => {
              const items =
                menu.layout === 'columns'
                  ? menu.groups.flatMap((group) => group.items)
                  : menu.featured.items
              const expanded = openSection === menu.id

              return (
                <div key={menu.id} className="navbar__accordion">
                  <button
                    type="button"
                    className="navbar__accordion-trigger"
                    aria-expanded={expanded}
                    aria-controls={`nav-section-${menu.id}`}
                    onClick={() =>
                      setOpenSection((current) =>
                        current === menu.id ? null : menu.id,
                      )
                    }
                  >
                    <span className="navbar__number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {menu.label}
                  </button>

                  {expanded && (
                    <div id={`nav-section-${menu.id}`} className="navbar__sub">
                      {menu.seeAll && (
                        <NavLink
                          to={menu.seeAll.to}
                          className="navbar__see-all"
                          onClick={closeAll}
                        >
                          {menu.seeAll.label}
                        </NavLink>
                      )}

                      {items.map((item) => (
                        <PanelItem
                          key={item.label}
                          item={item}
                          onNavigate={closeAll}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="navbar__mobile-foot">
            <ul className="navbar__socials">
              {socials.map(({ name, url }) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {/* The icon is decorative; the .sr-only text is what gets announced */}
                    {name === 'LinkedIn' ? (
                      <FaLinkedin aria-hidden="true" />
                    ) : (
                      <FaYoutube aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {name} (se abre en una pestaña nueva)
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a href={`mailto:${contact.email}`} className="navbar__contact">
              {contact.email}
            </a>
            <a href={`tel:${contact.phoneHref}`} className="navbar__contact">
              {contact.phone}
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
