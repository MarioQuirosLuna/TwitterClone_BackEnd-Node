const profileRouter = require('express').Router()
const User = require('../models/UserSchema')

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

module.exports = profileRouter