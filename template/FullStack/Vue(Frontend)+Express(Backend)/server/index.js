import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser' 
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

if (!process.env.MONGO_URL) {
  console.error('Error: MONGO_URL is not defined in .env file.')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected")
  })
  .catch((err) => {
    console.log(err)
  })

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}!`)
})