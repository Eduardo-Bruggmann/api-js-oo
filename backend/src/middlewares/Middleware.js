export default class Middleware {
  constructor() {
    if (new.target === Middleware)
      throw new Error(
        'Middleware is an abstract class and cannot be instantiated directly.',
      )
  }

  handle() {
    throw new Error('Middleware subclasses must implement the handle method.')
  }

  getHandler() {
    return this.handle.bind(this)
  }
}
