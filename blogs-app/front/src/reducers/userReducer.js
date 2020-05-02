export const setUser = (user) => {
  console.log('add user', user)
  return {
    type: 'SET_USER',
    data: user
  }
}


const userReducer = (state = {}, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer