import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObj = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    }

    blogService
      .create(blogObj)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
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

  const loginForm = () => (
    <div>
      <h2>Log in to your account</h2>
      <div >
        {message}
      </div>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>      
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {user.name} logged in <br />
      <button onClick={handleLogout}>Logout</button>

      <h2>create new</h2>
      <div >
        {message}
      </div>
      <form onSubmit={addBlog}>
        title:<input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        /> <br />
        author:<input
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
        /> <br />
        url:<input
          value={newURL}
          onChange={(event) => setNewURL(event.target.value)}
        /> <br />
        <button type="submit">post blog</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>  
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
    
  )
}

export default App
