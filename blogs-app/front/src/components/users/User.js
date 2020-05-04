import React from 'react'

import { BasicDiv } from '../../styled/StyledComponents'
const User = ({ user }) => {
  if(!user) {return null}
  return <BasicDiv>
    <h1>{user.name}</h1>
    <h2>Added blogs</h2>
    <ol>
      {user.blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <li key={blog.id}>{blog.title} Likes: {blog.likes}</li>
      )}
    </ol>
  </BasicDiv>
}

export default User
