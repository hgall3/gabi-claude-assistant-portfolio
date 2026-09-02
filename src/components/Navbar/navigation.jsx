// The navbar's content, kept out of Navbar.jsx so the component stays about
// behaviour rather than copy.
//
// An item with a `to` is a real route and renders as a link. An item without one
// is a page that hasn't been built yet: it renders as plain text, so the menu
// shows the full structure without sending anyone to a 404. When those pages are
// built their paths nest under their section — `/foto-ensayo/el-hielero-del-chimborazo`,
// `/libros/miradas` — so adding a `to` here is all this file will need.

// Panels come in two shapes. 'columns' is a row of groups, each with its heading
// above its own list; a group with no items is just a heading that links
// somewhere. 'featured' is a single list under one heading.

export const menus = [
  {
    id: 'obra',
    label: 'Obra',
    layout: 'columns',
    groups: [
      {
        heading: 'Foto ensayo',
        to: '/foto-ensayo',
        items: [
          { label: 'El hielero del Chimborazo' },
          { label: 'Sionas del Cuyabeno' },
          { label: 'Fuego cruzado' },
          { label: 'Ojo con el tigre' },
        ],
      },
      {
        heading: 'Foto galería',
        to: '/foto-galeria',
        items: [
          { label: 'Paisaje' },
          { label: 'Gente' },
          { label: 'Flora y fauna' },
          { label: 'Quito' },
        ],
      },
      {
        heading: 'Vídeo',
        to: '/videos',
        items: [
          { label: 'Ecuador rostros del agua' },
          { label: 'Yasuní' },
          { label: 'Ecuador la vida en estado puro' },
          { label: 'Quito, la ciudad imaginaria' },
          { label: 'Relatos de un caminar' },
        ],
      },
      {
        heading: 'Exposiciones',
        to: '/exposiciones',
        items: [{ label: 'Miradas' }],
      },
    ],
  },

  {
    id: 'historias',
    label: 'Historias',
    layout: 'featured',
    featured: {
      // The heading is the way through to the section — there is no second
      // see-all link repeating it.
      heading: 'Ver todas las historias',
      to: '/historias',
      items: [
        { label: 'La niña del vestido amarillo' },
        { label: 'Caminos de identidad' },
        { label: 'De ángeles y otras criaturas emplumadas' },
        { label: 'El tigre del Yasuní' },
        { label: 'Camino de piedra' },
        { label: 'Los nombres y las estrellas en Warchipas' },
      ],
    },
  },

  {
    id: 'libros',
    label: 'Libros',
    layout: 'featured',
    featured: {
      heading: 'Ver todos los libros',
      to: '/libros',
      // Subtitles are the half after the first dash in the title Juan Diego
      // supplied — only the first dash splits, since "1934-1980" belongs to a
      // subtitle rather than being another separator. The navbar shows titles
      // alone; these are kept for the Libros page, which will want them.
      items: [
        { label: 'Miradas', subtitle: 'Por los caminos de un país oculto' },
        { label: 'Los restos de viaje', subtitle: 'Días de cámara' },
        { label: 'Sobre vivir', subtitle: 'Huella nefasta de Texaco en Ecuador' },
        { label: 'Sapos mariposas y orquídeas en la línea equinoccial' },
        {
          label: 'Amnesia',
          subtitle:
            'Tras las huellas de unos fotógrafos olvidados… En busca de un país perdido',
        },
        {
          label: 'La mirada silenciosa',
          subtitle: 'Gottfried Hirtz fotografías 1934-1980',
        },
        { label: 'El río de las palabras', subtitle: 'Días de cámara' },
      ],
    },
  },

  {
    id: 'autor',
    label: 'Autor',
    layout: 'featured',
    featured: {
      heading: 'Juan Diego Perez Arias',
      items: [
        { label: 'Biografía', to: '/biografia' },
        { label: 'Contacto', to: '/contacto' },
      ],
    },
  },
]
