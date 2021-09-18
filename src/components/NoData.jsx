import React from 'react'

export const NoData = ({ seriesData }) => {
  if (seriesData.length && seriesData[0].data && seriesData[0].data.length) return null
  return (
    <div className="nodata-container">
      <p className="text">No data to display. Select interval please.</p>
    </div>
  )
}