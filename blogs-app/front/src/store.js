import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
//import filterReducer from './reducers/filterReducer'


const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducer,
  user: userReducer,
  users: usersReducer
})

export const store = createStore(
  reducer ,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)