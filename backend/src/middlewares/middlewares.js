import ErrorMiddleware from './ErrorMiddleware.js'

const errorMiddleware = new ErrorMiddleware().getHandler()

export { errorMiddleware }
