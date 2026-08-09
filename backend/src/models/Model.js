export default class Model {
  constructor(attributes = {}) {
    if (new.target === Model)
      throw new Error(
        'Model is an abstract class and cannot be instantiated directly.',
      )

    Object.assign(this, attributes)
  }

  static get tableName() {
    throw new Error('Child models must define a tableName getter.')
  }

  static fromDatabase(data) {
    return data ? new this(data) : null
  }

  toJSON() {
    return { ...this }
  }

  validate() {
    return true
  }
}
