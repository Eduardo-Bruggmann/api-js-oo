import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app.js'

describe('app', () => {
  it('returns the health message from the root route', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hello, World!' })
  })
})
