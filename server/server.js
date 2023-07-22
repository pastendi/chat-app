const express = require('express')
require('dotenv').config()
const app = express()

app.get('/', (req, res) => {
  res.json('hello')
})

const port = process.env.PORT || 5000
const server = app.listen(
  port,
  console.log(`Server is running at port ${port}`)
)
