import { deleteBook, getBooks } from '../../api/books.api.js'

import { navigate } from '../../router.js'

export async function renderBooksPage() {
  const app = document.querySelector('#page')
  const currentPage = getCurrentPage()

  app.innerHTML = `
    <main class="mx-auto max-w-6xl px-4 py-8">
      <header class="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-stone-900">
            Livros
          </h1>

          <p class="mt-1 text-sm text-stone-500">
            Gerencie os livros cadastrados na biblioteca.
          </p>
        </div>

        <a
          href="/books/new"
          data-link
          class="shrink-0 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Novo livro
        </a>
      </header>

      <p
        id="books-message"
        class="mb-4 hidden text-sm"
      ></p>

      <div id="books-content">
        <p class="text-sm text-stone-500">
          Carregando livros...
        </p>
      </div>
    </main>
  `

  await loadBooks(currentPage)
}

async function loadBooks(page = 1) {
  const content = document.querySelector('#books-content')

  content.innerHTML = `
    <p class="text-sm text-stone-500">
      Carregando livros...
    </p>
  `

  try {
    const response = await getBooks(page)

    renderBooks(content, response.data, response.meta)
  } catch (error) {
    content.innerHTML = `
      <div class="rounded-lg border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">
          ${error.message}
        </p>
      </div>
    `
  }
}

function renderBooks(container, books, meta) {
  if (books.length === 0) {
    container.innerHTML = `
      <div class="rounded-lg border border-stone-200 bg-white p-8 text-center">
        <p class="font-medium text-stone-700">
          Nenhum livro cadastrado.
        </p>

        <p class="mt-1 text-sm text-stone-500">
          Cadastre um livro para começar.
        </p>

        <a
          href="/books/new"
          data-link
          class="mt-4 inline-block rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Cadastrar livro
        </a>
      </div>
    `

    return
  }

  container.innerHTML = `
    <div class="overflow-x-auto rounded-lg border border-stone-200 bg-white">
      <table class="w-full text-left">
        <thead class="border-b border-stone-200 bg-stone-50">
          <tr>
            <th class="px-4 py-3 text-sm font-medium text-stone-600">
              Título
            </th>

            <th class="px-4 py-3 text-sm font-medium text-stone-600">
              Ano
            </th>

            <th class="px-4 py-3 text-sm font-medium text-stone-600">
              Autor
            </th>

            <th class="px-4 py-3 text-right text-sm font-medium text-stone-600">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          ${books
            .map(
              book => `
                <tr class="border-b border-stone-100 last:border-0">
                  <td class="px-4 py-3 text-sm font-medium text-stone-900">
                    ${book.title}
                  </td>

                  <td class="px-4 py-3 text-sm text-stone-500">
                    ${book.publication_year}
                  </td>

                  <td class="px-4 py-3 text-sm text-stone-500">
                    ${book.author?.name || `Autor #${book.author_id}`}
                  </td>

                  <td class="px-4 py-3 text-right">
                    <button
                      type="button"
                      class="edit-book rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 transition hover:bg-amber-200"
                      data-id="${book.id}"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      class="delete-book ml-2 rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-200"
                      data-id="${book.id}"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </div>

    ${renderPagination(meta)}
  `

  setupEditButtons(container)
  setupDeleteButtons(container, books)
  setupPaginationButtons(container, '/books')
}

function renderPagination(meta) {
  if (!meta || meta.totalPages <= 1) return ''

  return `
    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p class="text-sm text-stone-500">
        Página ${meta.page} de ${meta.totalPages} · ${meta.total} registros
      </p>

      <div class="flex gap-2">
        <button
          type="button"
          class="pagination-button rounded-md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
          data-page="${meta.page - 1}"
          ${meta.page <= 1 ? 'disabled' : ''}
        >
          Anterior
        </button>

        <button
          type="button"
          class="pagination-button rounded-md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
          data-page="${meta.page + 1}"
          ${meta.page >= meta.totalPages ? 'disabled' : ''}
        >
          Próxima
        </button>
      </div>
    </div>
  `
}

function setupPaginationButtons(container, path) {
  const paginationButtons = container.querySelectorAll('.pagination-button')

  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigate(`${path}?page=${button.dataset.page}`)
    })
  })
}

function setupEditButtons(container) {
  const editButtons = container.querySelectorAll('.edit-book')

  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const bookId = button.dataset.id

      navigate(`/books/${bookId}/edit`)
    })
  })
}

function setupDeleteButtons(container, books) {
  const deleteButtons = container.querySelectorAll('.delete-book')

  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const bookId = Number(button.dataset.id)
      const book = books.find(book => book.id === bookId)

      if (!book) return

      handleDeleteBook(book)
    })
  })
}

function getCurrentPage() {
  const page = Number(new URLSearchParams(window.location.search).get('page'))

  return Number.isInteger(page) && page > 0 ? page : 1
}

async function handleDeleteBook(book) {
  const confirmation = confirm(
    `Tem certeza que deseja excluir "${book.title}"? ` +
      'Esta ação não pode ser desfeita.',
  )

  if (!confirmation) return

  const message = document.querySelector('#books-message')

  try {
    await deleteBook(book.id)

    message.textContent = 'Livro excluído com sucesso.'
    message.className = 'mb-4 text-sm text-green-700'

    await loadBooks(getCurrentPage())
  } catch (error) {
    message.textContent = error.message
    message.className = 'mb-4 text-sm text-red-600'
  }
}
