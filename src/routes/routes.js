import express from 'express'
import UserRouter from './UserRouter.js'

const router = express.Router()

const routes = [new UserRouter()]

routes.forEach((route) => {
  router.use(route.path, route.getRouter())
})

export default router
