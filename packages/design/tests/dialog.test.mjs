import assert from 'node:assert/strict'
import { test } from 'node:test'
import { effectScope } from 'vue'
import { useDialogModal } from '../composables/useDialogModal.ts'

class Dialog extends EventTarget {
  open = false
  showModal() { this.open = true }
  close() {
    if (!this.open)
      return
    this.open = false
    this.dispatchEvent(new Event('close'))
  }
}

test('reopening a dialog delivers one close callback and scope disposal removes listeners', () => {
  const original = globalThis.document
  const dialog = new Dialog()
  globalThis.document = { getElementById: () => dialog }
  const scope = effectScope()
  let closed = 0
  try {
    const modal = scope.run(() => useDialogModal('test', { onCloseHandler: () => closed++ }))
    for (let i = 0; i < 3; i++) {
      modal.showDialog()
      modal.closeDialog()
    }
    assert.equal(closed, 3)
    modal.showDialog()
    scope.stop()
    dialog.close()
    assert.equal(closed, 3)
  }
  finally {
    scope.stop()
    if (original === undefined)
      delete globalThis.document
    else
      globalThis.document = original
  }
})

test('dialog calls are safe without a browser document', () => {
  const scope = effectScope()
  try {
    const modal = scope.run(() => useDialogModal('absent'))
    assert.equal(modal.dialogElement, null)
    assert.doesNotThrow(() => modal.showDialog())
    assert.doesNotThrow(() => modal.closeDialog())
  }
  finally {
    scope.stop()
  }
})
