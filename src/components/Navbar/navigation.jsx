import {
  photoEssays,
  galleries,
  videos,
  exhibitions,
  stories,
  books,
} from '../../content/collections.jsx'

// The navbar's shape, kept out of Navbar.jsx so the component stays about
// behaviour rather than copy. The entries themselves come from src/content —
// this file only says how they are grouped and where each group leads.
//
// An item with a `to` is a real route and renders as a link. An item without one
// is a page that hasn't been built yet: it renders as plain text, so the menu
// shows the full structure without sending anyone to a 404. Those paths will
// nest under their section — `/foto-ensayo/el-hielero-del-chimborazo` — so
// giving each entry a `to` is all that will be needed.

// Content entries are titles; menu entries are labels. One map between them.
const toItems = (entries) => entries.map(({ title }) => ({ label: title }))

// Panels come in two shapes. 'columns' is a row of groups, each with its heading
// above its own list. 'featured' is a single list under one heading, where the
// heading is also the link into the section.

export const menus = [
  {
    id: 'obra',
    label: 'Obra',
    layout: 'columns',
    groups: [
      {
        heading: 'Foto ensayo',
        to: '/foto-ensayo',
        items: toItems(photoEssays),
      },
      {
        heading: 'Foto galería',
        to: '/foto-galeria',
        items: toItems(galleries),
      },
      { heading: 'Vídeo', to: '/videos', items: toItems(videos) },
      {
        heading: 'Exposiciones',
        to: '/exposiciones',
        items: toItems(exhibitions),
      },
    ],
  },

  {
    id: 'historias',
    label: 'Historias',
    layout: 'featured',
    featured: {
      heading: 'Ver todas las historias',
      to: '/historias',
      items: toItems(stories),
    },
  },

  {
    id: 'libros',
    label: 'Libros',
    layout: 'featured',
    featured: {
      heading: 'Ver todos los libros',
      to: '/libros',
      items: toItems(books),
    },
  },

  {
    id: 'autor',
    label: 'Autor',
    layout: 'featured',
    featured: {
      heading: 'Juan Diego Perez Arias',
      // Routes rather than content: these two are pages, not a collection.
      items: [
        { label: 'Biografía', to: '/biografia' },
        { label: 'Contacto', to: '/contacto' },
      ],
    },
  },
]
