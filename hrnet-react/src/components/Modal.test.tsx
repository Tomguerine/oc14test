import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal accessibility', () => {
  it('is announced using its title', async () => {
    const user = userEvent.setup()
    render(
      <Modal trigger={<button>Open</button>} title="My dialog">
        Content
      </Modal>
    )

    await user.click(screen.getByRole('button', { name: /open/i }))

    expect(
      await screen.findByRole('alertdialog', { name: 'My dialog' })
    ).toBeInTheDocument()
  })
})

