import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonLabel = 'default value ok sucio' }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {
      visible
        ? (
          <div>
            {children}
            <button onClick={toggleVisibility}>cancel</button>
          </div>
          )
        : (
          <div>
            <button onClick={toggleVisibility}>{buttonLabel}</button>
          </div>
          )
    }
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Togglable
