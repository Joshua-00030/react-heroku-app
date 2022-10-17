import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const userForm = () => (
      <form onSubmit={logoutUser}>{user.name} logged in 
        <button type="submit">logout</button>
      </form>
  )

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      await blogService.setToken(user.token)
      
      const res = await blogService.create(
        {title:newTitle, author:newAuthor, url:newUrl})
        setErrorMessage(`New blog: "${newTitle}",\nWritten by ${newAuthor} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      setBlogs(blogs.concat(res))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setErrorMessage('Invalid Field(s)')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const creatBlogForm = () => (
    <div>
      <p>
        Create a new blog:
      </p>
      <form onSubmit={handleBlogCreation}>
        <div>
          Title
          <input
            type="text"
            value={newTitle}
            name="newTitle"
            onChange={({ target }) => setNewTitle(target.value)}
            />
        </div>
        <div>
          Author
          <input
            type="text"
            value={newAuthor}
            name="newAuthor"
            onChange={({ target }) => setNewAuthor(target.value)}
            />
        </div>
        <div>
          Url
          <input
            type="text"
            value={newUrl}
            name="newUrl"
            onChange={({ target }) => setNewUrl(target.value)}
            />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )

  const blogForm = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  const loginForm = () => (
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
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const logoutUser = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ?
        [loginForm()]:
        [userForm(),
          creatBlogForm(),
          blogForm()]
      }
    </div>
  )
}

export default App
