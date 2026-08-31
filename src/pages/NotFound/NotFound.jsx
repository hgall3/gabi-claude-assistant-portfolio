import { Link } from 'react-router-dom'
import './NotFound.scss'

// Reached through the catch-all route in main.jsx. Netlify rewrites every
// unmatched path to index.html, so a bad URL arrives here rather than at a
// Netlify 404 page — this is what the visitor actually sees.
function NotFound() {
  return (
    <section className="page not-found">
      <p className="not-found__code text-small">Error 404</p>

      <h1>Page not found</h1>

      <p className="not-found__message">
        The page you were looking for doesn&rsquo;t exist, or it may have moved.
      </p>

      <Link to="/" className="not-found__home">
        Back to home
      </Link>
    </section>
  )
}

export default NotFound
