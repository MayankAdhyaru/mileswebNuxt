<script setup>
import Hero from '~/components/common/Hero.vue'

// ✅ SSR-fetch indexPage (rarely changes)
const { data: apiData } = await useAsyncData('hero', () => $fetch('/api/hosting/webHosting'))
const hero = apiData?.value?.hero || {}
</script>

<template>
<Hero v-bind="hero" />
</template>
