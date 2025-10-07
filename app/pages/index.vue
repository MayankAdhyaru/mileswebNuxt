<script setup>
import Hero from '~/components/Hero.vue'
const { data: apiData, pending: heroPending, error: heroError } = await useAsyncData('hero', () => $fetch('/api/indexPage'))
const { data: commonData, pending: commonPending, error: commonError } = await useAsyncData('common', () => $fetch('/api/common'))

// Extract usable plain objects from the refs safely
const heroPayload = apiData?.value?.hero || null
// common API may return either { common: {...} } or the object itself; accept both shapes
const commonPayload = commonData?.value?.common ?? commonData?.value ?? {}
// SEO for this page
useHead({
  title: "India's Best Web Hosting Company | 76% OFF Web Hosting Services",
  meta: [
    { charset: "utf-8" },
    {
      name: "description",
      content: "Host smarter with India's best web hosting services. SSD NVMe storage, FREE AI website builder, Domain, SSL, migration & 24/7 support—all at affordable prices."
    },
    { name: "alexaVerifyID", content: "bwEf6ZuaKbJBtiD3eIlduiGJKLY" },

    { property: "og:title", content: "India's Best Web Hosting Company | 76% OFF Web Hosting Services" },
    { property: "og:site_name", content: "MilesWeb" },
    { property: "og:url", content: "https://www.milesweb.in" },
    { property: "og:description", content: "Host smarter with India's best web hosting services. SSD NVMe storage, FREE AI website builder, Domain, SSL, migration & 24/7 support—all at affordable prices." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://www.milesweb.in/assets/images/logo/milesweb-200x200.png" },

    { name: "viewport", content: "width=device-width, initial-scale=1.0" }
  ],
  link: [
    { rel: "canonical", href: "https://www.milesweb.in" },
    { rel: "alternate", href: "https://hi.milesweb.in", hreflang: "hi-IN" },
    { rel: "alternate", href: "https://www.milesweb.com", hreflang: "en-US" },
    { rel: "alternate", href: "https://www.milesweb.in", hreflang: "en-IN" },
    { rel: "alternate", href: "https://www.milesweb.co.uk", hreflang: "en-GB" },
    { rel: "alternate", href: "https://www.milesweb.ae/", hreflang: "en-AE" },
    { rel: "alternate", href: "https://www.milesweb.com", hreflang: "x-default" },
    { rel: "shortcut icon", href: "https://www.milesweb.in/img-assets/favicon.ico" }
  ]
})



const hero = {
  heading: heroPayload?.heading || `<h1>Web Hosting India</h1>`,
  headingH1: heroPayload?.headingH1 || `<h1>Web Hosting India</h1>`,
  subheading: heroPayload?.subheading || `<h2>Get fast and reliable hosting </h2> + Free domain`,
  features: heroPayload?.features || ["Free SSL and website migration", "Free mailboxes and AI website builder"],
  // Use hero payload if it defines currency; prefer common price as authoritative
  currency: commonPayload.currencySymbol || '₹',
  // prefer common price first, then hero payload, then default
  price: commonPayload.price?.web_2?.[1] || heroPayload?.price || '49',
  billingCycle: heroPayload?.billingCycle || "/mo",
  freeMonthsText: heroPayload?.freeMonthsText || "+3 months free",
  showPrice: typeof heroPayload?.showPrice !== 'undefined' ? heroPayload.showPrice : true,
  plansBtn: heroPayload?.plansBtn || 'Start now',
  // include guarantee etc. if present
  guarantee: heroPayload?.guarantee || {}
}
</script>

<template>
  <div>
    <Hero v-bind="hero" />
  </div>
</template>