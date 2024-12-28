<script setup lang="ts">
const props = defineProps({
  error: Object,
})
const { t: $t } = useI18n()
const { public: config } = useRuntimeConfig()

onServerPrefetch(() => {
  useHead({
    link: [{
      rel: 'icon',
      type: 'image/png',
      href: config.app.layout.icon,
    }],
  })
})

if (props.error?.statusCode === 404 && props.error.url) {

}

const message = $t(`error.message.${props.error?.statusCode}`)
const isDev = ref(!import.meta.env.PROD)

definePageSeo({
  key: props.error?.statusCode,
  title: message,
  description: message,
  robots: 'noindex, follow',
})
</script>

<template>
  <NuxtLayout :name="error?.statusCode === 404 ? 'default' : 'splash'">
    <div class="max-w-[400px] mx-auto py-20">
      <div
        class="h-full  mx-auto flex justify-center items-center grow"
        :class="error?.statusCode >= 500 ? 'w-full' : 'max-w-[350px]'"
      >
        <div class="flex justify-center flex-col space-y-9">
          <span class="text-9xl text-gray-800 dark:text-white font-semibold text-center">
            {{ error?.statusCode }}
          </span>

          <span class="block text-center dark:text-white">
            {{ message }}
          </span>

          <template v-if="error?.statusCode === 404">
            <UiButton :to="{ name: 'index' }">
              {{ $t ? $t('error.back') : 'back' }}
            </UiButton>
          </template>

          <template v-else>
            <UiButton href="/">
              Home
            </UiButton>
          </template>

          <template v-if="isDev">
            <span class="dark:text-white">
              <code>
                {{ error }}
              </code>

              <code v-html="error?.stack" />
            </span>
          </template>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
