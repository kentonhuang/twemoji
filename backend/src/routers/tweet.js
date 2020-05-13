const User = require('../models/user')
const express = require('express')
const Tweet = require('../models/tweet')
const auth = require('../middleware/auth')
const ObjectId = require('mongodb').ObjectID

const router = new express.Router()

router.post('/tweets', auth, async (req, res) => {
  const tweet = new Tweet({
    ...req.body,
    owner: req.user._id
  })

  try {
    await tweet.save()
    res.status(201).send(tweet)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/tweets', async (req, res) => {

  const query = {}

  if(req.query.username) {
    try {
      const user = await User.find({'username': req.query.username}).exec()
      query['owner'] = user[0]._id
    } catch (e) {
      res.status(400).send(e)
    }
  }
  try {
    const tweets = await Tweet.find(query)
    .limit(20)
    .sort({ createdAt: -1 })
    .exec()
   
    return res.send(tweets)
  } catch (e){
    res.status(400).send(e)
  }

})

module.exports = router