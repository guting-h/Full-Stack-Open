const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.listOfBlogs
    .map((blog) => new Blog(blog))
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

// 4.10
test('a valid blog is correctly added', async () => {
  const newBlog = {
    title: 'the lengendary tomato',
    author: 'radish',
    url: 'http://radish-tomato.com/wow/potato',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
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

// 4.11
test('The default for likes is 0 if not set', async () => {
  const newBlog = {
    title: 'the lengendary tomato',
    author: 'radish',
    url: 'http://radish-tomato.com/wow/potato',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect( (response) => {
      expect(response.body.likes).toBe(0)
    })
})

// 4.12
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

  for (let blog of invalidBlogs) {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  }
})

afterAll(() => {
  mongoose.connection.close()
})
