import { describe, expect, it, vi } from 'vitest'
import ErrorMiddleware from '../src/middlewares/ErrorMiddleware.js'
import ValidationError from '../src/errors/ValidationError.js'
import { Prisma } from '../generated/prisma/client.ts'

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
    const error = new Prisma.PrismaClientKnownRequestError(
      'Record not found.',
      {
        code: 'P2025',
        clientVersion: 'test',
      },
    )

    middleware.handle(error, {}, response, vi.fn())

    expect(response.status).toHaveBeenCalledWith(404)
    expect(response.json).toHaveBeenCalledWith({
      message: 'Resource not found.',
    })
  })

  it('does not treat non-Prisma errors as Prisma errors just because they have a Prisma-like code', () => {
    const middleware = new ErrorMiddleware()
    const response = createResponse()

    middleware.handle(
      {
        code: 'P2025',
        status: 400,
        message: 'Application error with custom code.',
      },
      {},
      response,
      vi.fn(),
    )

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith({
      message: 'Application error with custom code.',
    })
  })

  it('hides unmapped Prisma errors behind a generic internal error', () => {
    const middleware = new ErrorMiddleware()
    const response = createResponse()
    const error = new Prisma.PrismaClientKnownRequestError(
      'Sensitive Prisma details.',
      {
        code: 'P2034',
        clientVersion: 'test',
      },
    )

    middleware.handle(error, {}, response, vi.fn())

    expect(response.status).toHaveBeenCalledWith(500)
    expect(response.json).toHaveBeenCalledWith({
      message: 'Internal server error.',
    })
  })
})
