<script setup>
import '~/assets/css/main.css'
import Hero from '~/components/Hero.vue'
import Newrating from '~/components/Newrating.vue'
import CaseStudy from '~/components/CaseStudy.vue'
import { ref, onMounted } from 'vue'

// ✅ SSR-fetch indexPage (rarely changes)
const { data: apiData } = await useAsyncData('hero', () => $fetch('/api/indexPage'))

// ✅ Live-fetch common every time component mounts (reflects dev changes)
const commonPayload = ref({})
onMounted(async () => {
  try {
    const res = await $fetch('/api/common')
    commonPayload.value = res?.common ?? res ?? {}
  } catch (e) {
    console.error('Failed to load common data', e)
  }
})

// Extract hero data
const heroPayload = apiData?.value?.hero || {}
const headPayload = apiData.value?.head || {}
const supportPayload = apiData.value?.support || {}
// SEO for this page
useHead({
  title: headPayload.title,
  meta: [
    { charset: "utf-8" },
    { name: "description", content: headPayload.description },
    { name: "alexaVerifyID", content: "bwEf6ZuaKbJBtiD3eIlduiGJKLY" },
    { property: "og:title", content:  headPayload.ogTitle },
    { property: "og:site_name", content: "MilesWeb" },
    { property: "og:url", content: "https://www.milesweb.in" },
    { property: "og:description",  content: headPayload.ogDescription },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://www.milesweb.in/assets/images/logo/milesweb-200x200.png" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" }
  ],
  link: [
    { rel: "alternate", href: "https://www.milesweb.com", hreflang: "x-default" },
    { rel: "shortcut icon", href: "https://www.milesweb.in/img-assets/favicon.ico" },
    ...(headPayload.link || [])
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
        <Newrating />
        <section class="pt-120 pb-45 px-md-6 mw_focus">
            <div class="mw-container mw_focus_box">
                <div class="mw-row mw-align-center">
                    <div class="mw-col-lg-6 pr-30 pb-lg-30">
                    <div class="mw_focus_content">
                        <div class="pb-30">
                            <h2 class="mw-h2">{{supportPayload.title}}</h2>
                            <p class="mw-p mw_sub_clr">{{supportPayload.description}}</p>
                        </div>
                        <div class="d-flex mw_focus_row1">
                            <span class="off-support-img"><img loading="lazy" :src="supportPayload.feature.image" :alt="supportPayload.feature.alt" :title="supportPayload.feature.alt" class="img-fluid"></span>
                            <div class="pl-22">
                                <div class="mw-h4 pb-6">{{supportPayload.feature.title}}</div>
                                <div class="mw_focus_h4_p mw-h3-p">{{supportPayload.feature.description}}</div>
                            </div>
                        </div>
                        <div class="d-flex pb-30">
                            <span class="off-support-img"><img loading="lazy" :src="supportPayload.feature2.image" :alt="supportPayload.feature2.alt" :title="supportPayload.feature2.alt" class="img-fluid"></span>
                            <div class="pl-22">
                                <div class="mw-h4 pb-6">{{supportPayload.feature2.title}}</div>
                                <div class="mw_focus_h4_p mw-h3-p">{{supportPayload.feature2.description}}</div>
                            </div>
                        </div>
                        <a :href="supportPayload.btn.link" class="mw-btn">{{supportPayload.btn.text}}</a>
                    </div>
                    </div>
                    <div class="mw-col-lg-6">
                        <div class="title-center ho-global-img mw_support_img pt-md-24"><img class="img-fluid" :src="supportPayload.image" loading="lazy" :alt="supportPayload.feature2.alt" :title="supportPayload.feature2.alt"></div>
                    </div>
                </div>
            </div>
        </section>
        <CaseStudy/>
    </div>
</template>
<style scoped>
.mw_focus{background:#f8f8ff;}.mw_focus_box{background:#fff;border-radius:24px;padding:50px 54px}.mw_focus_h4_p{max-width:349px;color:var(--sub_ttl_clr2);font-size:18px}.mw_focus_row1{border-bottom:1px solid #f5f5f5;padding-bottom:30px;margin-bottom:30px}.mw_focus_content{max-width:484px}.mw_smart_content_box{outline:4px solid #F5F5F5;border-radius:24px;padding:30px 32px 0;position:relative;z-index:0}.mw_smart_content_box{outline:4px solid #F5F5F5;border-radius:24px;padding:30px 32px 0;position:relative;z-index:0}.mw_smart_content_box:before{content:"";position:absolute;left:-5px;right:-6px;bottom:-5px;background:linear-gradient(0deg,#fff 13%,rgb(255 255 255 / 8%) 100%);height:231px;z-index:1}.mw_smart_content_zi1{z-index:1;position:relative}@media(max-width:1400px){.mw_smart_content{padding-left:20px}.mw_focus_row1{padding-bottom:16px;margin-bottom:16px}.mw_smart_content_box{padding:22px 18px 0}}@media(max-width:991px){.mw_smart_content{order:1}.mw_smart_order2{order:2}.mw_smart_content{padding-left:0}}@media(max-width:768px){.mw_focus_h4_p{font-size:14px}.mw_focus_row1{padding-bottom:20px;margin-bottom:20px}.mw_focus_box{padding:36px 30px}}@media(max-width:600px){.mw_focus{padding-top:56px;}.mw_smart_button{display:none;}.mw_support_img,.mw_smart_order2{display:none;}.mw_focus_box .pb-lg-30{padding-bottom:0 !important;}}@media(max-width:576px){.mw_focus_content .pl-22{padding:0}.off-support-img{display:none}}@media(min-width:600px){.mw_smart_button_none{display:none;}}
</style>