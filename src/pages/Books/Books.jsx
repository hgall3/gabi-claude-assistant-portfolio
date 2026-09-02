import { usePageMeta } from '../../hooks/usePageMeta.jsx'
import './Books.scss'

function Books() {
  usePageMeta(
    'Libros | Juan Diego Perez Arias',
    'Los libros publicados por Juan Diego Perez Arias, entre la crónica, la fotografía documental y la memoria del Ecuador.',
  )

  return (
    <section className="page books">
      <h1>Libros</h1>

      {/* Book list */}
    </section>
  )
}

export default Books
