import { useListen } from '../composables/useEventBus'

const callbacks: { [category: string]: Array<() => void> } = { onPageView: [] }

function onTrackingLoad(callback: any) {
  requestIdleCallback(callback)
}

function onClick(callback: any) {
  useListen('event:name', () => {
    callback()
  })
}

function onPageView(callback: any) {
  callbacks.onPageView.push(callback)
}

function useTrackingClient(router: any = null) {
  if (router?.afterEach) {
    router.afterEach((to: any, from: any) => {
      callbacks.onPageView.forEach((callback: any) => requestIdleCallback(() => callback(location.origin + from.fullPath)))
    })
  }

  return { onTrackingLoad, onPageView, onClick }
}

export { useTrackingClient }
