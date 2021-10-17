import { useState } from 'react'

const ListNotes = ({ notes, handleImportant }) => {
  const [important, setImportant] = useState(notes.important)

  const onClick = () => {
    setImportant(!important)
    const noteUpdate = {
      content: notes.content,
      important: !important,
      id: notes.id
    }
    console.log(noteUpdate)
    handleImportant(noteUpdate)
  }
  return (
    <li>
      <div>
        {notes.content}
        <button onClick={onClick}>
          {
            important ? 'make not important' : 'make important'
          }
        </button>
      </div>
    </li>
  )
}

export default ListNotes
