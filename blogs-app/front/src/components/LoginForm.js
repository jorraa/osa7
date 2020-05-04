import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'
import loginService from '../services/login'

import { setUser } from '../reducers/userReducer'
import { setErrorMessage } from '../reducers/notificationReducer'

import { BasicDiv, BasicBtn } from '../styled/StyledComponents'

const LoginForm = ({
  localStoreKey
}) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.doLogin(
        username, password
      )
      window.localStorage.setItem(localStoreKey, JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorMessage('wrong username or password', 10))
    }
  }

  return (
    <BasicDiv>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <BasicBtn id='login-button' type="submit">login</BasicBtn>
      </form>
    </BasicDiv>
  )
}

LoginForm.propTypes = {
  localStoreKey: PropTypes.string.isRequired
}
export default LoginForm