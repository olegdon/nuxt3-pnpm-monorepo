<script lang="ts" setup>
const identity = ref('')

function handleSubmit() {
  useEvent('user:login', identity.value)
}
</script>

<template>
  <form
    class="flex flex-col space-y-2"
    @submit.prevent="handleSubmit"
  >
    <BaseUiInput
      v-model="identity"
      placeholder="Identity"
    />

    <BaseUiButton>
      {{ $t('components.user.login') }}
    </BaseUiButton>
  </form>
</template>
