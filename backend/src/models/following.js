const mongoose = require('mongoose')
const validator = require('validator')

const followingSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: 'string',
    required: true,
  },
  following: [
  ]
})

const Following = mongoose.model('Following', followingSchema)

module.exports = Following