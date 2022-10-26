import React from 'react'

export const Alert = ({type,text}) => {
  return (
    <div className={`alert alert-Rs.{type}`}>{text}</div>
  )
}

export default Alert