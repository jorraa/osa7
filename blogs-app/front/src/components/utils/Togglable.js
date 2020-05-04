import React, { useState, useImperativeHandle } from 'react'

import { BasicBtn } from '../../styled/StyledComponents'

// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
      <div style={hideWhenVisible}>
        {props.befButton1} {props.befButton2}
        <BasicBtn onClick={toggleVisibility}>{props.buttonLabel}</BasicBtn>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <BasicBtn onClick={toggleVisibility}>cancel</BasicBtn>
      </div>
    </div>
  )
})

export default Togglable