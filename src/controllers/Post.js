const postRouter = require('express').Router()
const Post = require('../models/PostSchema')

/**
 * GET
 */
postRouter.get('/:username/:id', async (req, res, next) => {
	const {
		username,
		id
	} = req.params
	console.log(req.params)
	Post
		.findOne({
			_id: id,
			username: username
		})
		.then(post => res.json(post))
		.catch(err => next(err))
})


/** 
 * POST
*/
postRouter.post('/', async (req, res, next) => {
	const {
		user_photo,
		nameUser,
		username,
		text_posted,
		media_posted,
		parentTweetUserName,
		parentTweetId
	} = req.body
	try {
		let newPost = new Post({
			user_photo,
			nameUser,
			username,
			postTime: new Date(),
			text_posted,
			parentTweetUserName,
			parentTweetId,
			media_posted,
			comments: [],
			retweets: [],
			likes: []
		})
		console.log(newPost)
		const savedPost = await newPost.save()

		res.status(201)
			.json(savedPost)
	} catch (error) {
		next(error)
	}
})

module.exports = postRouter