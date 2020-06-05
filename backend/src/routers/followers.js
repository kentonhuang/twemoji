const express = require('express')
const Follower = require('../models/followers')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.get('followers/:username', async (req, res) => {
  
})

module.exports = router