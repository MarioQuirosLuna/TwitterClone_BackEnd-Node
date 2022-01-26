const homeRouter = require('express').Router()
const Posts = require('../models/PostSchema')


/**
 * HOME
 */
homeRouter.get('/', (req, res, next) => {
	Posts
		.find({})
		.sort({ 'postTime': 'desc' })
		.then(home => res.json(home))
		.catch(err => next(err))
})

module.exports = homeRouter