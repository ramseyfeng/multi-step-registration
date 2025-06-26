import { render, screen } from '@testing-library/react'
import DateFormatter from '../../src/components/common/DateFormatter'

describe('DateFormatter', () => {
  it('renders nothing if value is falsy', () => {
    const { container } = render(<DateFormatter value={null as unknown as number} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders formatted date for a timestamp', () => {
    const timestamp = new Date('2025-06-24').getTime()
    render(<DateFormatter value={timestamp} />)
    expect(screen.getByText('06/24/2025')).toBeInTheDocument()
  })

  it('renders formatted date for a string date', () => {
    render(<DateFormatter value="2025-06-24" />)
    expect(screen.getByText('06/24/2025')).toBeInTheDocument()
  })

  it('renders formatted date for a Date object', () => {
    render(<DateFormatter value={new Date('2025-06-24')} />)
    expect(screen.getByText('06/24/2025')).toBeInTheDocument()
  })

  it('renders with custom format', () => {
    render(<DateFormatter value="2025-06-24" format="YYYY/MM/DD" />)
    expect(screen.getByText('2025/06/24')).toBeInTheDocument()
  })

  it('renders empty string for invalid date', () => {
    render(<DateFormatter value="not-a-date" />)
    // Query all elements with the class 'date-formatter' and check for empty content
    const spans = document.querySelectorAll('.date-formatter')
    const emptySpans = Array.from(spans).filter((span) => span.textContent === '')
    expect(emptySpans.length).toBe(1)
  })
})
