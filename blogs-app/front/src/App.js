import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'
import Button from './components/Button'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setInfoMessage } from './reducers/notificationReducer'
import { setErrorMessage } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { addBlog } from './reducers/blogReducer'
import { updateBlog } from './reducers/blogReducer'
import { removeBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  const localStoreKey = 'loggedBlogappUser'

  const dispatch = useDispatch()

  const state = useSelector(state => state)

  useEffect( () => {
    blogService
      .getAll()
      .then(initialBlogs => {
        dispatch(initBlogs(initialBlogs))
      })
      // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStoreKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])
  const blogs = state.blogs

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        console.log('returnedBlog', returnedBlog)
        dispatch(addBlog(returnedBlog))
        dispatch(setInfoMessage(`a new blog ${returnedBlog.title} by ${state.user.name} added`, 10))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.doLogin(
        username, password
      )
      window.localStorage.setItem(localStoreKey, JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorMessage('wrong username or password', 10))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const handleLikes = async (event) => {
    event.preventDefault()
    const blogId= event.target.id
    const blog = blogs.find(blog => blog.id === blogId)
    blog.likes++
    const returnedBlog = await blogService.updateBlog(blog)

    dispatch(setInfoMessage(`you liked '${returnedBlog.title}'`, 10))
    dispatch(updateBlog(returnedBlog))
  }

  const handleRemoveBlog = async (blog) => {
    await blogService.removeBlog(blog)

    dispatch(removeBlog(blog.id))
    dispatch(setInfoMessage(`${blog.title} by ${blog.author} removed!`, 10))
  }

  const handleLogout = () => {
    localStorage.removeItem(localStoreKey)
    dispatch(setUser(null))
  }
  return (
    <div>
      <h1>Blogs</h1>
      <Notification/>

      {state.user === null ?
        loginForm() :
        <div>
          <p>{state.user.name} logged in
            <Button handleClick={handleLogout} text='logout' />
          </p>
          {blogForm()}
          {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
            <>
              <TogglableBlog blog={blog}
                onLikesClick={handleLikes}
                username={state.user.username}
                onRemove={handleRemoveBlog}
              />
            </>
          )}
        </div>
      }
      <Footer />
    </div>
  )
}

export default App