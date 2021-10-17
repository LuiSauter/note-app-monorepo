import { useState, useRef } from 'react'
import Togglable from './Togglable/Togglable'

const NewTask = ({ handleLogout, addNote }) => {
  const [newNote, setNewNote] = useState('')
  const togglebleRef = useRef()

  // Crear nuevas notas
  const handleChange = (e) => {
    if (e.target.value !== '') {
      setNewNote(e.target.value)
    } else {
      setNewNote('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newNote !== '') {
      const noteToAddState = {
        content: newNote,
        important: false
      }
      addNote(noteToAddState)
      togglebleRef.current.toggleVisibility()
      setNewNote('')
    }
  }

  return (
    <Togglable ref={togglebleRef} buttonLabel='show create note'>
      <h3>Create note</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='write a new note'
          type='text'
          onChange={handleChange}
          value={newNote}
          name='content'
          required
        />
        <button>save</button>
      </form>
      <button onClick={handleLogout}>
        Cerrar sesion
      </button>
    </Togglable>
  )
}

export default NewTask
