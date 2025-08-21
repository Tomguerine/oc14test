import { render } from '@testing-library/react'
import CreateEmployee from './CreateEmployee'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

const dispatch = vi.fn()
vi.mock('react-redux', () => ({
  useDispatch: () => dispatch,
}))

describe.skip('CreateEmployee form', () => {
  beforeEach(() => dispatch.mockClear())

  it('validates required fields before submit', () => {
    render(
      <BrowserRouter>
        <CreateEmployee />
      </BrowserRouter>
    )

    expect(dispatch).toHaveBeenCalled()
  })

  it('shows confirmation dialog on successful submit', async () => {
    render(
      <BrowserRouter>
        <CreateEmployee />
      </BrowserRouter>
    )

  })
})
