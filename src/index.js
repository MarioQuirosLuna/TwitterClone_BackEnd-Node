require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('hello')
})

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`)
})