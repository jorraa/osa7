import React from 'react'
import PropTypes from 'prop-types'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  return (
    <div className={ props.className }>
      { props.notification }
    </div>
  )
}

Notification.propTypes = {
  className: PropTypes.string,
  notification: PropTypes.string
}

export default Notification