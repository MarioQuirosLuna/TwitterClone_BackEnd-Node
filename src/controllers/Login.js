const loginRouter = require('express').Router()
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')

/** 
 * Verification
*/
loginRouter.post('/verify', async (req, res, next) => {
	const {
		username,
		email,
		phone
	} = req.body
	try {
		let user

		user = await User.findOne({
			username: username
		})
		if (user) return res.json({ data: username })
		user = await User.findOne({
			email: email
		})
		if (user) return res.json({ data: email })
		user = await User.findOne({
			phone: phone
		})
		if (user) return res.json({ data: phone })
		res.json(false)

	} catch (error) {
		next(error)
	}
})

/**
 * Login
 */
loginRouter.post('/', async (req, res, next) => {
	const {
		username,
		email,
		phone,
		password
	} = req.body
	try {
		let user

		if (username !== '') {
			user = await User.findOne({
				username: username
			})
		} else if (email !== '') {
			user = await User.findOne({
				email: email
			})
		} else if (phone !== '') {
			user = await User.findOne({
				phone: phone
			})
		}
		const passwordCorrect = (user === null)
			? false
			: await bcrypt.compare(password, user.password)

		if (!(user && passwordCorrect)) {
			res.status(401).json({ ErrorLogin: 'Invalid user or password' })
		} else {
			res.json(user)
		}
	} catch (error) {
		next(error)
	}

})

/**
 * Register
 */
loginRouter.post('/register', async (req, res, next) => {
	const {
		user_name,
		user_email,
		user_phone,
		user_password,
		user_birthday
	} = req.body

	try {
		const SALT_ROUNDS = 10
		const passwordHash = await bcrypt.hash(user_password, SALT_ROUNDS)

		let newUser = new User({
			user_photo: '',
			image_bg: '',
			name: user_name,
			username: `@${user_name}`,
			email: user_email,
			phone: user_phone,
			password: passwordHash,
			birthday: user_birthday,
			description: '',
			following: [],
			followers: []
		})
		const savedUser = await newUser.save()

		res.status(201)
			.json(savedUser)
	} catch (error) {
		next(error)
	}
})

module.exports = loginRouter