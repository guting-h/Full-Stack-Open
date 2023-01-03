import { useState, useEffect, useRef } from 'react'

import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = (blogObj) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObj)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        notify(`${blog.title} by ${blog.author} added`)
      }).catch(error => {
        notify(error.response.data.error)
      })
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
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
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
          <h2>blogs</h2>
          {user.name} logged in <br />
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="new blog" closeLabel="close" ref={noteFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          {blogs.sort((a, b) => b.likes-a.likes).map(blog => 
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
          )}
        </div>
      }
    </div>
    
  )
}

export default App
