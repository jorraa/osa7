import React from 'react'
import { useSelector } from 'react-redux'
import { PapayaTable } from '../../styled/StyledComponents'
const Users = () => {
  const state = useSelector(state => state)
  const users = state.users
  if(!state.users) return <div></div>
  return <div>
    <h1>Users</h1>
    <PapayaTable>
      <tr><th></th><th>Blogs created</th></tr>
      {users.sort((a, b) => (a.usersname < b.username) ? -1 : 1).map(user =>
        <tr key={user.id}>
          <td>{ user.name }</td><td>{user.blogs.length}</td>
        </tr>
      )}
    </PapayaTable>
  </div>
}

export default Users