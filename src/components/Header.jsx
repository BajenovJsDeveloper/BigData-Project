import React from 'react'

export const Header = ({ companyData }) => {
  const formatCahangeStyle = () => {
    return `header-block__rating ${companyData.change < 0 ? 'negative' : ''}`
  }

  return (
    <React.Fragment>
      {companyData.companyName && (
        <header className="header-container">
          <div className="header-block">
            <p className="header-block__title">{companyData.symbol}</p>
            <p className="header-block__data">{companyData.latestPrice}</p>
          </div>
          <div className="header-block">
            <p className="header-block__name">
              {companyData.companyName}. - Telecomunnications equipment
            </p>
            <p className={formatCahangeStyle()}>{companyData.change}%</p>
          </div>
        </header>
      )}
    </React.Fragment>
  )
}
