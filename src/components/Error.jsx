import React from 'react'

export const Error = ({ message, isError }) => {
  if (!isError) return null
  return (
    <div className="error-container">
      <p className="error-container__text">{message}</p>
    </div>
  )
}
