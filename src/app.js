import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'
import * as middlewares from './middlewares/middlewares.js'

const { errorMiddleware } = middlewares

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json({ message: 'Hello, World!' }))

app.use(router)
app.use(errorMiddleware)

export default app
