import moment from 'moment'
import _ from 'lodash'

const INTERVAL = {
  'all': 1825,
  '5y': 730,
  '2y': 365,
  '1y': 182,
  '6m': 91,
  '3m': 30,
  '1m': 5,
  '5d': 1
}

const DAYS_PER_MONTH = 30
const DEFAULT_RANGE = '1m'
const PER_10_MIN = 5
const TWO_DAYS = 2
const YEAR = 12
const WEEK = 7


export const disableDateFromTommorow = (dateA) => {
  if (moment(dateA).isAfter(new Date())) return true
  return false
}

export const isDateBefore = (dateA, dateB) => {
  if (moment(dateA).isBefore(dateB) && dateA && dateB) return true
  return false
}

export const calculateInterval = (date) => {
  const dateA = moment(date.start)
  const dateB = moment(date.end)
  const dateNow = moment()
  const diff = dateA ? dateNow.diff(dateA, 'days') + 1 : null
  const total = dateA && dateB ? dateB.diff(dateA, 'days') + 1 : null
  const interval = {
    total,
    range: '1m',
    start: dateA.format('YYYY-MM-DD'),
    end: dateB.format('YYYY-MM-DD'),
    isOneDay: false,
  }

  if (dateA && dateB) {
    if (total === 1) {
      interval.range = `date/${moment(dateA).format('YYYYMMDD')}`
      interval.isOneDay = true
    } else if (diff > INTERVAL['all']) interval.range = 'all'
    else if (diff > INTERVAL['5y']) interval.range = '5y'
    else if (diff > INTERVAL['2y']) interval.range = '2y'
    else if (diff > INTERVAL['1y']) interval.range = '1y'
    else if (diff > INTERVAL['6m']) interval.range = '6m'
    else if (diff > INTERVAL['3m']) interval.range = '3m'
    else if (diff > INTERVAL['1m']) interval.range = '1m'
    else if (diff > INTERVAL['5d']) interval.range = '5d'
  }
  return interval
}

export const fiterChartData = (chartData, daysInterval) => {
  const fiteredData = chartData.filter((item) =>
    moment(item.date).isBetween(
      daysInterval.start,
      daysInterval.end,
      undefined,
      '[]'
    )
  )
  if (daysInterval.total > DAYS_PER_MONTH * YEAR) {
    let month = _.groupBy(
      fiteredData,
      (item) => `${moment(item.date).year()}-${moment(item.date).month() + 1}`
    )
    return Object.values(month).map((item) => item[0])
  }

  if (daysInterval.total > DAYS_PER_MONTH * 3) {
    return fiteredData.filter((item, idx) => (idx % WEEK === 0 ? item : false))
  }

  if (daysInterval.total > DAYS_PER_MONTH) {
    return fiteredData.filter((item, idx) =>
      idx % TWO_DAYS === 0 ? item : false
    )
  }

  if (daysInterval.total === 1) {
    return fiteredData.filter((item, idx) =>
      idx % PER_10_MIN === 0 ? item : false
    )
  }

  return fiteredData
}

export const getDateTime = (dateTime, interval) => {
  if (interval > DAYS_PER_MONTH * YEAR)
    return moment(dateTime.date).format('YYYY-MMM')
  if (interval > DAYS_PER_MONTH) return moment(dateTime.date).format('MMM-DD')
  if (interval > 1) return moment(dateTime.date).format('MMM-DD')
  if (interval === 1) return dateTime.minute
  return dateTime.date
}

export const getInitialData = () => {
  return {
    total: null,
    range: DEFAULT_RANGE,
    start: moment(-5).format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  }
}

export const getInitialError = () => {
  return { isError: false, title: '' }
}
