import axios from 'axios'
import config from '../../config'
const { BASE_NOTES_URL } = config

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllNotes = async () => {
  try {
    const res = await axios.get(BASE_NOTES_URL)
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
  }
}

export const createNote = async (noteToAddState) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    }
    const { content, important } = noteToAddState
    const res = await axios.post(BASE_NOTES_URL, { content, important }, config)
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
  }
}

export const updateNote = async (newObject) => {
  try {
    const config = {
      headers: {
        Authorization: token
      }
    }
    console.log(newObject)
    const reques = await axios.put(`${BASE_NOTES_URL}/${newObject.id}`, newObject, config)
    console.log(reques)
    // return reques
  } catch (error) {
  }
}
