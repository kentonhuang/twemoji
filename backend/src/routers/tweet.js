const express = require('express')
const Tweet = require('../models/tweet')

const router = new express.Router()

router.post('/tweets', async (req, res) => {
  const tweet = new Tweet(req.body)

  try {
    await tweet.save()
    res.status(201).send(tweet)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router