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
/**
 * DELETE
 */
postRouter.delete('/delete/:username/:id', async (req, res, next) => {
	const {
		username,
		id
	} = req.params
	Post
		.findOne({
			_id: id,
			username: username
		})
		.then(post => post.remove())
		.then(res.status(200)
			.send({ deleted: `post ${id} of user ${username} deleted` }))
		.catch(err => next(err))
})

/**
 * Comment
 */
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
			nameUser: userNewComment.name,
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

/**
 * Like
 */
postRouter.put('/like/:id', async (req, res, next) => {
	const {
		id,
	} = req.params
	const {
		userLiked
	} = req.body

	try {
		let post = await Post.findOne({ _id: id })
		let userNewLike = await User.findOne({ username: userLiked })

		if (!post) return res.status(404).send({ error: 'post not found' })

		let newPostInfo = {
			user_photo: post.user_photo,
			nameUser: post.nameUser,
			username: post.username,
			postTime: post.postTime,
			text_posted: post.text_posted,
			media_posted: post.media_posted,
			comments: post.comments,
			retweets: [],
			likes: []
		}
		const isUnlike = post.likes.find(like => like.username === userNewLike.username)

		if (!isUnlike) {
			let newLike = {
				user_photo: userNewLike.user_photo,
				nameUser: userNewLike.name,
				username: userNewLike.username
			}

			newPostInfo = {
				likes: [].concat(newLike).concat(post.likes)
			}
		} else {
			newPostInfo = {
				likes: post.likes.filter(like => like.username !== userNewLike.username)
			}
		}
		post = await Post.findByIdAndUpdate(id, newPostInfo, { new: true })

		res.json(post)

	} catch (error) {
		next(error)
	}

})

module.exports = postRouter