<script lang="ts" setup>
const { to, variant, size } = withDefaults(
  defineProps<{
    to?: any
    target?: string
    block?: boolean
    variant?: 'default' | 'ghost' | 'alternative' | 'tag' | 'green' | 'outline'
    size?: 'base' | 'sm'
  }>(),
  {
    to: null,
    block: false,
    variant: 'default',
    size: 'base',
  },
)

const component = (to) ? resolveComponent('NuxtLinkLocale') : 'button'

const variantStyles = {
  default: 'bg-blue-500 hover:bg-blue-600 text-white rounded-md',
  green: 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-md',
  ghost: 'text-blue-500 hover:bg-blue-500/20 rounded-md',
  alternative: 'border border-emerald-500 text-emerald-600 rounded-md',
  tag: 'bg-blue-100 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white rounded-full px-4 py-2 text-center',
  outline: 'border border-ci-gray-500 text-ci-gray-500 hover:bg-blue-400/20 rounded-md',
}
const sizeStyles = {
  base: 'h-10',
  sm: 'h-8 text-sm',
}
</script>

<template>
  <component
    :is="component"
    :to="to"
    class="justify-center items-center space-x-2 outline-none px-4"
    :class="[block ? 'flex w-full' : 'inline-flex', variantStyles[variant], sizeStyles[size]]"
    :target="target"
  >
    <slot />
  </component>
</template>
