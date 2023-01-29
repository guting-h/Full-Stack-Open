import { useState, useEffect, useRef } from "react"

import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"

import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedAppUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      notify(`${username} logged in`)
      setUsername("")
      setPassword("")
    } catch (exception) {
      notify("Wrong username or password")
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  const incrementLikes = async (blog) => {
    try {
      const updated = await blogService.update({  ...blog, user: blog.user.id, likes: blog.likes + 1 }, blog.id)
      setBlogs(blogs.map(b => b.id !== updated.id ? b : updated))

      // not the best solution, but ensures that the user is correctly shown on page
      const rerender = await blogService.getAll()
      setBlogs(rerender)

    } catch (exception) {
      console.log(exception)
    }
  }

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObj)
      .then(blog => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        notify(`${blog.title} by ${blog.author} added`)
      }).catch(error => {
        notify(error.response.data.error)
      })
  }

  const handleDelete = async (blog) => {
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

  const notify = ( message ) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={message}/>
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          message={message}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        /> :
        <div>
          <h2>Blogs</h2>
          {user.name} logged in <br />
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="new blog" closeLabel="close" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes-a.likes).map(blog =>
            <Blog key={blog.id}
              blog={blog}
              user={user}
              incrementLikes={incrementLikes}
              handleDelete={handleDelete} />
          )}
        </div>
      }
    </div>

  )
}

export default App
