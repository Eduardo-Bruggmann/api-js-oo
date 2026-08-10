import { deleteAuthor, getAuthors } from '../../api/authors.api.js'

import { navigate } from '../../router.js'

export async function renderAuthorsPage() {
  const app = document.querySelector('#page')
  const currentPage = getCurrentPage()

  app.innerHTML = `
    <main class="mx-auto max-w-6xl px-4 py-8">
      <header class="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-stone-900">
            Autores
          </h1>

          <p class="mt-1 text-sm text-stone-500">
            Gerencie os autores cadastrados na biblioteca.
          </p>
        </div>

        <a
          href="/authors/new"
          data-link
          class="shrink-0 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Novo autor
        </a>
      </header>

      <p
        id="authors-message"
        class="mb-4 hidden text-sm"
      ></p>

      <div id="authors-content">
        <p class="text-sm text-stone-500">
          Carregando autores...
        </p>
      </div>
    </main>
  `

  await loadAuthors(currentPage)
}

async function loadAuthors(page = 1) {
  const content = document.querySelector('#authors-content')

  content.innerHTML = `
    <p class="text-sm text-stone-500">
      Carregando autores...
    </p>
  `

  try {
    const response = await getAuthors(page)

    renderAuthors(content, response.data, response.meta)
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

function renderAuthors(container, authors, meta) {
  if (authors.length === 0) {
    container.innerHTML = `
      <div class="rounded-lg border border-stone-200 bg-white p-8 text-center">
        <p class="font-medium text-stone-700">
          Nenhum autor cadastrado.
        </p>

        <p class="mt-1 text-sm text-stone-500">
          Cadastre um autor para começar.
        </p>

        <a
          href="/authors/new"
          data-link
          class="mt-4 inline-block rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Cadastrar autor
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
              Nome
            </th>

            <th class="px-4 py-3 text-sm font-medium text-stone-600">
              Nacionalidade
            </th>

            <th class="px-4 py-3 text-right text-sm font-medium text-stone-600">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          ${authors
            .map(
              author => `
                <tr class="border-b border-stone-100 last:border-0">
                  <td class="px-4 py-3 text-sm font-medium text-stone-900">
                    ${author.name}
                  </td>

                  <td class="px-4 py-3 text-sm text-stone-500">
                    ${author.nationality || 'Não informada'}
                  </td>

                  <td class="px-4 py-3 text-right">
                    <button
                      type="button"
                      class="edit-author rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 transition hover:bg-amber-200"
                      data-id="${author.id}"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      class="delete-author ml-2 rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-200"
                      data-id="${author.id}"
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
  setupDeleteButtons(container, authors)
  setupPaginationButtons(container, '/authors')
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
  const editButtons = container.querySelectorAll('.edit-author')

  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const authorId = button.dataset.id

      navigate(`/authors/${authorId}/edit`)
    })
  })
}

function setupDeleteButtons(container, authors) {
  const deleteButtons = container.querySelectorAll('.delete-author')

  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const authorId = Number(button.dataset.id)
      const author = authors.find(author => author.id === authorId)

      if (!author) return

      handleDeleteAuthor(author)
    })
  })
}

function getCurrentPage() {
  const page = Number(new URLSearchParams(window.location.search).get('page'))

  return Number.isInteger(page) && page > 0 ? page : 1
}

async function handleDeleteAuthor(author) {
  const confirmation = confirm(
    `Tem certeza que deseja excluir "${author.name}"? ` +
      'Os livros associados a este autor também serão excluídos. ' +
      'Esta ação não pode ser desfeita.',
  )

  if (!confirmation) return

  const message = document.querySelector('#authors-message')

  try {
    await deleteAuthor(author.id)

    message.textContent = 'Autor excluído com sucesso.'
    message.className = 'mb-4 text-sm text-green-700'

    await loadAuthors(getCurrentPage())
  } catch (error) {
    message.textContent = error.message
    message.className = 'mb-4 text-sm text-red-600'
  }
}
