import { prisma } from '../../database/prisma.js'
import AuthorController from '../controllers/AuthorController.js'
import AuthorRepository from '../repositories/AuthorRepository.js'
import AuthorService from '../services/AuthorService.js'
import BaseRouter from './BaseRouter.js'

export default class AuthorRouter extends BaseRouter {
  constructor() {
    const authorRepository = new AuthorRepository(prisma)
    const authorService = new AuthorService(authorRepository)
    const authorController = new AuthorController(authorService)

    super({
      path: '/authors',
      controller: authorController,
    })
  }
}
