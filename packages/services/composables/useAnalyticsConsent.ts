export function useAnalyticsConsent() {
  return useCookie<'granted' | 'denied' | null>('analytics-consent', {
    default: () => null,
    sameSite: 'lax',
    secure: !import.meta.dev,
    maxAge: 60 * 60 * 24 * 180,
    path: '/',
  })
}
