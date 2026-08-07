import Service from './Service.js'
import ValidationError from '../errors/ValidationError.js'

export default class AuthorService extends Service {
  constructor(authorRepository) {
    super(authorRepository)
  }

  validate(author) {
    if (!author) throw new ValidationError('Payload is required.')

    if (Object.keys(author).length > 2)
      throw new ValidationError('Too many fields in the payload.')

    if (Object.keys(author).some(key => !['name', 'nacionality'].includes(key)))
      throw new ValidationError('Invalid field in the payload.')

    if (!author.name) throw new ValidationError('Name is required.')

    if (author.name.length > 100)
      throw new ValidationError(
        'Name must be less than or equal to 100 characters.',
      )

    if (!author.nacionality)
      throw new ValidationError('Nacionality is required.')

    if (author.nacionality.length > 50)
      throw new ValidationError(
        'Nacionality must be less than or equal to 50 characters.',
      )

    return true
  }
}
