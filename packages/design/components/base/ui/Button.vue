<script lang="ts" setup>
const { variant, size } = withDefaults(
  defineProps<{
    variant?: 'default' | 'ghost' | 'alternative'
    size?: 'base' | 'sm'
  }>(),
  {
    variant: 'default',
    size: 'base',
  },
)
const variantStyles = {
  default: 'bg-green-700 text-gray-50 fill-gray-50 hover:bg-green-600 group-hover:bg-green-600',
  ghost: 'bg-green-50 text-green-700 fill-gray-50 hover:bg-green-200 group-hover:bg-green-200',
  alternative: 'bg-vin-accent-700 text-gray-50 fill-gray-50 hover:bg-vin-accent-600 group-hover:bg-vin-accent-600',
}

const sizeStyles = {
  base: 'px-3 h-9',
  sm: 'px-2 h-7 text-sm md:px-3 md:h-9 md:text-base',
}
</script>

<template>
  <BaseUiButton
    class="font-semibold transition-colors rounded space-x-1 outline-transparent"
    :class="[variantStyles[variant], sizeStyles[size]]"
  >
    <!-- @slot button content -->
    <slot />
  </BaseUiButton>
</template>
