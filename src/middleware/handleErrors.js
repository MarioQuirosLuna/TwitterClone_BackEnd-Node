// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
	console.log(error.name)
	if (error.name === 'CastError') {
		res.status(400).send({ error: error.name })
	} else {
		res.status(500).send({ error: error.name })
	}
}