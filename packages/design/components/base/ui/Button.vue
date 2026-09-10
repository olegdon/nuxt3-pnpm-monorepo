<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    to?: any
    target?: string
    block?: boolean
    variant?: 'default' | 'ghost' | 'alternative' | 'tag' | 'green' | 'outline'
    size?: 'base' | 'sm'
    unstyled?: boolean
  }>(),
  {
    to: null,
    block: false,
    variant: 'default',
    size: 'base',
    unstyled: false,
  },
)

const component = computed(() => props.to ? resolveComponent('NuxtLinkLocale') : 'button')

const variantStyles = {
  default: 'bg-emerald-700 hover:bg-emerald-800 text-white rounded-md',
  green: 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-md',
  ghost: 'text-blue-500 hover:bg-blue-500/20 rounded-md',
  alternative: 'border border-emerald-500 text-emerald-600 rounded-md',
  tag: 'bg-blue-100 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white rounded-full px-4 py-2 text-center',
  outline: 'border border-stone-500 text-stone-600 dark:text-stone-300 hover:bg-blue-400/20 rounded-md',
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
  class="ui-button justify-center items-center space-x-2 rounded-md px-4"
  :class="[block ? 'flex w-full' : 'inline-flex', !unstyled && variantStyles[variant], sizeStyles[size]]"
  :target="target"
  >
  <slot />
</component>
</template>
