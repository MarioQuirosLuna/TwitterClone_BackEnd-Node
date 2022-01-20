require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const userRoutes = require('./controllers/User')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('hello')
})

app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`)
})