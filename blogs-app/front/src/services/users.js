import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = (userId) => {
  if( userId === null) { return null }

  const request = axios.get(`${baseUrl}/${userId}`)
  return request
    .then(response => response.data)
    .catch(error => error.response.data)
}

export default { getUser, getAll }