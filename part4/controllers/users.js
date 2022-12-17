const userRouter = require('express').Router()
const User  = require('../models/user')
const bcrypt = require('bcrypt')

// 4.15
userRouter.get('/users', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

// 4.15
userRouter.post('/users', async (request, response) => {
  const { username, name, password } = request.body
  // check that the username is unique
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  // check that the username and password exist and are long enough
  if (!username || !password) {
    return response.status(400).json({
      error: 'username or password is missing'
    })
  } else if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username and password must be at least 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter