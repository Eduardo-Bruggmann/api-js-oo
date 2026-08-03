import { prisma } from '../../database/prisma.js'
import UserController from '../controllers/UserController.js'
import UserRepository from '../repositories/UserRepository.js'
import UserService from '../services/UserService.js'
import BaseRouter from './BaseRouter.js'

export default class UserRouter extends BaseRouter {
  constructor() {
    const userRepository = new UserRepository(prisma)
    const userService = new UserService(userRepository)
    const userController = new UserController(userService)

    super({
      path: '/users',
      controller: userController,
    })
  }
}
