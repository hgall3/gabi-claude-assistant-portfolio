import { usePageMeta } from '../../hooks/usePageMeta.js'
import './About.scss'

function About() {
  usePageMeta(
    'Sobre mí | Juan Diego Perez Arias',
    'Conoce a Juan Diego Perez Arias: su trayectoria como fotógrafo, documentalista y escritor, y el trabajo que lo lleva a los rincones remotos del Ecuador.',
  )

  return (
    <section className="page about">
      <h1>About Me</h1>

      {/* Bio */}
      {/* Skills */}
    </section>
  )
}

export default About
