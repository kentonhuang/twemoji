const express = require('express')
const Tweet = require('../models/tweet')
const auth = require('../middleware/auth')

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
  const tweets = await Tweet.find({})
  .limit(20)
  .sort({ createdAt: -1 })
  .exec()

  res.send(tweets)
})

module.exports = router