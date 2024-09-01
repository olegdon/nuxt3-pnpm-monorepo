import { loadScript } from './loadScript'

function gaTrackingLoad(id: string) {
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${id}`)
  window.dataLayer = window.dataLayer || []

  // there is something weird internally in GA where it needs arguments
  // eslint-disable-next-line prefer-rest-params,style/max-statements-per-line
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag?.('js', new Date())
  window.gtag?.('config', id, {
    anonymize_ip: true,
  })
}

function gaPageView() {
  window.gtag?.('event', 'page_view')
}

export { gaTrackingLoad, gaPageView }
