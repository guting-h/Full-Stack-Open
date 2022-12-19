const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const pwHash1 = await bcrypt.hash('12345', 10)
  const user1 = new User({
    username: 'carrot',
    name: 'Carrot Tomatoson',
    passwordHash: pwHash1,
  })
  await user1.save()

  const blogObjects = helper.listOfBlogs.map((blog) => {
    return new Blog({ ...blog, user: user1._id })
  })
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

// 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

// 4.8
test('correct number of blogs returned as expected', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.listOfBlogs.length)
})

// 4.9
test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

describe('adding new blogs', () => {
  // 4.10 & 4.23
  test('a valid blog from a valid user is correctly added', async () => {
    const newBlog = {
      title: 'the lengendary tomato',
      author: 'radish',
      url: 'http://radish-tomato.com/wow/potato',
      likes: 5,
    }

    const login = {
      username: 'carrot',
      password: '12345',
    }

    const loginRes = await api
      .post('/api/login')
      .send(login)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // verify that number of blogs increased by 1
    const existingBlogs = await helper.blogsInDb()
    expect(existingBlogs).toHaveLength(helper.listOfBlogs.length + 1)

    // verify that the title is correctly added
    const titles = existingBlogs.map(n => n.title)
    expect(titles).toContain('the lengendary tomato')

    // verify that the author is correctly added
    const authors = existingBlogs.map(n => n.author)
    expect(authors).toContain('radish')

    // verify that the url is correctly added
    const urls = existingBlogs.map(n => n.url)
    expect(urls).toContain('http://radish-tomato.com/wow/potato')
  })

  // 4.11 & 4.23
  test('The default for likes is 0 if not set', async () => {
    const newBlog = {
      title: 'the lengendary tomato',
      author: 'radish',
      url: 'http://radish-tomato.com/wow/potato',
    }

    const login = {
      username: 'carrot',
      password: '12345',
    }

    const loginRes = await api
      .post('/api/login')
      .send(login)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect( (response) => {
        expect(response.body.likes).toBe(0)
      })
  })

  // 4.12 & 4.23
  test('respond with 400 Bad Request if title or url is missing', async () => {
    const invalidBlogs = [
      {
        author: 'carrot',
        url: 'http://radish-tomato.com/wow/potato',
      },
      {
        title: 'The adventure of Huckleberry Potato',
        author: 'Tomato Twain',
      },
      {
        author: 'carrot',
      },
      {
      },
    ]

    const login = {
      username: 'carrot',
      password: '12345',
    }

    const loginRes = await api
      .post('/api/login')
      .send(login)

    for (let i = 0; i < invalidBlogs.length; i ++) {
      await api
        .post('/api/blogs')
        .send(invalidBlogs[i])
        .set('Authorization', `bearer ${loginRes.body.token}`)
        .expect(400)
    }
  })

  // 4.23
  test('fails with status code 401 if token is not provided', async () => {
    await api
      .post('/api/blogs')
      .expect(401)
  })
})

// 4.13 & 4.23
describe('deleting blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const login = {
      username: 'carrot',
      password: '12345',
    }

    const loginRes = await api
      .post('/api/login')
      .send(login)

    const existingBlogs = await helper.blogsInDb()
    const toDelete = existingBlogs[0]
    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete).toHaveLength(helper.listOfBlogs.length - 1)

    const titles = blogsAfterDelete.map(n => n.title)
    expect(titles).not.toContain(toDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const login = {
      username: 'carrot',
      password: '12345',
    }

    const loginRes = await api
      .post('/api/login')
      .send(login)

    await api
      .delete('/api/blogs/123')
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .expect(400)
  })

})

// 4.14
// user administration is not implemented for updating blogs, so these tests will fail
describe.skip('updating blogs', () => {
  test('update likes succeeds if id is valid', async () => {
    const existingBlogs = await helper.blogsInDb()
    const toUpdate = existingBlogs[0]
    const newBlog = { ...toUpdate, likes: toUpdate.likes + 1 }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect( (response) => {
        expect(response.body).toEqual(newBlog)
      })
  })

  test('update author succeeds if id is valid', async () => {
    const existingBlogs = await helper.blogsInDb()
    const toUpdate = existingBlogs[0]
    const newBlog = { ...toUpdate, author: 'Tom Sawyer' }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect( (response) => {
        expect(response.body).toEqual(newBlog)
      })
  })

  test('fails with status code 400 if id is invalid', async () => {
    await api
      .put('/api/blogs/123')
      .send({ id: 123 })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
