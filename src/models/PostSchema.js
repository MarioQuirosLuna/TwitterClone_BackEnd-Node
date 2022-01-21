const { model, Schema } = require('mongoose')

const postSchema = new Schema({
	nameUser: String,
	username: String,
	postTime: { type: Date, default: Date.now() },
	text_posted: String,
	media_posted: String,
	comments: Array,
	retweets: Array,
	likes: Array
})

postSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Post = model('Post', postSchema)

module.exports = Post