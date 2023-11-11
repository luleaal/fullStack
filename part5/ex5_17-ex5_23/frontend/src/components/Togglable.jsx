import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const cancelStyle = {
    color: 'white',
    backgroundColor: 'red'
  }

  return (
    <div>
      <div style={hideWhenVisible} >
        <button id='viewButton' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button id='cancelButton' style={cancelStyle} onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

export default Togglable