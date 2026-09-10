<script lang="ts" setup>
withDefaults(defineProps<{ variant?: 'default' | 'ghost' | 'alternative' | 'tag' | 'green' | 'outline' }>(), { variant: 'default' })
const overrides = { default: 'ui-button-extended', ghost: 'ui-button-extended-ghost', alternative: 'ui-button-extended-alternative' }
</script>

<template>
  <BaseUiButton :variant="variant" :unstyled="variant in overrides" :class="overrides[variant as keyof typeof overrides]">
    <slot />
  </BaseUiButton>
</template>
