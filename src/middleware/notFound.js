// eslint-disable-next-line no-unused-vars
module.exports = (request, response, next) => {
	response.status(404).send({error: 'Not Found'})
}