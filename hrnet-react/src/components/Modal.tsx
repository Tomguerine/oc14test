import { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type ModalProps = {
  trigger?: ReactNode
  title?: ReactNode
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Modal({ trigger, title, children, open, onOpenChange }: ModalProps) {
  const [live, setLive] = useState('')
  return (
    <Dialog.Root
      open={open}
      onOpenChange={o => {
        onOpenChange?.(o)
        setLive(o ? 'Dialog opened' : 'Dialog closed')
      }}
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          role="alertdialog"
          aria-modal="true"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg"
        >
          {title && <Dialog.Title className="mb-2 font-bold">{title}</Dialog.Title>}
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="mt-4" aria-label="Close">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
      <div aria-live="assertive" className="sr-only">
        {live}
      </div>
    </Dialog.Root>
  )
}

export { Modal }
export default Modal
