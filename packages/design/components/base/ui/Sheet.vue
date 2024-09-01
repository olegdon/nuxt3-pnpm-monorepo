<script lang="ts" setup>
const { to } = withDefaults(
  defineProps<{
    to?: any
    interactive?: boolean
    padded?: boolean
    styles?: any
  }>(),
  {
    to: null,
    interactive: false,
    padded: false,
    styles: {
      padded: 'p-2 md:p-3',
      interactive: 'cursor-pointer transition-all hover:drop-shadow hover:-translate-y-1',
    },
  },
)

const component = to ? resolveComponent('NuxtLinkLocale') : 'div'
</script>

<template>
  <component
    :is="component"
    class="block"
    :class="[
      to || interactive ? styles.interactive : '',
      padded ? styles.padded : '',
    ]"
    :to="to"
  >
    <slot />
  </component>
</template>
