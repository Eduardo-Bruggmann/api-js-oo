import Middleware from './Middleware.js'

export default class ErrorMiddleware extends Middleware {
  handle(error, req, res, next) {
    const statusCode = error.status || 500

    return res.status(statusCode).json({
      message: error.message || 'Internal server error.',
    })
  }
}
