const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({ 
  content: {
    type: 'String',
    required: true,
  },
}, {
  timestamps: true
})

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet