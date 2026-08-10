import { getAuthor, updateAuthor } from '../../api/authors.api.js'
import { navigate } from '../../router.js'

export async function renderEditAuthorPage(id) {
  const app = document.querySelector('#page')

  app.innerHTML = `
    <main class="mx-auto max-w-2xl px-4 py-8">
      <p class="text-sm text-stone-500">
        Carregando autor...
      </p>
    </main>
  `

  try {
    const author = await getAuthor(id)

    renderForm(author)
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

function renderForm(author) {
  const app = document.querySelector('#page')

  app.innerHTML = `
    <main class="mx-auto max-w-2xl px-4 py-8">
      <header class="mb-6">
        <h1 class="text-2xl font-semibold text-stone-900">
          Editar autor
        </h1>
      </header>

      <form
        id="author-form"
        class="rounded-lg border border-stone-200 bg-white p-6"
      >
        <div class="space-y-4">
          <div>
            <label
              for="name"
              class="mb-1 block text-sm font-medium text-stone-700"
            >
              Nome
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value="${author.name}"
              class="w-full rounded-md border border-stone-300 px-3 py-2"
            >
          </div>

          <div>
            <label
              for="nationality"
              class="mb-1 block text-sm font-medium text-stone-700"
            >
              Nacionalidade
            </label>

            <input
              id="nationality"
              name="nationality"
              type="text"
              value="${author.nationality || ''}"
              class="w-full rounded-md border border-stone-300 px-3 py-2"
            >
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
            Salvar alterações
          </button>
        </div>
      </form>
    </main>
  `

  const form = document.querySelector('#author-form')

  form.addEventListener('submit', event => {
    handleSubmit(event, author.id)
  })

  document.querySelector('#cancel').addEventListener('click', () => {
    navigate('/authors')
  })
}

async function handleSubmit(event, id) {
  event.preventDefault()

  const form = event.currentTarget
  const button = form.querySelector('button[type="submit"]')
  const message = document.querySelector('#form-message')

  const formData = new FormData(form)

  const author = {
    name: formData.get('name').trim(),
    nationality: formData.get('nationality').trim() || null,
  }

  try {
    button.disabled = true
    button.textContent = 'Salvando...'

    await updateAuthor(id, author)

    navigate('/authors')
  } catch (error) {
    message.textContent = error.message
    message.className = 'mt-4 text-sm text-red-600'
  } finally {
    button.disabled = false
    button.textContent = 'Salvar alterações'
  }
}
