import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setInfoMessage } from '../../reducers/notificationReducer'
import blogService from '../../services/blogs'
import { updateBlog, removeBlog } from '../../reducers/blogReducer'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const handleLikes = async (event) => {
    event.preventDefault()
    blog.likes++
    const returnedBlog = await blogService.updateBlog(blog)
    dispatch(setInfoMessage(`you liked '${returnedBlog.title}'`, 10))
    dispatch(updateBlog(returnedBlog))
  }

  const handleRemoveBlog = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(!ok) {
      return
    }
    await blogService.removeBlog(blog)

    dispatch(removeBlog(blog.id))
    dispatch(setInfoMessage(`${blog.title} by ${blog.author} removed!`, 5))
  }

  if(!state.user) {return null}
  if(!blog) return <Redirect to='/blogs' />
  return <div>
    <h1>{blog.title}</h1>
    <div>
      <a href='{blog.url}'>{blog.url}</a>
    </div>
    <div>
      likes: {blog.likes}
      <button id={blog.id} onClick={handleLikes}>
          Like
      </button><br></br>
      Added by {blog.user.name}<br></br>
      {state.user.username === blog.user.username
        ?<button id={blog.id} onClick={handleRemoveBlog}>remove</button>
        :null
      }
    </div>
  </div>
}

export default Blog
