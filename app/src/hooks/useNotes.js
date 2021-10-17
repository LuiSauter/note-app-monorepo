// mensaje importante, esta app es solo prueebas ya que no es reutilizable
// que hace? - refactorizar los estados y crear components inteligentemente
import { useEffect, useState } from 'react'
import { createNote, getAllNotes, setToken, updateNote } from '../services/notes'
import { loginUser } from '../services/login'

const initialValue = { username: '', password: '' }

const storageName = 'loggedNoteAppUser'

const useNotes = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(true)
  const [login, setLogin] = useState(initialValue)
  const [userlg, setUserlg] = useState(null)

  useEffect(() => {
    setLoading(true)
    getAllNotes()
      .then(res => {
        setNotes((prevNotes) => prevNotes.concat(res))
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storageName)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserlg(user)
      setToken(user.token)
    }
  }, [])

  const inputValue = (e) => {
    const data = { ...login }
    setLogin({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const onLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginUser({
        username: login.username,
        password: login.password
      })

      window.localStorage.setItem(storageName, JSON.stringify(user))

      setUserlg(user)
      setToken(user.token)

      setLogin({ username: '', password: '' })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    setUserlg(null)
    setToken(userlg.token)
    window.localStorage.removeItem(storageName)
  }

  const addNote = (noteObject) => {
    createNote(noteObject).then(newNotes => {
      console.log(newNotes)
      setNotes(prevNotes => [...prevNotes, newNotes])
    })
      .catch(err => console.log(err))
  }

  const handleShowAll = () => {
    setShowAll(!showAll)
    const note = [...notes]
    if (showAll) {
      const userImportant = note.filter(user => user.important === false)
      console.log(note)
      setNotes(userImportant)
    } else {
      const note = [...notes]
      console.log(note)
      getAllNotes().then(notes => {
        setNotes(notes)
      })
    }
  }

  const handleImportant = (data) => {
    const { content, important, id } = data
    console.log(important, 'useNotes')
    const noteUpdate = {
      content: content,
      important: important,
      id
    }
    console.log(data)
    updateNote(noteUpdate).then((data) => data)
  }

  return {
    loading,
    notes,
    showAll,
    login,
    userlg,
    addNote,
    handleShowAll,
    onLogin,
    inputValue,
    handleLogout,
    handleImportant
  }
}

export default useNotes
