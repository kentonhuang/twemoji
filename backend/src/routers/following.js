const express = require('express')
const Following = require('../models/following')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/following/:username', auth, async (req, res) => {
  const user = req.user.username

  try {
    const following = await Following.findOne({'username': user})
    const userToFollow = await User.findOne({'username': req.params.username})
  
    following.following.push({
      'user_id': userToFollow._id
    })
    following.save()
    res.status(200).send(following)
  } catch (e) {
    res.status(400).send('bad')
  }
})

router.patch('/following/:username', auth, async (req, res) => {
  const user = req.user.username

  try {
    const following = await Following.findOne({'username': user})
    const userToUnfollow = await User.findOne({'username': req.params.username})

    const index = following.following.findIndex((user) => user.user_id.toString() === userToUnfollow._id.toString())
    following.following.splice(index, 1)
    following.save()

    res.status(200).send(following)
  } catch(e) {
    res.status(400).send(e) 
  }

})

module.exports = router