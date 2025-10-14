<script setup>
import '~/assets/css/main.css'
import Hero from '~/components/Hero.vue'
import Newrating from '~/components/Newrating.vue'
import CaseStudy from '~/components/CaseStudy.vue'
import Migration from '~/components/Migration.vue'
import CustomerReviews from '~/components/CustomerReviews.vue'
import FaqSection from '~/components/FaqSection.vue'
import ProductAndServices from '~/components/ProductAndServices.vue'
import closingSection from '~/components/closingSection.vue'
import Plans from '~/components/Plans.vue'
import { webUnlimitedPlan } from '~/composables/webUnlimitedPlan'
const { plans } = await webUnlimitedPlan()

// one global toggle for all plans

import { ref, onMounted, onBeforeUnmount } from 'vue'
const isTab = ref(false)
function checkWidth() {
  if (typeof window !== 'undefined') {
    isTab.value = window.innerWidth <= 992
  }
}

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
const headPayload = apiData.value?.head || {}
const hero = apiData?.value?.hero || {}
const planHeadingPayload = apiData?.value?.planHeading || {}
const support = apiData.value?.support || {}
const mpanel = apiData.value?.mpanel || {}
const migration = apiData.value?.migration || {}
const whyChoose = apiData.value?.whyChoose || {}
const productAndServices = apiData.value?.productAndServices || {}
const PowerHouse = apiData.value?.PowerHouse || {}
const faqs = apiData.value?.faqs || {}
const closing = apiData.value?.closing || {}

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


const planHeading = {
    title:planHeadingPayload?.title || 'Choose your web hosting plan',
    description:planHeadingPayload?.description || 'All plans include a 30-day risk-free trial.',
}

const waveItems = ref([
    'Speeds Up Websites.',
    'Assists You Anytime.',
    'Runs on Trusted Infrastructure.',
    'Makes Hosting Affordable.',
    'Delivers Fast Hosting.',
    'Puts Customers First.',
    'Secures Your Site.',
    'Protects Your Data.',
    'Scales With You.'
])
const waveRef = ref(null)
const activeWaveIndex = ref(4) // keep nth-child(5) active by default
let waveInterval = null
const waveTimeouts = []
const WAVE_ANIMATE_DELAY = 900
const WAVE_INTERVAL = 2600
const WAVE_EASE = 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)'

function rotateWave() {
    const el = waveRef.value
    if (!el) return
    const firstItem = el.querySelector('.mw_wave_dynamic_item')
    if (!firstItem) return

    const height = firstItem.offsetHeight || firstItem.clientHeight || 0
    // hide active state during animation
    activeWaveIndex.value = -1

    // animate the container up by one item's height
    el.style.transition = WAVE_EASE
    el.style.transform = `translateY(-${height}px)`

    // after the animation delay, rotate the array and reset transform without animation
    const t = setTimeout(() => {
        el.style.transition = 'none'
        // rotate: move first element to the end
        const first = waveItems.value.shift()
        if (typeof first !== 'undefined') waveItems.value.push(first)
        // reset transform
        el.style.transform = 'translateY(0)'
        // restore the active index to the 5th child
        activeWaveIndex.value = 4
        // small delay before restoring transition so the reset is instant
        const t2 = setTimeout(() => {
            el.style.transition = WAVE_EASE
        }, 50)
        waveTimeouts.push(t2)
    }, WAVE_ANIMATE_DELAY)

    waveTimeouts.push(t)
}

onMounted(() => {
    window.addEventListener('resize', checkWidth) 
    // start rotation interval
    waveInterval = setInterval(rotateWave, WAVE_INTERVAL)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkWidth)
    if (waveInterval) clearInterval(waveInterval)
    waveTimeouts.forEach(id => clearTimeout(id))
})

</script>

