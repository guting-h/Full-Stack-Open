const _ = require("lodash")

// 4.3 a dummy function that receives an array of blogs and always return 1
const dummy = (blogs) => {
  return 1
}

/** 4.4
* @param blogs a list of blog posts
* @return total sum of likes in all of the blog posts
*/
const totalLikes = (blogs) => {
  return blogs.map(b => b.likes).reduce((partialSum, a) => partialSum + a, 0)
}

/** 4.5 
 * @param blogs a list of blog posts
 * @return blog with most likes
 */
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) 
    return {}
  return _.maxBy(blogs, (b) => b.likes )
}

/** 4.6
 * @param blogs a list of blog posts
 * @return the author who has the largest amount of blogs and the blog count
 */
const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}

  let grouped = _.countBy(blogs, b => b.author)
  const keys = Object.keys(grouped)
  let maxKey = keys[0]
  for (i = 1; i < keys.length; i++) {
    if (grouped[keys[i]] > grouped[maxKey]) {
        maxKey = keys[i]
    }
  }
  return { author: maxKey, blogs: grouped[maxKey] }
}

/** 4.7
 * @param blogs a list of blog posts
 * @return the author whose blog posts have the largest amount of likes and the number of likes received
 */
const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}

  const author_likes = {}
  const grouped = _.groupBy(blogs, a => a.author)
  const keys = Object.keys(grouped)
  for (i = 0; i < keys.length; i++) {
    author_likes[keys[i]] = grouped[keys[i]].map(obj => obj.likes)
                                            .reduce((partialSum, a) => partialSum + a, 0)
  }
  const maxKey = keys.reduce((a, b) => author_likes[a] > author_likes[b] ? a : b )
  return { author: maxKey, likes: author_likes[maxKey]}
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
