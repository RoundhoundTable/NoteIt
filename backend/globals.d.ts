// It would not be a problem in a normal browser context, but web workers do not have these items, and this project needs auth in workers.
interface HTMLElement {}
interface Window {}
