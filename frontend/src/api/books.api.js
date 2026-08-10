import { request } from './http.js'

export function createBook(book) {
  return request('/books', {
    method: 'POST',
    body: JSON.stringify(book),
  })
}

export function getBook(id) {
  return request(`/books/${id}`)
}

export function getBooks(page = 1, limit = 10) {
  return request(`/books?page=${page}&limit=${limit}`)
}

export function updateBook(id, book) {
  return request(`/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(book),
  })
}

export function deleteBook(id) {
  return request(`/books/${id}`, {
    method: 'DELETE',
  })
}
