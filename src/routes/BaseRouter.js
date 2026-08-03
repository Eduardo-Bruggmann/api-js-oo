import express from 'express'

export default class BaseRouter {
  constructor({ path, controller, routes } = {}) {
    if (new.target === BaseRouter)
      throw new Error(
        'BaseRouter is an abstract class and cannot be instantiated directly.',
      )

    if (!path) throw new Error('BaseRouter requires a path.')

    if (!controller)
      throw new Error('BaseRouter requires a controller instance.')

    this.path = path
    this.controller = controller
    this.router = express.Router()
    this.routes = routes || this.defaultRoutes()

    this.registerRoutes()
  }

  defaultRoutes() {
    return [
      { method: 'get', path: '/', action: 'index' },
      { method: 'get', path: '/:id', action: 'show' },
      { method: 'post', path: '/', action: 'store' },
      { method: 'put', path: '/:id', action: 'update' },
      { method: 'delete', path: '/:id', action: 'destroy' },
    ]
  }

  registerRoutes() {
    this.routes.forEach(({ method, path, action, middlewares = [] }) => {
      const controllerAction = this.controller[action]

      if (typeof controllerAction !== 'function')
        throw new Error(`Controller action "${action}" was not found.`)

      if (typeof this.router[method] !== 'function')
        throw new Error(`HTTP method "${method}" is not supported.`)

      this.router[method](
        path,
        ...middlewares,
        controllerAction.bind(this.controller),
      )
    })
  }

  getRouter() {
    return this.router
  }
}
