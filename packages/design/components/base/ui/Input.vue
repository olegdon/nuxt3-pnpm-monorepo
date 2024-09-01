<script lang="ts" setup>
const { placeholder } = withDefaults(
  defineProps<{
    placeholder?: string
    hasResetOption?: boolean
  }>(),
  {
    hasResetOption: false,
  },
)
const element = ref<HTMLElement | null>(null)

const { modelValue } = defineModels<{
  modelValue?: string
}>()

function clearInput() {
  modelValue.value = ''

  element.value?.focus()
}
</script>

<template>
  <div class="relative">
    <input
      ref="element"
      v-model="modelValue"
      class="block w-full rounded h-9 px-3 border border-stone-300 bg-white outline-none focus:border-green-700"
      :placeholder="placeholder"
    >
    <template v-if="hasResetOption && modelValue">
      <span @click="clearInput">X</span>
    </template>
  </div>
</template>
