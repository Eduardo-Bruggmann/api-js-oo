export default class Controller {
  constructor(service) {
    if (new.target === Controller)
      throw new Error(
        'Controller is an abstract class and cannot be instantiated directly.',
      )

    if (!service) throw new Error('Controller requires a service instance.')

    this.service = service
  }

  async index(req, res, next) {
    try {
      const data = await this.service.findAll(req.query)
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }

  async show(req, res, next) {
    try {
      const data = await this.service.findById(req.params.id)

      if (!data) return res.status(404).json({ message: 'Resource not found.' })

      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }

  async store(req, res, next) {
    try {
      const data = await this.service.create(req.body)
      return res.status(201).json(data)
    } catch (error) {
      return next(error)
    }
  }

  async update(req, res, next) {
    try {
      const data = await this.service.update(req.params.id, req.body)
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await this.service.delete(req.params.id)
      return res.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}
