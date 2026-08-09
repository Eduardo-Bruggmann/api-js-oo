import { describe, expect, it, vi } from 'vitest'
import ErrorMiddleware from '../src/middlewares/ErrorMiddleware.js'
import ValidationError from '../src/errors/ValidationError.js'

function createResponse() {
  const response = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  }

  return response
}

describe('ErrorMiddleware', () => {
  it('keeps application errors with their configured status', () => {
    const middleware = new ErrorMiddleware()
    const response = createResponse()

    middleware.handle(
      new ValidationError('Invalid payload.'),
      {},
      response,
      vi.fn(),
    )

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith({ message: 'Invalid payload.' })
  })

  it('maps known Prisma errors to clear HTTP responses', () => {
    const middleware = new ErrorMiddleware()
    const response = createResponse()

    middleware.handle({ code: 'P2025' }, {}, response, vi.fn())

    expect(response.status).toHaveBeenCalledWith(404)
    expect(response.json).toHaveBeenCalledWith({
      message: 'Resource not found.',
    })
  })
})
