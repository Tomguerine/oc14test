import { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

/**
 * Props for the {@link Modal} component.
 * @property trigger - Element that opens the modal when clicked
 * @property title - Optional title displayed at the top of the dialog
 * @property children - Modal content
 * @property open - Controlled open state
 * @property onOpenChange - Callback invoked when the open state changes
 * @property firstName - First name displayed in the dialog content
 * @property lastName - Last name displayed in the dialog content
 */
type ModalProps = {
  trigger?: ReactNode
  title?: ReactNode
  children: ReactNode
  open?: boolean
    // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void
  firstName?: string
  lastName?: string
}

/**
 * Simple modal dialog built with Radix UI's Dialog primitives.
 */
function Modal({
  trigger,
  title,
  children,
  open,
  onOpenChange,
  firstName,
  lastName,
}: ModalProps) {
  if (!open || !firstName || !lastName) return null
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
          aria-labelledby="modal-title"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg"
        >
          {title && (
            <Dialog.Title id="modal-title" className="mb-2 font-bold">
              {title}
            </Dialog.Title>
          )}
          <div>
            {firstName} {lastName}
          </div>
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
