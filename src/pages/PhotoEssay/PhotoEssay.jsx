import { usePageMeta } from '../../hooks/usePageMeta.js'
import './PhotoEssay.scss'

function PhotoEssay() {
  usePageMeta(
    'Foto Ensayo | Juan Diego Perez Arias',
    'Foto ensayos de Juan Diego Perez Arias, donde la imagen y el texto se unen para contar historias olvidadas del Ecuador.',
  )

  return (
    <section className="page photo-essay">
      <h1>Foto Ensayo</h1>

      {/* Essay list */}
    </section>
  )
}

export default PhotoEssay
