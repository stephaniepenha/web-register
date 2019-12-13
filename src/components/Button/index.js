import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.module.css'

const Button = ({ className, color, children, type, onClick, disabled }) => (
  <button
    type={type}
    onClick={onClick}
    className={classNames(style.button, className, style[color])}
    disabled={disabled}
  >
    {children}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  className: '',
  type: 'button',
  color: 'primary',
  onClick: null,
  disabled: null,
}

export default Button
