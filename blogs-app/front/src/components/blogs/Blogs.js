import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from '../utils/Togglable'

import blogService from '../../services/blogs'

import { setInfoMessage } from '../../reducers/notificationReducer'
import { addBlog } from '../../reducers/blogReducer'

import { BasicDiv, BasicSubDiv } from '../../styled/StyledComponents'

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

  return (
    <BasicDiv>
      <h1>Blogs</h1>
      <BasicSubDiv>
        {blogForm()}
      </BasicSubDiv>
      {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </BasicDiv>
  )
}

export default Blogs