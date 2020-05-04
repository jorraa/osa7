import React from 'react'
import { useDispatch } from 'react-redux'

import { setUser } from '../reducers/userReducer'
import { BasicBtn } from '../styled/StyledComponents'

const Logout = ({ localStoreKey }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem(localStoreKey)
    dispatch(setUser(null))
  }
  return <BasicBtn onClick={handleLogout}>Logout</BasicBtn>
}

export default Logout