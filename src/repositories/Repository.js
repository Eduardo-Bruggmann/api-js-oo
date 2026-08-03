export default class Repository {
  constructor(database, modelName) {
    if (new.target === Repository)
      throw new Error(
        'Repository is an abstract class and cannot be instantiated directly.',
      )

    if (!database) throw new Error('Repository requires a database client.')

    if (!modelName) throw new Error('Repository requires a model name.')

    this.database = database
    this.modelName = modelName
  }

  get model() {
    const model = this.database[this.modelName]

    if (!model)
      throw new Error(
        `Model "${this.modelName}" was not found in the database client.`,
      )

    return model
  }

  findAll(options = {}) {
    return this.model.findMany(options)
  }

  findById(id) {
    return this.model.findUnique({
      where: { id: this.parseId(id) },
    })
  }

  create(data) {
    return this.model.create({ data })
  }

  update(id, data) {
    return this.model.update({
      where: { id: this.parseId(id) },
      data,
    })
  }

  delete(id) {
    return this.model.delete({
      where: { id: this.parseId(id) },
    })
  }

  parseId(id) {
    const parsedId = Number(id)
    return Number.isNaN(parsedId) ? id : parsedId
  }
}
