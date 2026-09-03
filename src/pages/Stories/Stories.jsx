import { usePageMeta } from '../../hooks/usePageMeta.jsx'
import './Stories.scss'

function Stories() {
  usePageMeta(
    'Historias | Juan Diego Perez Arias',
    'Crónicas y apuntes de viaje de Juan Diego Perez Arias sobre los lugares remotos y las historias olvidadas que documenta en Ecuador.',
  )

  return (
    <section className="page stories">
      <h1>Historias</h1>

      {/* Story list */}
    </section>
  )
}

export default Stories
