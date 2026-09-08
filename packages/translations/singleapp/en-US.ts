export default {
  general: { title: 'This is a single app instance' },
  feature: {
    title: 'A shared welcome',
    description: 'Try the same experience here and in the main application.',
    imageAlt: 'NuxtMonoStarter — build together',
    name: 'Your name',
    action: 'Say hello',
    visitor: 'visitor',
  },
  pages: {
    feature: {
      meta: {
        title: 'A shared welcome — NuxtMonoStarter',
        description: 'A reusable welcome experience, available on its own and inside NuxtMonoStarter.',
      },
    },
    single: {
      meta: {
        title: 'Single App — NuxtMonoStarter',
        description: 'Explore a standalone Nuxt application with shared components, translations and design.',
      },
    },
    extended: {
      meta: {
        title: 'Extended App — NuxtMonoStarter',
        description: 'Explore the NuxtMonoStarter web application with its own design and shared features.',
      },
    },
  },
}
