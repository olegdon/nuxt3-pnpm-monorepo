/**
 * Dialog Modal Manager Module
 *
 * This module provides a set of functions to easily manage dialog modals within a web application. It includes
 * functionality for initializing event listeners on dialog elements and a custom hook to handle opening and closing
 * of modals, along with additional modal management features. The module ensures a user-friendly experience by
 * handling key events like 'Escape' to close modals and clicks outside the modal area. It also offers configurable
 * settings for advanced modal behaviors, such as resetting the browser's query string upon closing a modal.
 *
 * The primary functions in this module are:
 * - `initializeListeners`: Attaches key event listeners to a dialog element for intuitive close actions.
 * - `useDialogModal`: A custom hook that provides methods and properties for managing a specific dialog modal's lifecycle.
 */

// Define an interface for the settings parameter
interface DialogModalSettings {
  resetQueryOnClose: boolean
  onCloseHandler?: any
}

// Define an interface for the object returned by useDialogModal
interface DialogModalControl {
  closeDialog: () => void
  showDialog: () => void
  dialogId: string
  dialogElement: HTMLDialogElement | null
}

/**
 * Initializes event listeners for a given HTMLDialogElement to handle close events.
 *
 * @param {HTMLDialogElement} element - The dialog element to which listeners will be attached.
 * @param {Function} onClose - Callback function to be executed when the dialog is closed.
 *
 * This function adds two event listeners to the provided dialog element:
 * 1. A 'keydown' event listener that triggers the onClose callback when the Escape key is pressed.
 * 2. A 'click' event listener that triggers the onClose callback when a click occurs outside the modal content.
 *
 * The function immediately returns if no element is provided or if the document is undefined.
 */
function initializeListeners(element: HTMLDialogElement, onClose: any) {
  if (!element || typeof document === 'undefined')
    return

  element.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape')
      onClose(element)
  })
  function outsideDialogClickHandler(event: MouseEvent): void {
    if (element === (event.target as Node))
      onClose(element)
  }
  element.addEventListener('click', outsideDialogClickHandler)
}

/**
 * Custom hook for managing dialog modals in a web application.
 * The `useDialogModal` function provides an interface for managing modals by:
 * - Creating a closure with the modal's ID and settings.
 * - Providing `showModal` and `closeModal` methods to open and close the modal.
 * - Handling the onClose event which includes optional resetting of the browser's query string on modal close.
 * - Exposing the modal ID and a getter for the modal element.
 *
 * @param id - The ID of the HTMLDialogElement to be managed.
 * @param settings - Configuration settings for the modal behavior. Default: { resetQueryOnClose: false }
 * @returns An object containing methods for opening and closing the modal, and properties for modal identification and retrieval.
 */
export function useDialogModal(id: string, settings: DialogModalSettings = { resetQueryOnClose: false, onCloseHandler: null }): DialogModalControl {
  function onClose(element: HTMLDialogElement) {
    if (settings.resetQueryOnClose)
      window?.history?.pushState({}, document?.title, location?.pathname)

    settings?.onCloseHandler?.()
    element?.close()
  }

  return {
    closeDialog: () => onClose(document.getElementById(id) as HTMLDialogElement),
    showDialog: () => {
      const element = document.getElementById(id) as HTMLDialogElement

      if (element) {
        element?.showModal()
        initializeListeners(element, onClose)
      }
    },
    dialogId: id,
    get dialogElement() {
      return document.getElementById(id) as HTMLDialogElement
    },
  }
}
