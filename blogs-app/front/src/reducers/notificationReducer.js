const createNotification = (message, className) => {
  console.log('createNotification, msg', message)
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message: message,
      className: className
    }
  }
}

const clearNotification = (message) => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: {
      message: message,
    }
  }
}

const notificationReducer = (state = '{}', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    return [action.data]
  case 'CLEAR_NOTIFICATION':
    return []

  default:
    return state
  }
}
let timeoutID = 0
export const setNotification = (message, timeout, className) => {
  if(timeoutID) {
    clearTimeout(timeoutID)
  }
  return async dispatch => {
    dispatch(createNotification(message, className))
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout*1000)
  }
}

export const setInfoMessage = (message, timeout) => {
  return setNotification(message, timeout, 'info')
}
export const setErrorMessage = (message, timeout) => {
  setNotification(message, timeout, 'error')
}
export default notificationReducer