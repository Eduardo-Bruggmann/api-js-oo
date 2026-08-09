import Repository from './Repository.js'

export default class BookRepository extends Repository {
  constructor(database) {
    super(database, 'Book')
  }
}
