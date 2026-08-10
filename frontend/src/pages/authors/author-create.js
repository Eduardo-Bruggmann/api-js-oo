import { createAuthor } from '../../api/authors.api.js'
import { navigate } from '../../router.js'

export function renderCreateAuthorPage() {
  const app = document.querySelector('#page')

  app.innerHTML = `
    <main class="mx-auto max-w-2xl px-4 py-8">
      <header class="mb-6">
        <h1 class="text-2xl font-semibold text-stone-900">
          Novo autor
        </h1>

        <p class="mt-1 text-sm text-stone-500">
          Cadastre um novo autor na biblioteca.
        </p>
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
            Cadastrar autor
          </button>
        </div>
      </form>
    </main>
  `

  const form = document.querySelector('#author-form')
  const cancelButton = document.querySelector('#cancel')

  form.addEventListener('submit', handleSubmit)

  cancelButton.addEventListener('click', () => {
    navigate('/authors')
  })
}

async function handleSubmit(event) {
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
    button.textContent = 'Cadastrando...'

    await createAuthor(author)

    navigate('/authors')
  } catch (error) {
    message.textContent = error.message
    message.className = 'mt-4 text-sm text-red-600'
  } finally {
    button.disabled = false
    button.textContent = 'Cadastrar autor'
  }
}
