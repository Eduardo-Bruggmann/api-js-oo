export default class Service {
  constructor(repository) {
    if (new.target === Service)
      throw new Error(
        'Service is an abstract class and cannot be instantiated directly.',
      )

    if (!repository) throw new Error('Service requires a repository instance.')

    this.repository = repository
  }

  findAll(filters = {}) {
    return this.repository.findAll(filters)
  }

  findById(id) {
    return this.repository.findById(id)
  }

  async create(data) {
    await this.validate(data)
    return this.repository.create(data)
  }

  async update(id, data) {
    await this.validate(data, id)
    return this.repository.update(id, data)
  }

  delete(id) {
    return this.repository.delete(id)
  }

  validate() {
    return true
  }
}
