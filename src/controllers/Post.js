const postRouter = require('express').Router()
const Post = require('../models/PostSchema')
const User = require('../models/UserSchema')

/**
 * GET
 */
postRouter.get('/:username/:id', async (req, res, next) => {
	const {
		username,
		id
	} = req.params
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

postRouter.put('/comment/:username/:id', async (req, res, next) => {
	const {
		username,
		id,
	} = req.params
	const {
		userComment,
		comment,
		media
	} = req.body

	try {
		let post = await Post.findOne({ _id: id, username: username })
		let userNewComment = await User.findOne({ username: userComment })

		if (!post) return res.status(404).send({ error: 'post not found' })

		let newComment = {
			user_photo: userNewComment.user_photo,
			nameUser: userNewComment.nameUser,
			username: userNewComment.username,
			postTime: new Date(),
			text_posted: comment,
			media_posted: media,
			comments: [],
			retweets: [],
			likes: []
		}

		let newPostInfo = {
			user_photo: post.user_photo,
			nameUser: post.nameUser,
			username: post.username,
			postTime: post.postTime,
			text_posted: post.text_posted,
			media_posted: post.media_posted,
			comments: [].concat(newComment).concat(post.comments),
			retweets: [],
			likes: []
		}

		post = await Post.findByIdAndUpdate(id, newPostInfo, { new: true })

		res.json(post)

	} catch (error) {
		next(error)
	}

})

module.exports = postRouter