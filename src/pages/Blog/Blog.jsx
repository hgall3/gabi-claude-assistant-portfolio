import { usePageMeta } from '../../hooks/usePageMeta.js'
import './Blog.scss'

function Blog() {
  usePageMeta(
    'Blog | Juan Diego Perez Arias',
    'Crónicas, apuntes de viaje y fotografías de Juan Diego Perez Arias sobre los lugares remotos y las historias olvidadas que documenta en Ecuador.',
  )

  return (
    <section className="page blog">
      <h1>Blog</h1>

      {/* Post list */}
    </section>
  )
}

export default Blog
