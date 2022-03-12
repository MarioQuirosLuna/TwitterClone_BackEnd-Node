const { model, Schema } = require('mongoose')

const userSchema = new Schema({
	user_photo: String,
	image_bg: String,
	name: String,
	username: String,
	email: String,
	phone: String,
	birthday: String,
	description: String,
	joined_date: { type: Date, default: new Date() },
	following: Array,
	followers: Array
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const User = model('User', userSchema)

module.exports = User