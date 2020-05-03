export const setUsers = (users) => {
  console.log('add users', users)
  return {
    type: 'SET_USER',
    data: users
  }
}


const usersReducer = (state = {}, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'SET_USERS':
    return action.data
  default:
    return state
  }
}

export default usersReducer