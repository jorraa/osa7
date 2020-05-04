import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BasicBtn } from '../../styled/StyledComponents'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <p>
          Title: <input id='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </p>
        <p>
          Author: <input id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </p>
        <p>
          Url: <input id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </p>
        <BasicBtn type="submit">create</BasicBtn>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}


export default BlogForm