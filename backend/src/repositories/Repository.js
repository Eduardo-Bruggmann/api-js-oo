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

  async findAll(query = {}) {
    const { page, limit, ...filters } = query
    const currentPage = this.parsePositiveInteger(page, 1)
    const perPage = this.parsePositiveInteger(limit, 10, 100)
    const where = this.buildWhere(filters)
    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        skip: (currentPage - 1) * perPage,
        take: perPage,
      }),
      this.model.count({ where }),
    ])

    return {
      data,
      meta: {
        page: currentPage,
        limit: perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
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

  parsePositiveInteger(value, defaultValue, maxValue = Infinity) {
    const parsedValue = Number(value)

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) return defaultValue

    return Math.min(parsedValue, maxValue)
  }

  buildWhere(filters = {}) {
    return Object.entries(filters).reduce((where, [key, value]) => {
      if (value === undefined || value === '') return where

      where[key] = this.parseId(value)
      return where
    }, {})
  }
}
