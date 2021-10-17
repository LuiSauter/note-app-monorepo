import axios from 'axios'
import config from '../config'

const { BASE_LOGIN_URL } = config

export const loginUser = async (credentials) => {
  const { username, password } = credentials
  const { data } = await axios.post(BASE_LOGIN_URL, { username, password })
  console.log(data)
  return data
}

// export default loginUser
