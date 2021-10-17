import Togglable from './Togglable/Togglable'

function Form ({ inputValue, login, onLogin }) {
  return (
    <Togglable buttonLabel='show login'>
      <form onSubmit={onLogin}>
        <input
          type='text'
          value={login.username}
          placeholder='username'
          onChange={inputValue}
          name='username'
          required
        />
        <input
          type='password'
          value={login.password}
          placeholder='password'
          onChange={inputValue}
          name='password'
          required
        />
        <button>login</button>
      </form>
    </Togglable>
  )
}

export default Form
