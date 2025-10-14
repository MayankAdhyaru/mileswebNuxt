<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const { slug } = route.params

const vpsMenu = [
  { slug: 'managed-vps-hosting', title: 'Managed VPS Hosting', desc: 'We manage your VPS for you' },
  { slug: 'windows-vps', title: 'Windows VPS', desc: 'Ideal for ASP.NET and Windows apps' },
  { slug: 'n8n', title: 'n8n VPS', desc: 'Scalable VPS for n8n users' }
]

const pageData = vpsMenu.find(p => p.slug === slug)
</script>

<template>
  <section class="p-10">
    <div v-if="pageData">
      <h1 class="text-3xl font-bold mb-4">{{ pageData.title }}</h1>
      <p>{{ pageData.desc }}</p>
    </div>
    <div v-else>
      <h1>Page Not Found</h1>
    </div>
  </section>
</template>
