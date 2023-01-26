import Togglable from "./Togglable"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, notify }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const imcrementLikes = async (event) => {
    event.preventDefault()
    try {
      const updated = await blogService.update({...blog, user: blog.user.id, likes: blog.likes + 1}, blog.id)
      setBlogs(blogs.map(b => b.id !== updated.id ? b : updated))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDelete = async (event) => {
    //event.preventDefault()
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notify(`${blog.title} by ${blog.author} removed`)
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view" closeLabel="hide">
        {blog.url} <br/>
        likes: {blog.likes} <button onClick={imcrementLikes}>like</button> <br/>
        posted by {blog.user.name}
        {user.username === blog.user.username?
          <div><button onClick={handleDelete}>remove blog</button> <br/> </div> :
          <br/>
        } 
      </Togglable>
    </div>  
  ) 
}

export default Blog