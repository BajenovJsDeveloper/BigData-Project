import React, { useMemo } from 'react'

export const Legend = ({ items, show }) => {
  const classes = `legend-container ${
    show ? 'legend-container__show' : 'legend-container__hide'
  }`
  const itemsList = useMemo(() => {
    return items.map((item) => {
      console.log('List')
      return (
        <React.Fragment key={item.name}>
          <p className="legend-container__left">{item.name}</p>
          <p className="legend-container__right">{item.value || ' - '}</p>
        </React.Fragment>
      )
    })
  }, [items])
  return <div className={classes}>{itemsList}</div>
}
