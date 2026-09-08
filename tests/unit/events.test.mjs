import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createAppEventBus } from '../../packages/services/composables/useEventBus.ts'

test('consumer event buses cannot deliver identities to another app', () => {
  const first = createAppEventBus()
  const second = createAppEventBus()
  const received = []
  second.on('user:login', identity => received.push(identity))
  first.emit('user:login', 'first')
  assert.deepEqual(received, [])
  second.emit('user:login', 'second')
  assert.deepEqual(received, ['second'])
})
