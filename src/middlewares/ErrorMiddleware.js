import Middleware from './Middleware.js'

export default class ErrorMiddleware extends Middleware {
  handle(error, req, res, next) {
    const prismaError = this.mapPrismaError(error)
    const statusCode = prismaError.status || error.status || 500
    const message =
      prismaError.message || error.message || 'Internal server error.'

    return res.status(statusCode).json({
      message,
    })
  }

  mapPrismaError(error) {
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

    return errors[error.code] || {}
  }
}
