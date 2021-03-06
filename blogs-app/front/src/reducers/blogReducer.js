export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: blog
  }
}

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: { id }
  }
}

export const initBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'UPDATE_BLOG':
    return state.map(a =>
      a.id !== action.data.id ? a : action.data
    )
  case 'REMOVE_BLOG':
    return state.filter(a =>
      a.id !== action.data.id)
  default:
    return state
  }
}

export default blogReducer