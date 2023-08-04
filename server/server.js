const express = require('express')
const connectDB = require('./connectDB')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())
const userRouter = require('./routes/userRoutes')

app.get('/', (req, res) => {
  res.json('hello')
})

app.use('/api/user', userRouter)
// middleware
app.use(notFound)
app.use(errorHandler)

connectDB()
const port = process.env.PORT || 5000
const server = app.listen(
  port,
  console.log(`Server is running at port ${port}`)
)
