import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import useGetAllBlogs from './hooks/blogs_get_all'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogsUpdated, setBlogsUpdated] = useState(false)
  const blogs = useGetAllBlogs(user, blogsUpdated)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    if (user) {
      setUsername(user.username)
    }
  }, [user])


  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url
    }

    blogService.setToken(user.token)

    try {
      await blogService.create({
        blog
      })

      setBlogsUpdated(true)
      setNotificationMessage(`${title} by ${author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (error) {
      setNotificationMessage(error.response.data.error)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <>
      <br></br>
      <Togglable buttonLabel='Create blog'>
        <CreateBlogForm
          title = {title}
          setTitle={setTitle}
          author = {author}
          setAuthor={setAuthor}
          url = {url}
          setUrl={setUrl}
          handleSubmit={handleCreateBlog}
        />
      </Togglable>
    </>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    window.location.href = '/'
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const updateBlogLikes = async (blogId) => {
    const blogToUpdate = blogs.find((blog) => blog.id === blogId)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    try {
      await blogService.addLike(updatedBlog)
      setBlogsUpdated(true)
    } catch (error) {
      console.error(error)
    }
  }

  const sortBlogsByLikes = (blogs) => {
    return blogs.slice().sort((a, b) => b.likes - a.likes)
  }

  const handleDeleteBlog = async (blogToDelete) => {
    if (blogToDelete) {
      try {
        await blogService.deleteBlog(blogToDelete)
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div>

      <h1>Blogs</h1>

      <Notification message={notificationMessage}/>

      {!user && (
        <>
          {loginForm()}
        </>
      )}

      {user && (
        <>
          <p>{username} logged in </p>
          <button onClick={handleLogout}>Log out</button>

          <br></br>

          {blogForm()}
          <br></br>

          <h2>Blogs list: </h2>
          {sortBlogsByLikes(blogs).map((blog) => (
            <Blog username = {username} handleLikes={updateBlogLikes}
              onDeleteBlog={handleDeleteBlog} key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App