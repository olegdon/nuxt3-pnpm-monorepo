<script lang="ts" setup>
withDefaults(
  defineProps<{
    item?: string
  }>(),
  {
    item: '',
  },
)
const { asHtml } = useMarkdown()
</script>

<template>
  <div v-html="asHtml(item)" />
</template>
