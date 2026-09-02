import { Link } from 'react-router-dom'
import { usePageMeta } from '../../hooks/usePageMeta.jsx'
import './NotFound.scss'

// Reached through the catch-all route in main.jsx. Netlify rewrites every
// unmatched path to index.html, so a bad URL arrives here rather than at a
// Netlify 404 page — this is what the visitor actually sees.
function NotFound() {
  usePageMeta(
    'Página no encontrada | Juan Diego Perez Arias',
    'La página que buscas no existe o fue movida. Vuelve al inicio para explorar la fotografía, los libros y los documentales de Juan Diego Perez Arias.',
  )

  return (
    <section className="page not-found">
      <p className="not-found__code text-small">Error 404</p>

      <h1>Página no encontrada</h1>

      <p className="not-found__message">
        La página que buscas no existe, o puede haber cambiado de dirección.
      </p>

      <Link to="/" className="not-found__home">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound
