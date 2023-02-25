import { render, screen } from '@testing-library/react'
import App from './App'
import Login from './pages/Login'

test('renders link', () => {
    render(<Login />)
    const link = screen.getByPlaceholderText(/email/i)
    expect(link.textContent).toBe("")
})

