import { prisma } from '../../database/prisma.js'
import BookController from '../controllers/BookController.js'
import BookRepository from '../repositories/BookRepository.js'
import BookRepository from '../repositories/AuthorRepository.js'
import BookService from '../services/BookService.js'
import BaseRouter from './BaseRouter.js'

export default class BookRouter extends BaseRouter {
  constructor() {
    const bookRepository = new BookRepository(prisma)
    const authorRepository = new AuthorRepository(prisma)
    const bookService = new BookService(bookRepository, authorRepository)
    const bookController = new BookController(bookService)

    super({
      path: '/books',
      controller: bookController,
    })
  }
}
