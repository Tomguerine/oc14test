# HRnet
Welcome to HRnet! This is our company's internal application to create and view employee records.

## Accessibility testing

- Keyboard navigation was exercised across pages to confirm a logical focus order.
- ARIA roles and labels were reviewed and adjusted where necessary.
- Color contrast of interactive elements meets or exceeds the 4.5:1 ratio.
- An attempt was made to run automated `axe` checks, but the CLI package could not be installed in this environment.

Dynamic content such as form errors, modal open/close actions and date changes now announce updates through `aria-live` regions.

