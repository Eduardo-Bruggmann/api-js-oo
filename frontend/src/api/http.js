import { API_URL } from '../config.js'

export async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const contentType = response.headers.get('content-type')

  let data = null

  if (contentType?.includes('application/json')) data = await response.json()

  if (!response.ok) throw new Error(data.message || 'Internal server error.')

  return data
}
