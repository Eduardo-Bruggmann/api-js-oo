const authors = [
  ['Machado de Assis', 'Brasileira'],
  ['Clarice Lispector', 'Brasileira'],
  ['Jorge Amado', 'Brasileira'],
  ['Cecilia Meireles', 'Brasileira'],
  ['Graciliano Ramos', 'Brasileira'],
  ['Carlos Drummond de Andrade', 'Brasileira'],
  ['Lygia Fagundes Telles', 'Brasileira'],
  ['Guimaraes Rosa', 'Brasileira'],
  ['Rachel de Queiroz', 'Brasileira'],
  ['Mario de Andrade', 'Brasileira'],
  ['Jane Austen', 'Britanica'],
  ['George Orwell', 'Britanica'],
  ['Virginia Woolf', 'Britanica'],
  ['Gabriel Garcia Marquez', 'Colombiana'],
  ['Julio Cortazar', 'Argentina'],
  ['Isabel Allende', 'Chilena'],
  ['Fyodor Dostoevsky', 'Russa'],
  ['Leo Tolstoy', 'Russa'],
  ['Haruki Murakami', 'Japonesa'],
  ['Toni Morrison', 'Estadunidense'],
]

function makeAuthors() {
  return authors.map(([name, nationality]) => ({ name, nationality }))
}

export { makeAuthors }
