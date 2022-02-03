const profileRouter = require('express').Router()
const User = require('../models/UserSchema')
const Posts = require('../models/PostSchema')


/**
 * PROFILE
 */
profileRouter.get('/:username', async (req, res, next) => {
	const { username } = req.params

	User
		.findOne({ username: username })
		.then(user => {
			if (user) {
				res.json(user)
			} else {
				next()
			}
		}).catch(err => next(err))
})

profileRouter.get('/posts/:username', async (req, res, next) => {
	const { username } = req.params

	Posts
		.find({ username: username })
		.sort({ 'postTime': 'desc' })
		.then(posts => res.json(posts))
		.catch(err => next(err))
})

module.exports = profileRouter