import React from 'react'
import dayjs from 'dayjs'

interface DateFormatterProps {
  value: number | string | Date
  format?: string
}

const DateFormatter: React.FC<DateFormatterProps> = ({ value, format = 'MM/DD/YYYY' }) => {
  if (!value) return null
  const date = dayjs(value)
  return <span className="date-formatter">{date.isValid() ? date.format(format) : ''}</span>
}

export default DateFormatter
