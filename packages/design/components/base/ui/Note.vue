<script lang="ts" setup>
/* component for for example, error messages */
withDefaults(
  defineProps<{
    type?: 'info' | 'warning' | 'error'
    customStyle?: string
  }>(),
  {
    type: 'warning',
  },
)
const variantStyles = {
  info: 'bg-ci-grey-100 border-blue-600',
  warning: 'bg-yellow-100 border-yellow-600',
  error: 'bg-red-100 border-red-500',
}
</script>

<template>
  <div
    class="border border-l-4 flex py-4 px-6 text-sm"
    :class="[customStyle || variantStyles[type]]"
  >
    <IconFalInfoCircle v-if="'info' === type" class="size-7 text-blue-600 mr-4" />
    <IconFalExclamationCircle
      v-else
      class="size-7 mr-4"
      :class="{
        'text-yellow-600': 'warning' === type,
        'text-red-500': 'error' === type,
      }"
    />
    <slot />
  </div>
</template>
