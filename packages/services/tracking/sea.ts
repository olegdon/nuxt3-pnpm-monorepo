import { loadScript } from './loadScript'

function seaTrackingLoad(id: string) {
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${id}`)

  window.gtag = (...args: any[]) => {
    window.dataLayer.push(args)
  }

  window.dataLayer = window.dataLayer || []

  window.gtag?.('js', new Date())
  window.gtag?.('config', id)
}

function seaTransaction({ id, event, currency }: any) {
  window.gtag?.('event', 'conversion', {
    send_to: `${id}/${event}`,
    value: 1.0,
    currency,
    transaction_id: '',
  })
}

export { seaTrackingLoad, seaTransaction }
