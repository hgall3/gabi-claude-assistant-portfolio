import { usePageMeta } from '../../hooks/usePageMeta.js'
import './Home.scss'

function Home() {
  usePageMeta(
    'Juan Diego Perez Arias | Fotógrafo, documentalista y escritor',
    'Fotógrafo, documentalista y escritor ecuatoriano. Recorre el país fotografiando lugares remotos e historias olvidadas. Conoce sus libros y documentales.',
  )

  return (
    <section className="page home">
      <h1>Inicio</h1>

      {/* Hero */}
      {/* Featured work */}
    </section>
  )
}

export default Home
