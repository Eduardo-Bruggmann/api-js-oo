import { renderNavbar } from './components/navbar.js'
import { renderHomePage } from './pages/home.js'
import { renderAuthorsPage } from './pages/authors/authors.js'
import { renderCreateAuthorPage } from './pages/authors/author-create.js'
import { renderEditAuthorPage } from './pages/authors/author-edit.js'
import { renderBooksPage } from './pages/books/books.js'
import { renderCreateBookPage } from './pages/books/book-create.js'
import { renderEditBookPage } from './pages/books/book-edit.js'

const routes = [
  {
    pattern: /^\/$/,
    handler: renderHomePage,
  },
  {
    pattern: /^\/books$/,
    handler: renderBooksPage,
  },
  {
    pattern: /^\/books\/new$/,
    handler: renderCreateBookPage,
  },
  {
    pattern: /^\/books\/(\d+)\/edit$/,
    handler: renderEditBookPage,
  },
  {
    pattern: /^\/authors$/,
    handler: renderAuthorsPage,
  },
  {
    pattern: /^\/authors\/new$/,
    handler: renderCreateAuthorPage,
  },
  {
    pattern: /^\/authors\/(\d+)\/edit$/,
    handler: renderEditAuthorPage,
  },
]

export function navigate(path) {
  window.history.pushState({}, '', path)

  router()
}

export function router() {
  const path = window.location.pathname

  renderLayout()

  for (const route of routes) {
    const match = path.match(route.pattern)

    if (match) {
      const params = match.slice(1)

      route.handler(...params)

      return
    }
  }

  renderNotFound()
}

export function setupNavigation() {
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-link]')

    if (!link) return

    event.preventDefault()

    navigate(link.getAttribute('href'))
  })
}

function renderNotFound() {
  const app = document.querySelector('#page')

  app.innerHTML = `
    <main class="mx-auto max-w-6xl px-4 py-8">
      <h1 class="text-2xl font-semibold text-stone-900">
        Página não encontrada
      </h1>
    </main>
  `
}

function renderLayout() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    ${renderNavbar()}
    <div id="page"></div>
  `
}

window.addEventListener('popstate', router)
