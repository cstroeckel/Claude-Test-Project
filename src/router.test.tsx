import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import { routes } from './router.tsx'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
}

describe('routing', () => {
  it('shows the dashboard at /', () => {
    renderAt('/')
    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument()
  })

  it('navigates to Buchungen via the nav', async () => {
    renderAt('/')
    await userEvent.click(screen.getByRole('link', { name: 'Buchungen' }))
    expect(
      screen.getByRole('heading', { name: 'Buchungen' }),
    ).toBeInTheDocument()
  })
})
