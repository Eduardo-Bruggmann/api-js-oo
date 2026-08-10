import { request } from './http.js'

export function createAuthor(author) {
  return request('/authors', {
    method: 'POST',
    body: JSON.stringify(author),
  })
}

export function getAuthor(id) {
  return request(`/authors/${id}`)
}

export function getAuthors(page = 1, limit = 10) {
  return request(`/authors?page=${page}&limit=${limit}`)
}

export function updateAuthor(id, author) {
  return request(`/authors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(author),
  })
}

export function deleteAuthor(id) {
  return request(`/authors/${id}`, {
    method: 'DELETE',
  })
}
