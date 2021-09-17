import React from "react"

const intervals = ['1D', '1W', '1M', '3M', '6M', '1Y', '2Y', '5Y', 'ALL']

const Item = ({ item, classes, onSelectItem}) => {
  return (
    <div className={classes} onClick={() => onSelectItem(item)}>
      <p>{item}</p>
    </div>
  )
}

export const IntervalFilter = ({ onSelectInterval }) => {
  
  return (
    <div className="filter-container__left">
      {intervals.map(item => {
        const classes = `filter-item ${item === '1M' ? 'filter-item__active' : ''}`
        return <Item item={item} classes={classes} onSelectItem={onSelectInterval} key={item}/>
      })}
    </div>
  )
}

