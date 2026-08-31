import { useEffect } from 'react'

// Sets the document title and meta description for the route that calls it.
//
// index.html carries the site-level pair as a fallback, because nothing here is
// prerendered: a crawler or social scraper that doesn't run JS only ever sees
// those static tags. This hook rewrites them in place rather than rendering its
// own, so the page never ends up with two titles or two descriptions.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title

    let tag = document.head.querySelector('meta[name="description"]')

    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }

    tag.setAttribute('content', description)
  }, [title, description])
}
