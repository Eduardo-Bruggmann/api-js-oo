import Middleware from './Middleware.js'
import { Prisma } from '../../generated/prisma/client.ts'

export default class ErrorMiddleware extends Middleware {
  handle(error, req, res, next) {
    const prismaError = this.mapPrismaError(error)

    if (prismaError)
      return res.status(prismaError.status).json({
        message: prismaError.message,
      })

    const statusCode = error.status || 500
    const message =
      statusCode >= 500
        ? 'Internal server error.'
        : error.message || 'Internal server error.'

    return res.status(statusCode).json({
      message,
    })
  }

  mapPrismaError(error) {
    if (!this.isPrismaError(error)) return null

    const errors = {
      P2002: {
        status: 409,
        message: 'A record with this value already exists.',
      },
      P2003: {
        status: 400,
        message: 'Related record was not found or cannot be changed.',
      },
      P2025: {
        status: 404,
        message: 'Resource not found.',
      },
    }

    return (
      errors[error.code] || {
        status: 500,
        message: 'Internal server error.',
      }
    )
  }

  isPrismaError(error) {
    if (!error) return false

    const prismaErrors = [
      Prisma.PrismaClientKnownRequestError,
      Prisma.PrismaClientUnknownRequestError,
      Prisma.PrismaClientRustPanicError,
      Prisma.PrismaClientInitializationError,
      Prisma.PrismaClientValidationError,
    ]

    if (prismaErrors.some(PrismaError => error instanceof PrismaError))
      return true

    return (
      typeof error.name === 'string' &&
      error.name.startsWith('PrismaClient') &&
      (typeof error.code === 'string' ||
        typeof error.clientVersion === 'string')
    )
  }
}
