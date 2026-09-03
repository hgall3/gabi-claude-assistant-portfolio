import { usePageMeta } from '../../hooks/usePageMeta.jsx'
import './Exhibitions.scss'

function Exhibitions() {
  usePageMeta(
    'Exposiciones | Juan Diego Perez Arias',
    'Exposiciones pasadas y en curso del trabajo fotográfico y documental de Juan Diego Perez Arias.',
  )

  return (
    <section className="page exhibitions">
      <h1>Exposiciones</h1>

      {/* Exhibition list */}
    </section>
  )
}

export default Exhibitions
