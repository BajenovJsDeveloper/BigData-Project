import React, { useEffect, useMemo, useRef, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { getChartData, getCompanyData } from '../utils/fetchdata'
import { options, SERIES } from '../utils/chartconfig'
import { DatePickerFilter } from './DatePickerFilter'
import {
  calculateInterval,
  fiterChartData,
  getDateTime,
  getInitialData,
} from '../utils/dateapi'
import { IntervalFilter } from './IntervalFilter'
import { Legend } from './Legend'
import { Loading } from './Loading'
import { Error } from './Error'
import { Header } from './Header'
import { Description } from './Description'

const LEGEND_FIELDS = ['open', 'close', 'low', 'hight', 'volume', 'change']
const COMPNY_NAME = 'aapl'

export function BigDataPage() {
  const [chartOptions, setChartOptions] = useState(options)
  const [companyData, setCompanyData] = useState({})
  const [daysInterval, setDaysInterval] = useState(getInitialData())
  const [showLegend, setShowLegend] = useState(false)
  const [errorData, setErrorData] = useState({ isError: false, title: '' })
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  const onSelectDate = (date) => {
    const daysInterval = calculateInterval(date)
    setDaysInterval(daysInterval)
  }

  const onSelectInterval = (value) => {
    console.log(value)
  }

  const loadData = async (companyName) => {
    const data = await getCompanyData(companyName)
    setCompanyData(data)
    const response = await getChartData(companyName, daysInterval)
    if (response.data) {
      const responseData = response.data
      const chartData = fiterChartData(responseData, daysInterval)
      console.log('C-Data: ', chartData)
      const closes = chartData.map((cdata) => [
        getDateTime(cdata, daysInterval.total),
        Math.round(cdata.close),
      ])
      const volumes = chartData.map((cdata) => [
        getDateTime(cdata, daysInterval.total),
        cdata.volume,
      ])
      const koef = chartData.length > 10 ? Math.round(chartData.length / 10) : 1
      const categories = chartData.map((cdata, idx) =>
        idx % koef === 0 ? getDateTime(cdata, daysInterval.total) : ''
      )

      SERIES[0].data = volumes
      SERIES[1].data = closes
      setChartOptions((prev) => ({
        ...prev,
        series: SERIES,
        xAxis: { ...prev.xAxis, categories },
      }))
      if (chartData.length) setShowLegend(true)
      setErrorData({ isError: false, message: '' })
    } else {
      setErrorData({ isError: true, message: response.message })
    }
    setIsLoading(false)
  }

  const legendData = useMemo(() => {
    return LEGEND_FIELDS.map((item) => ({
      name: item,
      value: companyData[item],
    }))
  }, [companyData])

  useEffect(async () => {
    if (daysInterval.total) await loadData(COMPNY_NAME)
    if (daysInterval.total === null) {
      setIsLoading(true)
      await loadData(COMPNY_NAME)
    }
  }, [daysInterval])

  useEffect(() => {
    const showLegend = () => setShowLegend(true)
    const hideLegend = () => setShowLegend(false)
    if (ref.current) {
      ref.current.addEventListener('mouseleave', showLegend)
      ref.current.addEventListener('mouseenter', hideLegend)
      return [showLegend, hideLegend]
    }
  }, [ref])

  return (
    <div className="main-container">
      <Header companyData={companyData} />
      <Description companyData={companyData} />
      <section className="filter-container">
        <IntervalFilter onSelectInterval={onSelectInterval} />
        <DatePickerFilter onSelectDate={onSelectDate} />
      </section>
      <section ref={ref} className="chart-container">
        <Legend items={legendData} show={showLegend} />
        <Error message={errorData.message} isError={errorData.isError} />
        <Loading isLoading={isLoading} />
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </section>
      <footer className="footer-container"></footer>
    </div>
  )
}
