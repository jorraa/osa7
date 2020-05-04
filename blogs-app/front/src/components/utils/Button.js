import React from 'react'

import PropTypes from 'prop-types'
import { BasicBtn } from '../../styled/StyledComponents'

const Button = ({ handleClick, text }) => (
  <BasicBtn onClick={handleClick}>
    {text}
  </BasicBtn>
)

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}
export default Button