<template>
    <div>
        <Hero v-bind="hero" />
        <Newrating />
        <Plans :plans="plans" :planHeading="planHeading" :index="1"/>
    
        <!-- Support Section  -->
        <section class="pt-120 pb-45 px-md-6 mw_focus">
            <div class="mw-container mw_focus_box">
                <div class="mw-row mw-align-center">
                    <div class="mw-col-lg-6 pr-30 pb-lg-30">
                    <div class="mw_focus_content">
                        <div class="pb-30">
                            <h2 class="mw-h2" v-html="support.title"></h2>
                            <p class="mw-p mw_sub_clr" v-html="support.description"></p>
                        </div>
                        <div class="d-flex mw_focus_row1">
                            <span class="off-support-img"><img loading="lazy" :src="support.feature.image" :alt="support.feature.alt" :title="support.feature.alt" class="img-fluid"></span>
                            <div class="pl-22">
                                <div class="mw-h4 pb-6" v-html="support.feature.title"></div>
                                <div class="mw_focus_h4_p mw-h3-p" v-html="support.feature.description"></div>
                            </div>
                        </div>
                        <div class="d-flex pb-30">
                            <span class="off-support-img"><img loading="lazy" :src="support.feature2.image" :alt="support.feature2.alt" :title="support.feature2.alt" class="img-fluid"></span>
                            <div class="pl-22">
                                <div class="mw-h4 pb-6" v-html="support.feature2.title"></div>
                                <div class="mw_focus_h4_p mw-h3-p" v-html="support.feature2.description"></div>
                            </div>
                        </div>
                        <a :href="support.btn.link" class="mw-btn" v-html="support.btn.text"></a>
                    </div>
                    </div>
                    <div class="mw-col-lg-6">
                        <div class="title-center ho-global-img mw_support_img pt-md-24"><img class="img-fluid" :src="support.image" loading="lazy" :alt="support.feature2.alt" :title="support.feature2.alt"></div>
                    </div>
                </div>
            </div>
        </section>
        <!-- CaseStudy Section  -->
        <CaseStudy/>
        <!-- Mpanel Section  -->
        <section class="pb-45 mw_account_mb_none">
            <div class="mw_account pt-90 pb-90">
                <div class="mw-container">
                    <div class="title-center pb-45 mx-950">
                        <h2 class="mw-h2 fff" v-html="mpanel.title"></h2>
                        <p class="mw-p fff" v-html="mpanel.description"></p>
                    </div>
                    <div class="title-center pb-45 mw_account_img">
                        <img loading="lazy" :src="mpanel.image" class="img-fluid" :alt="mpanel.alt" :title="mpanel.alt">
                    </div>
                    <div class="mw-row mw_account_row">
                        <div class="mw-col-lg-3 mw-col-sm-6 mw_account_col">
                            <div>
                                <div class="pb-16"><img loading="lazy" :src="mpanel.feature.image" class="img-fluid" :alt="mpanel.feature.alt" :title="mpanel.feature.alt" width="31" height="33"></div>
                                <div class="mw-h4 fff" v-html="mpanel.feature.title"></div>
                                <p class="mw_account_h4_p" v-html="mpanel.feature.description"></p>
                            </div>
                        </div>
                        <div class="mw-col-lg-3 mw-col-sm-6 mw_account_col">
                            <div>
                                <div class="pb-16"><img loading="lazy" :src="mpanel.feature2.image" class="img-fluid" :alt="mpanel.feature2.alt" :title="mpanel.feature2.alt" width="31" height="33"></div>
                                <div class="mw-h4 fff" v-html="mpanel.feature2.title"></div>
                                <p class="mw_account_h4_p" v-html="mpanel.feature2.description"></p>
                            </div>
                        </div>
                        <div class="mw-col-lg-3 mw-col-sm-6 mw_account_col">
                            <div>
                                <div class="pb-16"><img loading="lazy" :src="mpanel.feature3.image" class="img-fluid" :alt="mpanel.feature3.alt" :title="mpanel.feature3.alt" width="31" height="33"></div>
                                <div class="mw-h4 fff" v-html="mpanel.feature3.title"></div>
                                <p class="mw_account_h4_p" v-html="mpanel.feature3.description"></p>
                            </div>
                        </div>
                        <div class="mw-col-lg-3 mw-col-sm-6 mw_account_col">
                            <div>
                                <div class="pb-16"><img loading="lazy" :src="mpanel.feature4.image" class="img-fluid" :alt="mpanel.feature4.alt" :title="mpanel.feature4.alt" width="31" height="33"></div>
                                <div class="mw-h4 fff" v-html="mpanel.feature4.title"></div>
                                <p class="mw_account_h4_p" v-html="mpanel.feature4.description"></p>
                            </div>
                        </div>
                    </div>
                    <div class="title-center mw_account_btn_border">
                        <span class="mw-btn jump-to-plans" v-html="mpanel.btn.text"></span>
                    </div>
                </div>
            </div>
        </section>
        <!-- Hosting Comparison Table -->
        <ComparisonTbl/>
        <!-- Migration Section  -->
        <Migration v-bind="migration"/>
        <!-- Whychoose Us Section  -->
        <section class="sections-space mw_unstoppable px-md-6">
            <div class="mw-container">
                <div class="mw-row mw-align-center">
                <div class="mw-col-lg-6 mw_smart_order2">
                    <div class="title-center ho-global-img pt-md-24">
                        <img class="img-fluid" :src="whyChoose.image" :alt="whyChoose.alt" :title="whyChoose.alt" loading="lazy">
                    </div>
                </div>
                <div class="mw-col-lg-6 pl-30 pb-lg-30 mw_smart_content">
                    <div class="pl-10">
                        <div class="pb-30">
                            <h2 class="mw-h2" v-html="whyChoose.title"></h2>
                            <p class="mw-p pb-30" v-html="whyChoose.description"></p>
                            <span class="mw-btn jump-to-plans mw_smart_button" v-html="whyChoose.btn.text"></span>
                        </div>
                        <div class="mw_smart_content_box">
                            <div class="mw_smart_content_zi1">
                            <div class="d-flex mw-align-center" v-for="(feature, index) in whyChoose.features" :class="index < whyChoose.features.length - 1 ? 'mw_focus_row1' : ''" :key="index">
                                <span class="off-support-img">
                                    <img :src="feature.icons.path" :alt="feature.icons.alt" :title="feature.icons.alt" class="img-fluid" loading="lazy">
                                </span>
                                <div class="pl-22">
                                <div class="mw-h4 pb-6" v-html="feature.title"></div>
                                <div class="mw_focus_h4_p mw-h3-p" v-html="feature.description"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="title-center mw_smart_button_none pt-22">
                            <span class="mw-btn jump-to-plans">{{ whyChoose.btn.text }}</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <ProductAndServices v-bind="productAndServices"/>
        <!-- Stisfaction Section  -->
        <div v-if="!isTab" class="sections-space">
            <div class="mw_wave_box1">
                <div class="mw-container">
                    <div class="d-flex mw-align-center mw-justify-center">
                        <div class="mw_wave_h2">MilesWeb</div>
                        <div class="mw_wave_rolodex_container">
                            <ul class="mw_wave_dynamic_text" ref="waveRef">
                                <li v-for="(item, idx) in waveItems" :key="idx" class="mw_wave_dynamic_item" :class="{ active: idx === activeWaveIndex }">{{ item }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mw_wave_box2">
                <div class="mw-container">
                    <div class="mw-row">
                        <div class="mw-col-sm-3">
                            <div class="title-center mw_wave_box2_col">
                                <div class="pb-30">
                                    <img loading="lazy" src="/assets/images/mw/happy-customers.png" class="img-fluid" alt="Happy customers | MilesWeb India" title="Happy customers | MilesWeb India">
                                </div>
                                <div class="mw_wave_box2_h3 mw-h3-lg pb-6">{{commonPayload.customerCount}}</div>
                                <p class="mw-h3-p">Happy customers</p>
                            </div>
                        </div>
                        <div class="mw-col-sm-3">
                            <div class="title-center mw_wave_box2_col">
                                <div class="pb-30">
                                    <img loading="lazy" src="/assets/images/mw/satisfaction.svg" class="img-fluid" alt="Satisfaction Rate | MilesWeb India" title="Satisfaction Rate | MilesWeb India">
                                </div>
                                <div class="mw_wave_box2_h3 mw-h3-lg pb-6">96%</div>
                                <p class="mw-h3-p">Satisfaction rate</p>
                            </div>
                        </div>
                        <div class="mw-col-sm-3">
                            <div class="title-center mw_wave_box2_col">
                                <div class="pb-30">
                                    <img loading="lazy" src="/assets/images/mw/experience.svg" class="img-fluid" alt="Years Of Experience | MilesWeb India" title="Years Of Experience | MilesWeb India">
                                </div>
                                <div class="mw_wave_box2_h3 mw-h3-lg pb-6">13+ Years</div>
                                <p class="mw-h3-p">of experience</p>
                            </div>
                        </div>
                        <div class="mw-col-sm-3">
                            <div class="title-center mw_wave_box2_col">
                                <div class="pb-30">
                                    <img loading="lazy" src="/assets/images/mw/expert-support.svg" class="img-fluid" alt="Expert support | MilesWeb India" title="Expert support | MilesWeb India">
                                </div>
                                <div class="mw_wave_box2_h3 mw-h3-lg pb-6">24/7</div>
                                <p class="mw-h3-p">Expert support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Milesweb PowerHouse Section -->
        <section class="pt-45 pb-45 px-md-6">
            <div class="mw-container">
                <div class="title-center pb-45">
                    <h2 class="mw-h2" v-html="PowerHouse.title"></h2>
                    <p class="mw-p" v-html="PowerHouse.description"></p>
                </div>
                <div class="mw-row">
                    <!-- Feature 1: High-speed hosting -->
                    <div class="mw-col-lg-4 mw-col-md-6 pb-30 d-flex mw_game_col_ord pt-lg-30 mw_mobile_none" v-if="PowerHouse.features?.[0]">
                        <div class="mw_powerhouse_box">
                        <div>
                            <div class="pb-10">
                            <img class="img-fluid" :src="PowerHouse.features[0].image.path" loading="lazy" :alt="PowerHouse.features[0].image.alt" :title="PowerHouse.features[0].image.alt"/>
                            </div>
                            <div class="mw_powerhouse_h3 fff" v-html="PowerHouse.features[0].title"></div>
                            <div class="mw-p fff" v-html="PowerHouse.features[0].description"></div>
                        </div>
                        <div v-if="PowerHouse.features[0].btn.text">
                            <a :href="PowerHouse.features[0].btn.link" class="mw-btn mw-btn-white jump-to-plans" v-html="PowerHouse.features[0].btn.text" ></a>
                        </div>
                        </div>
                    </div>

                    <!-- Feature 2: Top website performance metrics -->
                    <div class="mw-col-lg-8 pb-30 d-flex" v-if="PowerHouse.features?.[1]">
                        <div class="mw_powerhouse_box2">
                        <div class="mw-row m0">
                            <div class="mw-col-md-6 p-0">
                            <div class="pb-10">
                                <img class="img-fluid" :src="PowerHouse.features[1].image.path" loading="lazy" :alt="PowerHouse.features[1].image.alt" :title="PowerHouse.features[1].image.alt" />
                            </div>
                            <div class="mw_powerhouse_h3" v-html="PowerHouse.features[1].title"></div>
                            <div class="mw-p mw_sub_clr pb-22" v-html="PowerHouse.features[1].description"></div>
                            <ul class="mw_powerhouse_list">
                                <li v-for="(li, index) in PowerHouse.features[1].list" :key="index" v-html="li"></li>
                            </ul>
                            </div>
                            <div class="mw-col-md-6 p-0">
                            <div class="mw_powerhouse_box2_img title-right">
                                <img class="img-fluid" :src="PowerHouse.features[1].image.path2" loading="lazy" :alt="PowerHouse.features[1].image.alt" :title="PowerHouse.features[1].image.alt" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <!-- Feature 3: Hosting that drives business growth -->
                    <div class="mw-col-lg-8 d-flex" v-if="PowerHouse.features?.[2]">
                        <div class="mw_powerhouse_box2">
                        <div class="mw-row m0">
                            <div class="mw-col-md-6 p-0">
                            <div class="pb-10">
                                <img class="img-fluid" :src="PowerHouse.features[2].image.path" loading="lazy" :alt="PowerHouse.features[2].image.alt" :title="PowerHouse.features[2].image.alt" />
                            </div>
                            <div class="mw_powerhouse_h3" v-html="PowerHouse.features[2].title"></div>
                            <div class="mw-p mw_sub_clr pb-22" v-html="PowerHouse.features[2].description"></div>
                            <ul class="mw_powerhouse_list">
                                <li v-for="(li, index) in PowerHouse.features[2].list" :key="index" v-html="li"></li>
                            </ul>
                            </div>
                            <div class="mw-col-md-6 p-0">
                            <div class="mw_powerhouse_box2_img title-right">
                                <img class="img-fluid" :src="PowerHouse.features[2].image.path2" loading="lazy" :alt="PowerHouse.features[2].image.alt" :title="PowerHouse.features[2].image.alt" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <!-- Feature 4: Game-Changer for Speed -->
                    <div
                        class="mw-col-lg-4 d-flex mw-col-md-6 pt-lg-30 mw_mobile_none" v-if="PowerHouse.features?.[3]" >
                        <div class="mw_game_box">
                            <div>
                                <div class="pb-10">
                                    <img class="img-fluid" src="/assets/images/mw/star.svg" loading="lazy" alt="Game-Changer for Speed! | MilesWeb India" title="Game-Changer for Speed! | MilesWeb India" />
                                </div>
                                <div class="mw_powerhouse_h3 fff" v-html="PowerHouse.features[3].title"></div>
                                <div class="mw-p" v-html="PowerHouse.features[3].description"></div>
                            </div>

                            <div class="mw_game_box2">
                                <p class="fff mw-h3-p pb-22" v-html="PowerHouse.features[3].list[0]"></p>
                                <div class="d-flex pb-30 mw-align-center">
                                <span>
                                    <img class="img-fluid" :src="PowerHouse.features[3].image.path" loading="lazy" :alt="PowerHouse.features[3].image.alt" :title="PowerHouse.features[3].image.alt" width="35" height="35" />
                                </span>
                                <div class="pl-16">
                                    <div class="mw_game_box2_h5 fff" v-html="PowerHouse.features[3].list[1]"></div>
                                    <span class="mw_game_box2_p" v-html="PowerHouse.features[3].list[2]"></span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Customer Reviews Section  -->
        <CustomerReviews/>
        <FaqSection v-bind="faqs"/>
        <closingSection v-bind="closing"/>
    </div>
</template>
<style scoped>
.mw_focus{background:#f8f8ff;}.mw_focus_box{background:#fff;border-radius:24px;padding:50px 54px}.mw_focus_h4_p{max-width:349px;color:var(--sub_ttl_clr2);font-size:18px}.mw_focus_row1{border-bottom:1px solid #f5f5f5;padding-bottom:30px;margin-bottom:30px}.mw_focus_content{max-width:484px}.mw_smart_content_box{outline:4px solid #F5F5F5;border-radius:24px;padding:30px 32px 0;position:relative;z-index:0}.mw_smart_content_box{outline:4px solid #F5F5F5;border-radius:24px;padding:30px 32px 0;position:relative;z-index:0}.mw_smart_content_box:before{content:"";position:absolute;left:-5px;right:-6px;bottom:-5px;background:linear-gradient(0deg,#fff 13%,rgb(255 255 255 / 8%) 100%);height:231px;z-index:1}.mw_smart_content_zi1{z-index:1;position:relative}@media(max-width:1400px){.mw_smart_content{padding-left:20px}.mw_focus_row1{padding-bottom:16px;margin-bottom:16px}.mw_smart_content_box{padding:22px 18px 0}}@media(max-width:991px){.mw_smart_content{order:1}.mw_smart_order2{order:2}.mw_smart_content{padding-left:0}}@media(max-width:768px){.mw_focus_h4_p{font-size:14px}.mw_focus_row1{padding-bottom:20px;margin-bottom:20px}.mw_focus_box{padding:36px 30px}}@media(max-width:600px){.mw_focus{padding-top:56px;}.mw_smart_button{display:none;}.mw_support_img,.mw_smart_order2{display:none;}.mw_focus_box .pb-lg-30{padding-bottom:0 !important;}}@media(max-width:576px){.mw_focus_content .pl-22{padding:0}.off-support-img{display:none}}@media(min-width:600px){.mw_smart_button_none{display:none;}}

.mw_account{background:linear-gradient(103.96deg,#070915 0,#0f132c 100%);position:relative;z-index:0;}.mw_account:before{position:absolute;content:'';right:0;top:0;width:607px;height:471px;background:url('/assets/images/mw/mpanel-grid.png') center center no-repeat;z-index:-1}.mw_account_col{border-top:1px solid #3d3d3d;border-bottom:1px solid #3d3d3d;padding:36px 36px 48px;position:relative}.mw_account .mw_account_col:nth-child(2):before{content:'';position:absolute;top:0;right:0;bottom:0;width:1px;background:linear-gradient(180deg,#fbccb8 .05%,#594ffe 54.23%,#fff 135.49%)}.mw_account .mw_account_col:nth-child(2):after{content:'';position:absolute;top:0;left:0;bottom:0;width:1px;background:linear-gradient(180deg,#3d3d3d 0,#111 100%)}.mw_account .mw_account_col:nth-child(3):after{content:'';position:absolute;top:0;right:0;bottom:0;width:1px;background:linear-gradient(180deg,#3d3d3d 0,#111 100%)}.mw_account_h4_p{font-size:17px;color:#d6d6d6;padding-top:8px}.mw_account_btn_border{position:relative;margin-top:-25px;background:#0c1024;max-width:260px}.mw_account_btn_border:before{content:'';position:absolute;top:50%;left:0;height:6px;width:6px;background:#2e2e2e;border-radius:50%;z-index:0;transform:translateY(-33%)}.mw_account_btn_border:after{content:'';position:absolute;top:50%;right:0;height:6px;width:6px;background:#2e2e2e;border-radius:50%;z-index:0;transform:translateY(-33%)}@media(max-width:768px){.mw_account_btn_border:after,.mw_account_btn_border:before{transform: translateY(-12%);}}@media(max-width:991px){.mw_account .mw_account_col:nth-child(2):before{display:none;}}@media(max-width:600px){.mw_account_img{display:none;}.mw_account:before{display:none;}}

.mw_wave_box1{background:#f8f8ff;padding:90px 0 100px}.mw_wave_rolodex_container{display:flex;align-items:center;padding:20px}.mw_wave_dynamic_text{position:relative;list-style:none;padding:0;margin:0;transition:transform .8s cubic-bezier(.7, 0, .3, 1)}.mw_wave_dynamic_text .mw_wave_dynamic_item{color:#667085;font-size:35px;padding:10px 0;border-radius:8px;transition:all .5s ease-in-out;line-height:1.1}.mw_wave_dynamic_text .mw_wave_dynamic_item.active{background:linear-gradient(90deg,#ff2e2e 0,#ee7b16 36.28%,#645cfc 69.75%,#d510fc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-fill-color:transparent;font-weight:600;position:relative;transition:all .3s ease-in-out}
.mw_wave_rolodex_container{height: 330px;overflow: hidden;position:relative;}
.mw_wave_rolodex_container:before {content: '';position: absolute;top: -62px;left: 0;right: 0;background: #F8F8FF;filter: blur(8.1px);height: 88px;z-index: 2;}
.mw_wave_rolodex_container:after {content: '';position: absolute;bottom: -62px;left: 0;right: 0;background: #F8F8FF;filter: blur(8.1px);height: 88px;z-index: 2;}
.mw_wave_h2{font-size:40px;color:var(--ttl_clr);position:relative;padding-right:24px;font-weight: 500;}
.mw_wave_h2:after{content:'';position:absolute;top:-42px;right:0;width:127px;height:48px;background:url('/assets/images/mw/wave-pointer.svg') center center no-repeat;background-size:contain;transition:all .3s ease-in-out}
.mw_wave_h2:before{content:'';position:absolute;top:-3px;left:-19px;width:24px;height:26px;background:url('/assets/images/mw/wave.svg') center center no-repeat;background-size:contain}.mw_wave_box2{box-shadow:-2px -18px 20px #645cfc1c;background:#f8f8ff;padding-bottom:62px;border-top:1px solid #d3cbc5}.mw_wave_box2_h3{font-weight:600}.mw_wave_box2_col{margin-top:-34px;position:relative}.mw_wave_box2_col:before{content:'';width:9px;height:9px;border-radius:50%;right:0;top:26.9px;position:absolute;background:#fff;border:1px solid #d3cbc5}.mw_wave_box2 .mw-col-sm-3:last-child .mw_wave_box2_col:before{display:none}@media(max-width:1200px){.mw_wave_h2{font-size:34px}.mw_wave_dynamic_text .mw_wave_dynamic_item{font-size:30px}.mw_wave_box1{padding:75px 0 62px}}@media(max-width:1100px){.mw_wave_box2_col:before{right:-30px}}@media(max-width:991px){.mw_wave_dynamic_text .mw_wave_dynamic_item{font-size:24px}.mw_wave_h2{font-size:20px}.mw_wave_h2:after{right:-3px;width:84px;height:78px;}}@media(max-width:768px){.mw_wave_box1{padding:44px 0 56px}.mw_wave_rolodex_container{height:125px;}.mw_wave_dynamic_text .mw_wave_dynamic_item{font-size:16px}.mw_wave_h2{font-size:18px;padding-right:0}.mw_wave_rolodex_container{padding:10px}.mw_wave_h2:before{top:-10px;left:-15px;width:18px;height:18px}.mw_wave_h2:after{width:56px;height:42px;top:-30px}}@media(max-width:650px){.mw-h3-p{font-size:14px}}@media(max-width:500px){.mw_wave_box2{border:none;padding-top:30px;box-shadow:unset;}.mw_wave_dynamic_text .mw_wave_dynamic_item{font-size:13px;padding:4px 0}.mw_wave_h2{font-size:14px}.mw_wave_h2:before{top:-8px;left:-8px;width:12px;height:14px}.mw_wave_box2_col:before{display:none}.mw_wave_box2_col{margin:20px 0 0}.mw_wave_box1{display:none;}.mw_wave_box2_col>.pb-30{padding-bottom:4px;}}

.mw_powerhouse_box{background:linear-gradient(170.59deg,#645cfc 26.08%,rgba(100,92,252,.5) 83%,rgba(100,92,252,0) 137.69%);border-radius:30px;padding:30px 24px;position:relative;overflow:hidden;z-index:1;display:flex;flex-flow:column;justify-content:space-between}.mw_powerhouse_box .mw-h3{font-size:24px;font-weight:600}.mw_powerhouse_box .mw-p{padding-bottom:60px;letter-spacing:-.5px;font-size:17px}.mw_powerhouse_box:before{content:'';position:absolute;right:6px;bottom:6px;background:url(/assets/images/mw/light-speed.png) center center no-repeat;background-size:contain;width:164px;height:188px;z-index:-1}.mw_powerhouse_box:after{position:absolute;content:'';top:0;left:0;width:410px;height:314px;background:url('/assets/images/mw/speed-grid.png') center center no-repeat;z-index:-2}.mw_powerhouse_box .mw-btn{padding-inline:24px}.mw_powerhouse_box .mw-btn:before{right:26px}.mw_powerhouse_box .mw-btn:hover{padding-right:44px}.mw_powerhouse_box2{background:rgba(246,246,246,.6);border-radius:20px;border:4px solid #f1f1f163;padding:24px 0 0 24px;overflow:hidden}.mw_powerhouse_box2_img img{vertical-align:bottom}.mw_powerhouse_list li{position:relative;color:#020205;font-size:16px;padding-left:26px;margin-bottom:12px}.mw_powerhouse_list li:before{content:'';position:absolute;transform:translateY(40%);left:0;top:50%;width:18px;height:18px;background:url(/assets/images/mw/check.svg) center center no-repeat;background-size:contain;transform:translateY(-50%)}.mw_powerhouse_h3{font-size:24px;font-weight:500;color:var(--ttl_clr)}.mw_powerhouse_box2 .mw-p{max-width:266px}.mw_game_box{background:#020205;border-radius:20px;padding:30px 24px 0 24px;display:flex;flex-flow:column;justify-content:space-between;position:relative;overflow:hidden;z-index:1}.mw_game_box:after{position:absolute;content:'';top:-16px;left:0;width:410px;height:314px;background:url(/assets/images/mw/game-grid.png) center center no-repeat;z-index:-1}.mw_game_box2{background:#33334c;border:1px solid #56566b;border-radius:24px 24px 0 0;padding:24px 20px 0}.mw_game_box .mw-p{color:#d6d6d6}.mw_game_box2_h5{font-size:14px;font-weight:500;}.mw_game_box2_p{color:#d6d6d6;font-size:12px}@media(max-width:1200px){.mw_powerhouse_box .mw-p{padding-bottom:24px}.mw_powerhouse_box:before{opacity:.6}.mw_powerhouse_box2_img{height:100%;display:flex}.mw_powerhouse_list li{font-size:14px}.mw_powerhouse_list li:before{top:0;transform:unset}.mw_game_box2{padding:12px 16px 0;margin-top:14px}.mw_game_box{padding:20px 16px 0 16px}}@media(max-width:991px){.mw_game_col_ord{order:4;padding-bottom:0}}@media(max-width:768px){.mw_powerhouse_box:before{display:none}.mw_powerhouse_h3{font-size:20px}.mw_powerhouse_box2_img{justify-content:end}.mw_powerhouse_box2{padding:24px 0 0 14px}}@media(max-width:600px){.mw_powerhouse_box2_img{display:none;}.mw_powerhouse_box2{padding:24px 0 12px 16px;width:100%}}
</style>