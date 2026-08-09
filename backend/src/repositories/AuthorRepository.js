import Repository from './Repository.js'

export default class AuthorRepository extends Repository {
  constructor(database) {
    super(database, 'Author')
  }
}
