import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import BlogForm from './BlogForm'
import TogglableBlog from './TogglableBlog'
import Togglable from '../utils/Togglable'

import blogService from '../../services/blogs'

import { setInfoMessage } from '../../reducers/notificationReducer'
import { addBlog } from '../../reducers/blogReducer'
import { updateBlog } from '../../reducers/blogReducer'
import { removeBlog } from '../../reducers/blogReducer'

const Blogs = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const blogs = state.blogs

  const blogFormRef = React.createRef()

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        dispatch(addBlog(returnedBlog))
        dispatch(setInfoMessage(`a new blog ${returnedBlog.title} by ${state.user.name} added`, 10))
      })
  }
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

  return (
    <div>
      <h1>Blogs</h1>
      {blogForm()}
      {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <div key={blog.id}>
          <TogglableBlog blog={blog}
            onLikesClick={handleLikes}
            username={state.user.username}
            onRemove={handleRemoveBlog}
          />
        </div>
      )}
    </div>
  )
}

export default Blogs