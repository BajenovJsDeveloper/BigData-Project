import React from "react"

export const Legend = ({ items }) => {
  return (
    <div className="legend-container">
      {items.map( item => (
        <React.Fragment key={item.name}>
          <p className="legend-container__left">{item.name}</p>
          <p className="legend-container__right">{item.value || ' - '}</p>
        </React.Fragment>
      ))} 
    </div>
  )
}