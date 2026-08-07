import express from 'express'
import AuthorRouter from './AuthorRoutes.js'
import BookRouter from './BookRoutes.js'

const router = express.Router()

const routes = [new AuthorRouter(), new BookRouter()]

routes.forEach(route => {
  router.use(route.path, route.getRouter())
})

export default router
