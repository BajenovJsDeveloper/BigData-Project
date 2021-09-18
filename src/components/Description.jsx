import React from 'react'
import { formatNumberToLoclae } from '../utils/number-format'

export const Description = ({ companyData }) => {
  const formatCurrency = () => {
    return formatNumberToLoclae(companyData.marketCap, companyData.currency)
  }

  return (
    <section className="description-container">
      <p className="description-container__title">Earnings: 20-08-2020(BMO)</p>
      <p className="description-container__name">
        Market cap. {formatCurrency()}
      </p>
    </section>
  )
}
