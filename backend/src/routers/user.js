const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    console.log(e)
    res.status(400).send({error: 'Login Failed'})
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokens) => {
      return tokens.token !== req.token
    }) 
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/users/:username', async (req, res) => {
  try {
    const user = await User.findOne({'username': req.params.username}).exec()
    return res.status(200).send(user)
  } catch (e) {
    return res.status(400).send()
  }
})

router.get('/users', async (req, res) => {
  try {
    const records = await User.find().where('_id').in(req.query.ids).select('-tokens').exec()
    return res.status(200).send(records)
  } catch (e) {
    return res.status(400).send()
  }
})

module.exports = router