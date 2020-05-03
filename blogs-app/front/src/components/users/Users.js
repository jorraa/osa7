import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const state = useSelector(state => state)
  const users = state.users

  return <div>{ users.sort((a, b) => (a.usersname < b.username) ? -1 : 1).map(user =>
    <div key={user.id}>
      { user.username }
    </div>
  )}
  </div>
}

export default Users