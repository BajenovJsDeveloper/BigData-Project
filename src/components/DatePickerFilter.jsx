import React, { useState } from 'react'
import { DatePicker } from 'rsuite'
import { disableDateFromTommorow, isDateBefore } from '../utils/dateapi'

export const DatePickerFilter = ({ onSelectDate }) => {
  const [date, setDate] = useState({ start: null, end: null })

  const selectStartDate = (dateValue) => {
    setDate((prev) => ({ ...prev, start: dateValue }))
    onSelectDate({ ...date, start: dateValue })
  }
  const selectEndDate = (dateValue) => {
    setDate((prev) => ({ ...prev, end: dateValue }))
    onSelectDate({ ...date, end: dateValue })
  }

  return (
    <div className="filter-container__right">
      <DatePicker
        oneTap
        cleanable={false}
        placeholder="Select Start Date"
        onChange={selectStartDate}
        value={date.start}
        disabledDate={(dateValue) =>
          isDateBefore(date.end, dateValue) ||
          disableDateFromTommorow(dateValue)
        }
      />
      <div className="dash" />
      <DatePicker
        oneTap
        cleanable={false}
        placeholder="Select End Date"
        onChange={selectEndDate}
        value={date.end}
        disabledDate={(dateValue) =>
          isDateBefore(dateValue, date.start) ||
          disableDateFromTommorow(dateValue)
        }
      />
    </div>
  )
}
