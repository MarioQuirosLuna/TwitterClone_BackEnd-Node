const userRouter = require('express').Router()
const UserHome = require('../models/UserHomeSchema')

userRouter.get('/:id', (req, res) => {
	const { id } = req.params
	UserHome
		.find({ _id: id })
		.then(userHome => res.json(userHome))
		.catch(err => console.error(err))
})
