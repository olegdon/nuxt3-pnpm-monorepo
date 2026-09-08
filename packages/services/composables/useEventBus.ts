import mitt from 'mitt'

// Create one bus per consumer/app; never share an emitter across SSR requests.
export function createAppEventBus() {
  return mitt<{ 'user:login': string }>()
}
