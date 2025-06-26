import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './components/Counter.tsx'

describe('Counter', () => {
  /*it('renders the main heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /vite \+ react \+ tailwind/i })
    ).toBeInTheDocument()
  })*/

  it('increments the count when button is clicked', async () => {
    render(<Counter />)
    const button = screen.getByRole('button', { name: /count is/i })
    expect(button).toHaveTextContent('count is 0')
    await userEvent.click(button)
    expect(button).toHaveTextContent('count is 1')
  })
})
