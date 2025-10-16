<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
    <Header />

    <main class="flex-1 container mx-auto p-6">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/common/Header.vue'
import Footer from '~/components/Footer.vue'

// Load layout-specific CSS via head <link> so it only applies when this layout is used
useHead({
  link: [
    { rel: 'stylesheet', href: '/css/main.css' }
  ]
})
</script>
