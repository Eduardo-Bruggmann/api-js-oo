import Repository from './Repository.js'

export default class UserRepository extends Repository {
  constructor(database) {
    super(database, 'User')
  }
}
