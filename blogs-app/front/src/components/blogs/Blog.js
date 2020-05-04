import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setInfoMessage } from '../../reducers/notificationReducer'
import blogService from '../../services/blogs'
import { updateBlog, removeBlog } from '../../reducers/blogReducer'
import Togglable from '../utils/Togglable'

import { BasicDiv, BasicSubDiv, BasicBtn } from '../../styled/StyledComponents'

const Blog = ({ blog }) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const handleLikes = async (event) => {
    event.preventDefault()
    blog.likes++
    const returnedBlog = await blogService.updateBlog(blog)
    dispatch(setInfoMessage(`you liked '${returnedBlog.title}'`, 10))
    dispatch(updateBlog(returnedBlog))
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
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

  const commentFormRef = React.createRef()

  const addComment = (event) => {
    event.preventDefault()

    commentFormRef.current.toggleVisibility()

    blogService.addComment(blog, newComment)
      .then(updatedBlog =>
        dispatch(updateBlog(updatedBlog))
      )
    setNewComment('')
  }

  if(!state.user) {return null}
  if(!blog) return <Redirect to='/blogs' />

  const commentForm = () => (
    <Togglable buttonLabel='new comment' ref={commentFormRef}>
      <form onSubmit={addComment}>
        <p>
          Comment: <input id='comment'
            value={newComment}
            onChange={handleCommentChange}
          />
        </p>
        <BasicBtn type="submit">create</BasicBtn>
      </form>
    </Togglable>
  )
  return <BasicDiv>
    <h1>{blog.title}</h1>
    <div>
      <a href='{blog.url}'>{blog.url}</a>
    </div>
    <div>
      likes: {blog.likes}
      <BasicBtn id={blog.id} onClick={handleLikes}>
          Like
      </BasicBtn><br></br>
      Added by {blog.user.name}<br></br>
      {state.user.username === blog.user.username
        ?<BasicBtn id={blog.id} onClick={handleRemoveBlog}>remove</BasicBtn>
        :null
      }
    </div>
    <BasicSubDiv>
      <h2>Comments</h2>
      {commentForm()}
      <div>
        <ul>
          {blog.comments.map( (comment, i) =>
            <li key={i}>{comment}</li>
          )}
        </ul>
      </div>
    </BasicSubDiv>
  </BasicDiv>
}

export default Blog
