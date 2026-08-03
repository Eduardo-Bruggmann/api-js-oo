import express from 'express'
import cors from 'cors'
import router from './src/routes/routes.js'

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
