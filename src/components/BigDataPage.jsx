import React, { useMemo, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { getChartData, getCompanyData } from "../utils/fetchdata"
import { options } from '../utils/chartoptions'
import { DatePickerFilter } from './DatePickerFilter'
import { calculateInterval } from '../utils/dateapi'
import { IntervalFilter } from './IntervalFilter'
import { formatNumberToLoclae } from '../utils/number-format'
import { Legend } from './Legend'

const LEGEND_FIELDS = ['open', 'close', 'low', 'hight', 'volume', 'change']

export function BigDataPage() {
  const [chartOptions, setChartOptions] = useState(options)
  const [companyData, setCompanyData] = useState({})

  const onSelectDate = (date) => {
    const daysInterval = calculateInterval(date)
    console.log("Interval: ", daysInterval)
  }

  const onSelectInterval = (value) => {
    console.log(value)
  }

  const getData = async() => {
    const data = await getCompanyData('aapl')
    console.log('Data: ', data)
    setCompanyData(data)
    const chartData = await getChartData('aapl', '3m')

    console.log('C-Data: ', chartData)
    const closes = chartData.map(cdata => [cdata.date, Math.round(cdata.close)])
    const volumes = chartData.map(cdata => [cdata.date, cdata.volume])
    const koef = chartData.length > 10 ? Math.round(chartData.length / 10) : 1
    const categories = chartData.map((cdata, idx) => idx%koef === 0 ? cdata.date : '')
    const series = [
      {
      type: 'column',
      data: volumes,
      showInLegend: false,
      yAxis: 0,
      name: 'Volume'
    }, 
    {
      type: 'spline',
      data: closes,
      showInLegend: false,
      yAxis: 1,
      name: 'Close'
    }]
    console.log('Closes: ', series)
    setChartOptions(prev => ({ ...prev, series, xAxis: { ...prev.xAxis, categories } }))  
  }

  const legendData = useMemo(() => {
    console.log('Recalc...')
    return LEGEND_FIELDS.map(item => ({ name: item, value: companyData[item] }))
  }, [companyData])

  const formatCurrency = (num) => {
    return formatNumberToLoclae(num, companyData.currency)
  }
  const formatCahangeStyle = () => {
    return `header-block__rating ${companyData.change < 0 ? 'negative': ''}`
  }

  return (
    <div className="main-container">
      <h1 className="main-container__title" onClick={getData}>Ract Page</h1>
      <header className="header-container">
        <div className="header-block">
          <p className="header-block__title">{companyData.symbol}</p>
          <p className="header-block__data">{companyData.latestPrice}</p>
        </div>
        <div className="header-block">
          <p className="header-block__name">{companyData.companyName}. - Telecomunnications equipment</p>
          <p className={formatCahangeStyle()}>{companyData.change}%</p>
        </div>
      </header>
      <section className="description-container">
        <p className="description-container__title">Earnings: 20-08-2020(BMO)</p>
        <p className="description-container__name">Market cap. {formatCurrency(companyData.marketCap)}</p>
      </section>
      <section className="filter-container">
        <IntervalFilter onSelectInterval={onSelectInterval}/>
        <DatePickerFilter onSelectDate={onSelectDate}/>
      </section>
      <section className="chart-container">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
        <Legend items={legendData}/>
      </section>
    </div>
  )
}