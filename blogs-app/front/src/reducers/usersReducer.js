export const initUsers = (users) => {
  console.log('init users', users)
  return {
    type: 'INIT_USERS',
    data: users
  }
}


const usersReducer = (state = [], action) => {
  console.log('UsersReducer state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default usersReducer