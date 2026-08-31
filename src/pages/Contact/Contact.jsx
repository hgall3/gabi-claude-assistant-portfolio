import { usePageMeta } from '../../hooks/usePageMeta.js'
import './Contact.scss'

function Contact() {
  usePageMeta(
    'Contacto | Juan Diego Perez Arias',
    'Escribe a Juan Diego Perez Arias para encargos de fotografía, proyectos documentales o consultas sobre sus libros.',
  )

  return (
    <section className="page contact">
      <h1>Contact</h1>

      {/* Form */}
    </section>
  )
}

export default Contact
