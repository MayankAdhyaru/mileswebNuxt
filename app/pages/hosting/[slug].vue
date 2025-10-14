<script setup>
definePageMeta({
  layout: 'default'
})
import { useRoute } from 'vue-router'
import HostingWeb from '~/components/pages/hosting/WebHosting.vue'
import HostingCpanel from '~/components/pages/hosting/CpanelHosting.vue'

const route = useRoute()
const { slug } = route.params
console.log('Using layout:', route.meta.layout)
// Map slugs to components
const pageMap = {
  'web-hosting': HostingWeb,
  'cpanel-hosting': HostingCpanel
}

// Pick correct component
const PageComponent = pageMap[slug]
</script>

<template>
  <div>
    <component :is="PageComponent" v-if="PageComponent" />
    <div v-else class="p-10 text-center">
      <h1 class="text-3xl font-bold">Page Not Found</h1>
      <p>The hosting page "{{ slug }}" doesn’t exist.</p>
    </div>
  </div>
</template>
