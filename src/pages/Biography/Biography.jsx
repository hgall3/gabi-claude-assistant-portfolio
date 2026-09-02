import { usePageMeta } from '../../hooks/usePageMeta.jsx'
import './Biography.scss'

function Biography() {
  usePageMeta(
    'Biografía | Juan Diego Perez Arias',
    'Conoce la trayectoria de Juan Diego Perez Arias, fotógrafo, documentalista y escritor ecuatoriano que recorre el país documentando lugares remotos.',
  )

  return (
    <section className="page biography">
      <h1>Biografía</h1>

      {/* Bio */}
      {/* Career highlights */}
    </section>
  )
}

export default Biography
