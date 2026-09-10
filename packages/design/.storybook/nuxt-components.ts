import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'

// Storybook uses a memory router, not Nuxt's application router.
export const NuxtLink = defineComponent({
  props: {
    to: { type: [String, Object] as PropType<RouteLocationRaw>, default: '/' },
    target: String,
    activeClass: String,
    exactActiveClass: String,
  },
  setup(props, { attrs, slots }) {
    return () => typeof props.to === 'string' && /^(?:https?:|mailto:|#)/.test(props.to)
      ? h('a', { ...attrs, href: props.to, target: props.target }, slots.default?.())
      : h(RouterLink, { ...attrs, ...props }, slots)
  },
})

// Static assets are served by Storybook; IPX is verified in the Nuxt apps.
export const NuxtImg = defineComponent({
  inheritAttrs: false,
  props: { src: String, alt: String, width: [String, Number], height: [String, Number], sizes: String, format: String },
  setup(props, { attrs }) {
    return () => h('img', { ...attrs, src: props.src, alt: props.alt, width: props.width, height: props.height })
  },
})

export const ClientOnly = defineComponent({ setup: (_, { slots }) => () => slots.default?.() })
