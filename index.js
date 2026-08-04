import express from 'express'
import cors from 'cors'
import router from './src/routes/routes.js'
import * as middlewares from './src/middlewares/middlewares.js'

const { errorMiddleware } = middlewares

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
