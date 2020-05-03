import React, { useEffect } from 'react'

import LoginForm from './components/LoginForm'
import Notification from './components/utils/Notification'
import Blogs from './components/blogs/Blogs'
import Button from './components/utils/Button'
//import Footer from './components/Footer'
import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'

import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import { Page } from './styled/StyledComponents'
import { Navigation } from './styled/StyledComponents'
import { Footer } from './styled/StyledComponents'

const App = () => {
  const dispatch = useDispatch()

  const state = useSelector(state => state)

  const localStoreKey = 'loggedBlogappUser'

  useEffect( () => {
    blogService
      .getAll()
      .then(initialBlogs => {
        dispatch(initBlogs(initialBlogs))
      })
      // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStoreKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
    // eslint-disable-next-line
  }, [])

  const handleLogout = () => {
    localStorage.removeItem(localStoreKey)
    dispatch(setUser(null))
  }

  console.log('state.user', state.user)
  return (
    <Page>
      <Navigation>
        aaa
      </Navigation>
      <Notification/>
      {!state.user.username ?
        <LoginForm localStoreKey={localStoreKey}/>:
        <div>
          <p>{state.user.name} logged in
            <Button handleClick={handleLogout} text='logout' />
          </p>
          <Blogs/>
        </div>
      }
      <Footer>
        <br />
        <em>Blogs app by JR, task for Fullstackopen in University of Helsinki 2020</em>
      </Footer>
    </Page>
  )
}

export default App