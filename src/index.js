require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleErrors')

const homeRouter = require('./controllers/Home')
const profileRouter = require('./controllers/Profile')
const postRouter = require('./controllers/Post')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('hello')
})

app.use('/api/home', homeRouter)
app.use('/api/user', profileRouter)
app.use('/api/post', postRouter)

app.use(notFound)
app.use(handleError)

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`)
})