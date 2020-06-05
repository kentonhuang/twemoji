const mongoose = require('mongoose')
const validator = require('validator')

const followerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: 'string',
    required: true,
  },
  follower: [
  ]
})

const Follower = mongoose.model('Follower', followerSchema)

module.exports = Follower