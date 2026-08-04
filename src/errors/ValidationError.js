import AppError from './AppError.js'

export default class ValidationError extends AppError {
  constructor(message, status = 400) {
    super(message, status)
    this.name = 'ValidationError'
  }
}
