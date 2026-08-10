import { getAuthors } from '../../api/authors.api.js'
import { createBook } from '../../api/books.api.js'
import { navigate } from '../../router.js'

export async function renderCreateBookPage() {
  const app = document.querySelector('#page')

  app.innerHTML = `
    <main class="mx-auto max-w-2xl px-4 py-8">
      <p class="text-sm text-stone-500">
        Carregando formulário...
      </p>
    </main>
  `

  try {
    const response = await getAuthors(1, 100)

    renderForm(response.data)
  } catch (error) {
    app.innerHTML = `
      <main class="mx-auto max-w-2xl px-4 py-8">
        <p class="text-sm text-red-600">
          ${error.message}
        </p>
      </main>
    `
  }
}

function renderForm(authors) {
  const app = document.querySelector('#page')

  app.innerHTML = `
    <main class="mx-auto max-w-2xl px-4 py-8">
      <header class="mb-6">
        <h1 class="text-2xl font-semibold text-stone-900">
          Novo livro
        </h1>

        <p class="mt-1 text-sm text-stone-500">
          Cadastre um novo livro na biblioteca.
        </p>
      </header>

      <form
        id="book-form"
        class="rounded-lg border border-stone-200 bg-white p-6"
      >
        <div class="space-y-4">
          <div>
            <label
              for="title"
              class="mb-1 block text-sm font-medium text-stone-700"
            >
              Título
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              class="w-full rounded-md border border-stone-300 px-3 py-2"
            >
          </div>

          <div>
            <label
              for="publication_year"
              class="mb-1 block text-sm font-medium text-stone-700"
            >
              Ano de publicação
            </label>

            <input
              id="publication_year"
              name="publication_year"
              type="number"
              required
              min="1"
              class="w-full rounded-md border border-stone-300 px-3 py-2"
            >
          </div>

          <div>
            <label
              for="author_id"
              class="mb-1 block text-sm font-medium text-stone-700"
            >
              Autor
            </label>

            <select
              id="author_id"
              name="author_id"
              required
              class="w-full rounded-md border border-stone-300 px-3 py-2"
            >
              <option value="">Selecione um autor</option>
              ${authors
                .map(
                  author => `
                    <option value="${author.id}">
                      ${author.name}
                    </option>
                  `,
                )
                .join('')}
            </select>
          </div>
        </div>

        <p
          id="form-message"
          class="mt-4 hidden text-sm"
        ></p>

        <div class="mt-6 flex justify-end gap-2">
          <button
            id="cancel"
            type="button"
            class="rounded-md border border-stone-300 px-4 py-2 text-sm"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white"
          >
            Cadastrar livro
          </button>
        </div>
      </form>
    </main>
  `

  const form = document.querySelector('#book-form')
  const cancelButton = document.querySelector('#cancel')

  form.addEventListener('submit', handleSubmit)

  cancelButton.addEventListener('click', () => {
    navigate('/books')
  })
}

async function handleSubmit(event) {
  event.preventDefault()

  const form = event.currentTarget
  const button = form.querySelector('button[type="submit"]')
  const message = document.querySelector('#form-message')

  const formData = new FormData(form)

  const book = {
    title: formData.get('title').trim(),
    publication_year: Number(formData.get('publication_year')),
    author_id: Number(formData.get('author_id')),
  }

  try {
    button.disabled = true
    button.textContent = 'Cadastrando...'

    await createBook(book)

    navigate('/books')
  } catch (error) {
    message.textContent = error.message
    message.className = 'mt-4 text-sm text-red-600'
  } finally {
    button.disabled = false
    button.textContent = 'Cadastrar livro'
  }
}
