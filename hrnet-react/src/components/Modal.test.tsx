import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalPop from 'modal-pop-up-tom'

describe('Modal accessibility', () => {
  it('is announced using its title', async () => {
    const user = userEvent.setup()
    render(
      <ModalPop
        trigger={<button>Open</button>}
        title="My dialog"
        firstName="Jane"
        lastName="Doe"
      >
        Content
      </ModalPop>
    )

    await user.click(screen.getByRole('button', { name: /open/i }))

    expect(
      await screen.findByRole('alertdialog', { name: 'My dialog' })
    ).toBeInTheDocument()
    expect(await screen.findByText('Jane Doe')).toBeInTheDocument()
  })
})

