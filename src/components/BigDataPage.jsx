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
  getInitialError,
} from '../utils/dateapi'
import { IntervalFilter } from './IntervalFilter'
import { Legend } from './Legend'
import { Loading } from './Loading'
import { Error } from './Error'
import { Header } from './Header'
import { Description } from './Description'
import { NoData } from './NoData'

const LEGEND_FIELDS = ['open', 'close', 'low', 'high', 'volume', 'change']
const COMPNY_NAME = 'aapl'
const INTERVAL = 1000 * 30  //interval time 1000ms * 30sec = 0.5min
const STEP = 10
const STEP_K = 10
const CHART_1 = 0
const CHART_2 = 1
const STEP_DEFAULT = 1

export function BigDataPage() {
  const [chartOptions, setChartOptions] = useState(options)
  const [companyData, setCompanyData] = useState({})
  const [daysInterval, setDaysInterval] = useState(getInitialData())
  const [showLegend, setShowLegend] = useState(false)
  const [errorData, setErrorData] = useState(getInitialError())
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  const onSelectDate = (date) => {
    const daysInterval = calculateInterval(date)
    setDaysInterval(daysInterval)
  }

  const onSelectInterval = (value) => {
    console.log('Selected interval: ',value)
  }

  const loadData = async (companyName) => {
    const data = await getCompanyData(companyName)
    setCompanyData(data)
    const response = await getChartData(companyName, daysInterval)
    if (response.data) {
      const chartData = fiterChartData(response.data, daysInterval)
      const closes = chartData.map((cdata) => [
        getDateTime(cdata, daysInterval.total),
        Math.round(cdata.close),
      ])
      const volumes = chartData.map((cdata) => [
        getDateTime(cdata, daysInterval.total),
        cdata.volume,
      ])
      const step = chartData.length > STEP ? Math.round(chartData.length / STEP_K) : STEP_DEFAULT
      const categories = chartData.map((cdata, idx) =>
        idx % step === 0 ? getDateTime(cdata, daysInterval.total) : ''
      )

      SERIES[CHART_1].data = volumes
      SERIES[CHART_2].data = closes
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

  useEffect(() => {
    const timerID = setInterval(async () => {
      console.log('Updating data...')
      const data = await getCompanyData(COMPNY_NAME)
      setCompanyData(data)
    }, INTERVAL)
    return () => clearInterval(timerID)
  },[])

  return (
    <div className="main-container">
      <Header companyData={companyData} />
      <Description companyData={companyData} />
      <section className="filter-container">
        <IntervalFilter onSelectInterval={onSelectInterval} />
        <DatePickerFilter onSelectDate={onSelectDate} />
      </section>
      <section ref={ref} className="chart-container">
        <NoData seriesData={chartOptions.series}/>
        <Legend items={legendData} show={showLegend} />
        <Error message={errorData.message} isError={errorData.isError} />
        <Loading isLoading={isLoading} />
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </section>
      <footer className="footer-container"></footer>
    </div>
  )
}
