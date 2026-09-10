<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const inputId = useId()
const name = ref('')
const greeting = ref('')
function greet() {
  greeting.value = t('general.greeting', { user: name.value.trim() || t('feature.visitor') })
}
</script>

<template>
  <UiSheet class="feature-card" data-testid="shared-feature">
    <div class="feature-heading">
      <NuxtImg src="/social-card.png" :alt="t('feature.imageAlt')" width="88" height="64" sizes="88px" format="webp" />
      <div>
        <h2>{{ t('feature.title') }}</h2>
        <p>{{ t('feature.description') }}</p>
      </div>
    </div>
    <form class="feature-form" @submit.prevent="greet">
      <div>
        <label :for="inputId">{{ t('feature.name') }}</label>
        <UiInput :id="inputId" v-model="name" autocomplete="given-name" maxlength="80" />
      </div>
      <UiButton type="submit">{{ t('feature.action') }}</UiButton>
    </form>
    <p class="feature-status" role="status" aria-live="polite">{{ greeting }}</p>
  </UiSheet>
</template>
