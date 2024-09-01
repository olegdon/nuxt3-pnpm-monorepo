interface CookieSettings {
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

export function useSimpleCookie(name: string, defaultValue: Record<string, any>, settings: CookieSettings = {}) {
  if (!document)
    return { value: null }

  const encode = (val: string) => encodeURIComponent(val)

  const defaultSettings = {
    'SameSite': 'Strict',
    'Max-Age': 34473600, // 399 days - chrome maximum is 400 - https://developer.chrome.com/blog/cookie-max-age-expires/
    'Path': '/',
    ...settings, // This will override the defaults with user provided values if any.
  }

  function stringifySettings(settings: any) {
    return Object.entries(settings)
      .map(([key, value]) => `${key}=${String(value)}`)
      .join('; ')
  }

  function getCookie(key: string) {
    const match = document.cookie.match(`(^|;)\\s*${encode(key)}\\s*=\\s*([^;]+)`)
    return match ? JSON.parse(decodeURIComponent(match[2])) : null
  }

  function setCookie(key: string, value: any) {
    document.cookie = `${encode(key)}=${encode(JSON.stringify(value))}; ${stringifySettings(defaultSettings)}`
  }

  const storedValue = getCookie(name) || defaultValue
  setCookie(name, storedValue) // Cookie is created immediately

  let reactiveCookie: Record<string, any>

  // Assume you're working in a module where Vue's reactive might be imported
  // Check if 'reactive' is a function (i.e., it's defined and imported)
  // @ts-expect-error: reactive not found
  if (typeof reactive === 'function')
    // @ts-expect-error: reactive not found
    reactiveCookie = reactive({})
  else
    reactiveCookie = {}

  for (const key in defaultValue) {
    Object.defineProperty(reactiveCookie, key, {
      enumerable: true,
      get() {
        const cookie = getCookie(name) || defaultValue
        return cookie[key]
      },
      set(value: any) {
        storedValue[key] = value
        setCookie(name, storedValue)
      },
    })
  }

  return reactiveCookie
}
