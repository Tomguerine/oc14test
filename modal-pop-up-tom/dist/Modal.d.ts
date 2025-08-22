import { ReactNode } from 'react';
/**
 * Props for the {@link ModalPop} component.
 * @property trigger - Element that opens the modal when clicked
 * @property title - Optional title displayed at the top of the dialog
 * @property children - Modal content
 * @property open - Controlled open state
 * @property onOpenChange - Callback invoked when the open state changes
 * @property firstName - First name displayed in the dialog content
 * @property lastName - Last name displayed in the dialog content
 */
export type ModalProps = {
    trigger?: ReactNode;
    title?: ReactNode;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    firstName?: string;
    lastName?: string;
};
/**
 * Simple modal dialog built with Radix UI's Dialog primitives.
 */
declare function ModalPop({ trigger, title, children, open, onOpenChange, firstName, lastName, }: ModalProps): any;
export { ModalPop };
export default ModalPop;
