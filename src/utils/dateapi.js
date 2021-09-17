import moment from "moment"

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
  if ( dateA && dateB) return dateB.diff(dateA, "days") + 1
  return null
}