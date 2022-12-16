const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listOfBlogs } = require('./test_helper')

// 4.3
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

// 4.4
describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs, should sum likes to correct value', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(36)
  })
})

// 4.5
describe('favorite blog by likes', () => {
  test('when list is empty, should return an empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when list has only one blog, favorite blog should be that one blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('when given a list of blogs, should return the blog with most likes', () => {
    expect(listHelper.favoriteBlog(listOfBlogs)).toEqual(listOfBlogs[2])
  })
})

// 4.6
describe('author with most blogs', () => {
  test('when list is empty, should return an empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when list has only one blog, should return that one author', () => {
    const toCheck = { author: 'Edsger W. Dijkstra', blogs: 1 }
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(toCheck)
  })

  test('when given a list of blogs, should return the author with most blogs and the blog count', () => {
    const toCheck = { author: 'Robert C. Martin', blogs: 3 }
    expect(listHelper.mostBlogs(listOfBlogs)).toEqual(toCheck)
  })
})

// 4.7
describe('author with most likes', () => {
  test('when list is empty, should return an empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('when list has only one blog, should return that one author', () => {
    const toCheck = { author: 'Edsger W. Dijkstra', likes: 5 }
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(toCheck)
  })

  test('when given a list of blogs, should return the author with most likes and the like count', () => {
    const toCheck = { author: 'Edsger W. Dijkstra', likes: 17 }
    expect(listHelper.mostLikes(listOfBlogs)).toEqual(toCheck)
  })
})
