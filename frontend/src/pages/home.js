export function renderHomePage() {
  const app = document.querySelector('#page')

  app.innerHTML = `
    <main class="mx-auto max-w-4xl px-4 py-10">
      <section>
        <p class="text-sm font-medium text-amber-700">
          Biblioteca
        </p>

        <h1 class="mt-2 text-3xl font-semibold text-stone-900">
          Gerenciamento de livros e autores
        </h1>

        <p class="mt-3 max-w-2xl text-stone-600">
          Projeto full stack para cadastrar, consultar, editar e excluir os
          registros de uma biblioteca.
        </p>
      </section>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href="/books"
          data-link
          class="rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          Ver livros
        </a>

        <a
          href="/authors"
          data-link
          class="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          Ver autores
        </a>
      </div>

      <dl class="mt-8 grid gap-4 border-t border-stone-200 pt-6 sm:grid-cols-3">
        <div>
          <dt class="text-sm font-medium text-stone-900">
            Backend
          </dt>
          <dd class="mt-1 text-sm text-stone-500">
            Node.js, Express, Prisma e SQLite.
          </dd>
        </div>

        <div>
          <dt class="text-sm font-medium text-stone-900">
            Recursos
          </dt>
          <dd class="mt-1 text-sm text-stone-500">
            Autores e livros com relacionamento.
          </dd>
        </div>

        <div>
          <dt class="text-sm font-medium text-stone-900">
            Interface
          </dt>
          <dd class="mt-1 text-sm text-stone-500">
            Listagem, paginação e formulários.
          </dd>
        </div>
      </dl>
    </main>
  `
}
