// The navbar's content, kept out of Navbar.jsx so the component stays about
// behaviour rather than copy.
//
// An item with a `to` is a real route and renders as a link. An item without one
// is a page that hasn't been built yet: it renders as plain text, so the menu
// shows the full structure without sending anyone to a 404. When those pages are
// built their paths nest under their section — `/foto-ensayo/el-hielero-del-chimborazo`,
// `/libros/miradas` — so adding a `to` here is all this file will need.

// Panels come in two shapes. 'columns' puts each group's heading above its own
// list, side by side. 'featured' is a see-all link on the left and a single
// highlighted list on the right.

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
        heading: 'Otros',
        // On mobile these two stand on their own rather than behind an "Otros"
        // accordion — there is no third level worth tapping through for them.
        flatten: true,
        items: [
          { label: 'Vídeo', to: '/videos' },
          { label: 'Exposiciones', to: '/exposiciones' },
        ],
      },
    ],
  },

  {
    id: 'historias',
    label: 'Historias',
    layout: 'featured',
    seeAll: { label: 'Todas las historias', to: '/historias' },
    featured: {
      heading: 'Destacadas',
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
    seeAll: { label: 'Ver todos los libros', to: '/libros' },
    featured: {
      heading: 'Destacados',
      // Subtitles are the half after the first dash in the title Juan Diego
      // supplied. Only the first one splits: "1934-1980" is part of a subtitle,
      // not another separator.
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
    // No see-all link: both destinations are already in the list below it, so a
    // third link to one of them would just be a duplicate.
    featured: {
      heading: 'Juan Diego Perez Arias',
      items: [
        { label: 'Biografía', to: '/biografia' },
        { label: 'Contacto', to: '/contacto' },
      ],
    },
  },
]

// Shown at the foot of the mobile panel only.
export const contact = {
  email: 'jdiegoperezarias@gmail.com',
  phone: '+593 99 814 7056',
  // tel: links can't contain spaces.
  phoneHref: '+593998147056',
}

export const socials = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/juan-diego-p%C3%A9rez-arias-697a1754/',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCUnv5Bm-HMRDcSBaeXeDhHA',
  },
]
