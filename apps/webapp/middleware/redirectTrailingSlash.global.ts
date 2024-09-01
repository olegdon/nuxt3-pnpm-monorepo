// @see https://github.com/nuxt/nuxt/issues/15462
export default defineNuxtRouteMiddleware((to: any) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    const { path, query, hash } = to
    const nextPath = path.replace(/\/+$/, '') || '/'
    const nextRoute = { path: nextPath, query, hash }
    return navigateTo(nextRoute, { redirectCode: 301 })
  }
})
