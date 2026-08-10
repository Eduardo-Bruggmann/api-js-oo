export function renderNavbar() {
  return `
    <header class="border-b border-stone-200 bg-white">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a
          href="/"
          data-link
          class="font-semibold text-stone-900"
        >
          Biblioteca
        </a>

        <div class="flex gap-6">
          <a
            href="/books"
            data-link
            class="text-sm text-stone-600 hover:text-stone-900"
          >
            Livros
          </a>

          <a
            href="/authors"
            data-link
            class="text-sm text-stone-600 hover:text-stone-900"
          >
            Autores
          </a>
        </div>
      </nav>
    </header>
  `
}
