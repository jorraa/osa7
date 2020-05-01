import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const state = useSelector(state => state)

  const props = state.length > 0
    ?state[0].message !== null
      ?state[0]:null
    :null

  return props === null
    ? null
    :<div className={ props.className }>
      { props.message }
    </div>
}

Notification.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string
}

export default Notification