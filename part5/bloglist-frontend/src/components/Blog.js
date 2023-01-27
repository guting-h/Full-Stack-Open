import Togglable from "./Togglable"
//import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog, user, incrementLikes, handleDelete }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view" closeLabel="hide">
        <div className="toggledContent">
          {blog.url} <br/>
            likes: {blog.likes} <button onClick={() => incrementLikes(blog)}>like</button> <br/>
            posted by {blog.user.name}
          {user.username === blog.user.username?
            <div><button onClick={() => handleDelete(blog)}>remove blog</button> <br/> </div> :
            <br/>
          }
        </div>
      </Togglable>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func,
  user: PropTypes.object.isRequired,
  notify: PropTypes.func
}

export default Blog