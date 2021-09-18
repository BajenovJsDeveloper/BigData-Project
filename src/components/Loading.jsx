import React from 'react'

export const Loading = ({ isLoading }) => {
  if (!isLoading) return null
  return (
    <div className="loading-container">
      <p className="loading-container__text">Loading...</p>
    </div>
  )
}
