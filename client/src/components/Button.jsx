import React from 'react'

const Button = (children) => {
  return (
    <div>
        <button style={children}>{children.value}</button>
      
    </div>
  )
}

export default Button
