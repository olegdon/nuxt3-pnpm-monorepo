<script lang="ts" setup>
const { variant } = withDefaults(
  defineProps<{
    variant?: 'default' | 'ghost' | 'alternative'
  }>(),
  {
    variant: 'default',
  },
)
const variantStyles: Record<string, string> = {
  default: 'bg-extendedapp-primary-600 text-white hover:bg-extendedapp-primary-800',
  ghost: 'border border-extended-gray-100 ',
}
</script>

<template>
  <BaseUiButton class="p-3 transition-colors" :class="variantStyles[variant]">
    <!-- @slot button content -->
    <slot />
  </BaseUiButton>
</template>
