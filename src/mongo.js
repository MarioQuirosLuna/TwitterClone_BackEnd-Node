const mongoose = require('mongoose')

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('Database connected'))
	.catch(err => console.error(err))

process.on('uncaughtException', (error) => {
	console.error(error)
	mongoose.disconnect()
})