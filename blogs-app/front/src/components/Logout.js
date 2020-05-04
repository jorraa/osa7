import React from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '../reducers/userReducer'

const Logout = ({ localStoreKey }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem(localStoreKey)
    dispatch(setUser(null))
  }
  return <button onClick={handleLogout}>Logout</button>
}

export default Logout