import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PapayaTable } from '../../styled/StyledComponents'
const Users = () => {
  const state = useSelector(state => state)
  const users = state.users
  if(!state.users) return <div></div>
  return <div>
    <h1>Users</h1>
    <PapayaTable>
      <thead>
        <tr><th>User</th><th>Blogs created</th></tr>
      </thead>
      <tbody>
        {users.sort((a, b) => (a.username < b.username) ? -1 : 1).map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </PapayaTable>
  </div>
}

export default Users