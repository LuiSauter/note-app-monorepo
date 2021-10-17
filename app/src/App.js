import './App.css'
import NewTask from './components/NewTask'
import ListNotes from './components/Notes/ListNotes'

import useNotes from './hooks/useNotes'
import ButtonShowAll from './components/ButtonShowAll'
import Form from './components/Form'

const App = () => {
  const {
    loading, notes, addNote, showAll, handleShowAll, onLogin, inputValue, login, userlg, handleLogout, handleImportant
  } = useNotes()
  return (
    <div className='App'>
      {
        !userlg
          ? <Form
              onLogin={onLogin} inputValue={inputValue} login={login}
            />
          : <NewTask
              addNote={addNote} handleLogout={handleLogout}
            />
      }
      <h1>NOTES</h1>
      {
        loading ? 'Cargando...' : ''
      }
      <ButtonShowAll handleShowAll={handleShowAll} showAll={showAll} />
      <ul>
        {
          notes.map((notes) =>
            <ListNotes key={notes.id} notes={notes} handleImportant={handleImportant} />
          )
        }
      </ul>
    </div>
  )
}

export default App
