import Service from './Service.js'
import ValidationError from '../errors/ValidationError.js'

export default class BookService extends Service {
  constructor(bookRepository, authorRepository) {
    super(bookRepository)
    this.authorRepository = authorRepository
  }

  async validate(book) {
    if (!book) throw new ValidationError('Payload is required.')

    if (Object.keys(book).length > 3)
      throw new ValidationError('Too many fields in the payload.')

    if (
      Object.keys(book).some(
        key => !['title', 'publication_year', 'author_id'].includes(key),
      )
    )
      throw new ValidationError('Invalid field in the payload.')

    if (!book.title) throw new ValidationError('Title is required.')

    if (book.title.length > 150)
      throw new ValidationError(
        'Ttile must be less than or equal to 150 characters.',
      )

    if (!book.publication_year)
      throw new ValidationError('Publication year is required.')

    if (!book.author_id) throw new ValidationError('Author ID is required.')

    if ((await this.authorRepository.findById(book.author_id)) === null)
      throw new ValidationError('Author not found.')

    return true
  }
}
