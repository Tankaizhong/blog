import React from 'react'

const Button = ({ onClick, disabled, className, style, children, testId }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
      data-testid={testId}
    >
      {children}
    </button>
  )
}

export default Button
