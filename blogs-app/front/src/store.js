import { createStore, /*combineReducers,*/ applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
//import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
//import filterReducer from './reducers/filterReducer'

/*
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})
*/
export const store = createStore(
  notificationReducer, // reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)