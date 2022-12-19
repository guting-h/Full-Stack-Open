const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const { username, name, password } = helper.initialUser

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  await user.save()
})

describe('user administration', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'potato',
      name: 'Potato Carrotson',
      password: '54321',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('invalid users: username or password or both missing, should not be added', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log(usersAtStart)
    const invalidUsers = [
      {
        name: 'Potato Carrotson',
        password: '54321',
      },
      {
        username: 'potato',
        name: 'Potato Carrotson',
      },
      {
        name: 'Potato Carrotson',
      },
      {},
    ]

    for (let i = 0; i < invalidUsers.length; i ++) {
      await api
        .post('/api/users')
        .send(invalidUsers[i])
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect( (response) => {
          expect(response.body.error).toBe('username or password is missing')
        })

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    }
  })

  test('invalid user: username already taken, should not be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'carrot',
      name: 'something',
      password: 'nothing',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect( (response) => {
        expect(response.body.error).toBe('username must be unique')
      })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('invalid users: username or password is less than 3 characters long, should not be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUsers = [
      {
        username: 'p',
        name: 'Potato Carrotson',
        password: '54321',
      },
      {
        username: 'potato',
        name: 'Potato Carrotson',
        password: '12',
      },
      {
        username: 'po',
        name: 'Potato Carrotson',
        password: '1',
      },
    ]

    for (let i = 0; i < invalidUsers.length; i ++) {
      console.log(invalidUsers[i])
      await api
        .post('/api/users')
        .send(invalidUsers[i])
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect( (response) => {
          expect(response.body.error).toBe('username and password must be at least 3 characters long')
        })

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    }
  })

})

afterAll(() => {
  mongoose.connection.close()
})
