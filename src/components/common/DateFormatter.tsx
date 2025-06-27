import React from 'react'
import { format as formatDate, isValid, parseISO } from 'date-fns'

interface DateFormatterProps {
  value: number | string | Date
  format?: string
}

const DateFormatter: React.FC<DateFormatterProps> = ({ value, format = 'MM/dd/yyyy' }) => {
  if (!value) return null
  let date: Date
  if (typeof value === 'string') {
    date = parseISO(value)
  } else {
    date = new Date(value)
  }
  return <span className="date-formatter">{isValid(date) ? formatDate(date, format) : ''}</span>
}

export default DateFormatter
