import React, { useEffect } from 'react'
import {
  Switch, Route, Link, Redirect, useRouteMatch
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Notification from './components/utils/Notification'
import Blogs from './components/blogs/Blogs'
import Users from './components/users/Users'
import User from './components/users/User'
import Blog from './components/blogs/Blog'
import blogService from './services/blogs'
import userService from './services/users'

import { useDispatch, useSelector } from 'react-redux'

import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

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

  useEffect( () => {
    userService
      .getAll()
      .then(initialUsers => {
        console.log('initialUsers', initialUsers)
        dispatch(initUsers(initialUsers))
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

  const user = state.user
  const users = state.users
  const blogs = state.blogs
  const padding = {
    padding: 5
  }
  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchUser = useRouteMatch('/users/:id')
  console.log('matchUser', matchUser)
  const oneUser = matchUser
    ? users.find(user => {
      console.log(user.id,'match', matchUser.params.id)
      return user.id === matchUser.params.id
    })
    : null
  return (
    <Page>
      <Navigation>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {user.username
            ? <span><em>{user.username} logged in</em>
              <Logout localStoreKey={localStoreKey}/>
              <Redirect to="/" /></span>
            : <Redirect to="/login" />
          }
        </div>
        <Notification/>
        <Switch>
          <Route path="/blogs/:id">
            <Blog blog={blog} />
          </Route>
          <Route path="/blogs">
            <Blogs blogs={blogs} />
          </Route>
          <Route path="/users/:id">
            <User user={oneUser} />
          </Route>
          <Route path="/users">
            {user.username ? <Users /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <LoginForm localStoreKey={localStoreKey} />
          </Route>
          <Route path="/">
            <div></div>
          </Route>
        </Switch>
      </Navigation>

      <Footer>
        <br />
        <em>Blogs app by JR, task for Fullstackopen in University of Helsinki 2020</em>
      </Footer>
    </Page>
  )
}

export default App