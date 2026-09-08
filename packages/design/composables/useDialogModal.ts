import { onScopeDispose } from 'vue'

interface DialogModalSettings {
  resetQueryOnClose?: boolean
  onCloseHandler?: () => void
}

export function useDialogModal(id: string, settings: DialogModalSettings = {}) {
  let controller: AbortController | undefined
  const element = () => typeof document === 'undefined' ? null : document.getElementById(id) as HTMLDialogElement | null
  function closeDialog() {
    element()?.close()
  }
  function showDialog() {
    const dialog = element()
    if (!dialog || dialog.open)
      return
    controller?.abort()
    controller = new AbortController()
    const options = { signal: controller.signal }
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)
          closeDialog()
      }
    }, options)
    dialog.addEventListener('close', () => {
      if (settings.resetQueryOnClose)
        window.history.replaceState(window.history.state, '', window.location.pathname)
      settings.onCloseHandler?.()
      controller?.abort()
    }, options)
    dialog.showModal()
  }
  onScopeDispose(() => controller?.abort())
  return {
    closeDialog,
    showDialog,
    dialogId: id,
    get dialogElement() {
      return element()
    },
  }
}
