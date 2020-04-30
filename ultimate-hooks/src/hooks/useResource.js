import { useState, useEffect } from 'react'
import axios from 'axios'


export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  let token = null

//  const setToken = newToken => {
//    token = `bearer ${newToken}`
//  }

  const getAll = () => {
    const request = axios.get(baseUrl)

    request.then(
      response => {
        setResources(response.data)
      }
    )
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    setResources(resources.concat(response.data))
    return response.data
  }

  const update = (id, newObject) => {
    const request = axios.put(`${ baseUrl } /${id}`, newObject)
    return request.then(response => response.data)
  }
  const service = {
    getAll,
    create,
    update
  }

  useEffect(() => {
    getAll()
  },[])

  return [
    resources, service
  ]
}

export default { useResource }