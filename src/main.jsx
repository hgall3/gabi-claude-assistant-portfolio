import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home/Home.jsx'
import Biography from './pages/Biography/Biography.jsx'
import PhotoGallery from './pages/PhotoGallery/PhotoGallery.jsx'
import PhotoEssay from './pages/PhotoEssay/PhotoEssay.jsx'
import Books from './pages/Books/Books.jsx'
import Videos from './pages/Videos/Videos.jsx'
import Exhibitions from './pages/Exhibitions/Exhibitions.jsx'
import Stories from './pages/Stories/Stories.jsx'
import Contact from './pages/Contact/Contact.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

// App is the layout every route renders inside of, via <Outlet />.
//
// Paths are Spanish because they are read by the visitor, while the components
// they point at keep English names. Slugs stay unaccented and hyphenated —
// an accent or ñ in a URL gets percent-escaped and is unreadable once copied.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'biografia', element: <Biography /> },
      { path: 'foto-galeria', element: <PhotoGallery /> },
      { path: 'foto-ensayo', element: <PhotoEssay /> },
      { path: 'libros', element: <Books /> },
      { path: 'videos', element: <Videos /> },
      { path: 'exposiciones', element: <Exhibitions /> },
      { path: 'historias', element: <Stories /> },
      { path: 'contacto', element: <Contact /> },
      // Catch-all, kept last. Sits inside the layout rather than replacing it,
      // so a visitor who lands on a bad URL still has the navbar to leave by.
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
