import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async blog => {
  const config = {
    headers: { Authorization: token,
      'Content-Transfer-Encoding': 'application/json' },
  }

  const response = await axios.put(baseUrl+`/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token,
      'Content-Transfer-Encoding': 'application/json' }
  }
  console.log('-------0')
  const response = await axios.delete(baseUrl + `/${blog.id}`, config)

  return response.data
}

export default { getAll, setToken, create, addLike, deleteBlog }