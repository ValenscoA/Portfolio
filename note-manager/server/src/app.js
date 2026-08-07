import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import healthRouter from './routes/health.routes.js'

const app = express()
const port = Number(process.env.PORT) || 3000
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin: clientOrigin,
  }),
)
app.use(express.json())

app.use('/api/health', healthRouter)

app.listen(port, () => {
  console.log(`Note Manager API is running on http://localhost:${port}`)
})
