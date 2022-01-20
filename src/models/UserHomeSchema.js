const { model, Schema } = require('mongoose')

const UserHomeSchema = new Schema({})

const UserHome = model('User', UserHomeSchema)

module.exports = UserHome