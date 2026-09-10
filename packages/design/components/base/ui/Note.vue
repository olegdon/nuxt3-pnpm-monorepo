<script lang="ts" setup>
withDefaults(defineProps<{
  type?: 'info' | 'warning' | 'error'
  customStyle?: string
}>(), { type: 'warning' })
const variantStyles = {
  info: 'border-blue-600 bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-100',
  warning: 'border-amber-600 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-100',
  error: 'border-red-600 bg-red-50 text-red-950 dark:bg-red-950 dark:text-red-100',
}
</script>

<template>
  <div class="border border-l-4 rounded-md flex items-start gap-3 py-4 px-5 text-sm" :class="customStyle || variantStyles[type]">
    <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path v-if="type === 'info'" d="M12 11v6m0-10v1" />
      <path v-else d="M12 7v6m0 3v1" />
    </svg>
    <div><slot /></div>
  </div>
</template>
