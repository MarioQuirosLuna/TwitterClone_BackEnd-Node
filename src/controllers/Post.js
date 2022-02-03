const postRouter = require('express').Router()
const Post = require('../models/PostSchema')

/** 
 * POST
*/
postRouter.post('/', async (req, res, next) => {
	const {
		user_photo,
		nameUser,
		username,
		text_posted,
		media_posted
	} = req.body
	try {
		let newPost = new Post({
			user_photo,
			nameUser,
			username,
			postTime: new Date(),
			text_posted,
			media_posted,
			comments: [],
			retweets: [],
			likes: []
		})
		const savedPost = await newPost.save()

		res.status(201)
			.json(savedPost)
	} catch (error) {
		next(error)
	}
})

module.exports = postRouter