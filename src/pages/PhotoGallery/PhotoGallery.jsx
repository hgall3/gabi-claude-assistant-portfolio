import { usePageMeta } from '../../hooks/usePageMeta.js'
import './PhotoGallery.scss'

function PhotoGallery() {
  usePageMeta(
    'Foto Galería | Juan Diego Perez Arias',
    'Galería fotográfica de Juan Diego Perez Arias: retratos, paisajes y escenas de los rincones más remotos del Ecuador.',
  )

  return (
    <section className="page photo-gallery">
      <h1>Foto Galería</h1>

      {/* Gallery grid */}
    </section>
  )
}

export default PhotoGallery
