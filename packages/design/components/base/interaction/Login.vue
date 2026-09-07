<script lang="ts" setup>
const emit = defineEmits<{ 'sign-in': [identity: string] }>()
const identity = ref('')
</script>

<template>
  <form class="flex flex-col space-y-2" @submit.prevent="emit('sign-in', identity)">
    <label>
      Identity
      <BaseUiInput v-model="identity" placeholder="Identity" />
    </label>
    <BaseUiButton type="submit">{{ $t('components.user.login') }}</BaseUiButton>
  </form>
</template>
