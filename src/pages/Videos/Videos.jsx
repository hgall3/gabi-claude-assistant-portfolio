import { usePageMeta } from '../../hooks/usePageMeta.js'
import './Videos.scss'

function Videos() {
  usePageMeta(
    'Videos | Juan Diego Perez Arias',
    'Documentales y piezas audiovisuales de Juan Diego Perez Arias sobre los lugares y las personas que retrata en Ecuador.',
  )

  return (
    <section className="page videos">
      <h1>Videos</h1>

      {/* Video list */}
    </section>
  )
}

export default Videos
