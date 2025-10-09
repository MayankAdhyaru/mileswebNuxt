<script setup>
import '~/assets/css/main.css'
import Hero from '~/components/Hero.vue'
import Newrating from '~/components/Newrating.vue'
import CaseStudy from '~/components/CaseStudy.vue'
import Migration from '~/components/Migration.vue'
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
const mpanelPayload = apiData.value?.mpanel || {}
const migrationPayload = apiData.value?.migration || {}
const whyChoosePayload = apiData.value?.whyChoose || {}
const prodServPaylod = apiData.value?.productAndServices || {}
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
  bannerAlt:heroPayload.bannerAlt,
  bannerImage:heroPayload.bannerImage,
  plansBtn: heroPayload?.plansBtn || 'Start now',
  // include guarantee etc. if present
  guarantee: heroPayload?.guarantee || {}
}

const migration = {
    title : migrationPayload.title || 'Free website migration, fully managed by Us',
    description : migrationPayload.description || 'Our experts handle the technical aspects of moving your website, with data security at the utmost priority. So sit back and enjoy a stress-free transition to our platform without any additional costs.',
    image : migrationPayload.image || '/assets/images/mw/migration.gif',
    alt: migrationPayload.alt || 'Free website migration, fully managed by Us | MilesWeb India',
    btn:{
        text:migrationPayload.btn.text || 'Migrate now!',
        link:migrationPayload.btn.link ||'',
    }
}

    const whyChoose = {
        title : whyChoosePayload.title ||'Web hosting that works for you: Our unstoppable platform!',
        description :whyChoosePayload.description ||`MilesWeb'The all-in-one web hosting solution is designed for speed, security, and the unique needs of the Indian market.`,
        btn:{
            text:whyChoosePayload.btn.text ||'Get Started',
            link:whyChoosePayload.btn.link ||''
        },
        image:whyChoosePayload.image || '/assets/images/mw/smart-hosting.gif',
        alt:whyChoosePayload.alt ||'Smart Hosting. Smarter Growth | MilesWeb India',
        features:[
            {
                title:whyChoosePayload.features[0].title ||'Always secure with free SSL',
                description:whyChoosePayload.features[0].description ||'Instantly protect your site and your visitors with our free SSL certificates.',
                icons:{
                    path:whyChoosePayload.features[0].icons.path ||'/assets/images/mw/security.png',
                    alt:whyChoosePayload.features[0].icons.alt ||'Always secure with free SSL | MilesWeb India'
                }
            },
            {
                title:whyChoosePayload.features[1].title ||'All-in-one hosting toolkit',
                description:whyChoosePayload.features[1].description ||'Everything you need in one dashboard without extra plugins or costs.',
                icons:{
                    path:whyChoosePayload.features[1].icons.path ||'/assets/images/mw/toolkit.png',
                    alt:whyChoosePayload.features[1].icons.alt ||'All-in-one hosting toolkit | MilesWeb India'
                }
            },
            {
                title:whyChoosePayload.features[2].title ||'Zero-risk guarantee',
                description:whyChoosePayload.features[2].description || `Try us for 30 days and if you're not 100% satisfied, get your money back.`,
                icons:{
                    path:whyChoosePayload.features[2].icons.path ||'/assets/images/mw/growing.png',
                    alt:whyChoosePayload.features[2].icons.alt || 'Zero-risk guarantee | MilesWeb India'
                }
            },
        ]
    }
    const productAndServices = {
        title: prodServPaylod.title || 'Our high-grade, performance-powered products and services',
        description: prodServPaylod.description || '',
        tabs:[
            {
                text:prodServPaylod.tabs[0].text || 'Cloud Hosting',
                image:prodServPaylod.tabs[0].image || '/assets/images/mw/cloud.svg"',
                alt:prodServPaylod.tabs[0].alt || 'Cloud Hosting | MilesWeb India',
            },
            {
                text:prodServPaylod.tabs[1].text || 'Business Email',
                image:prodServPaylod.tabs[1].image || '/assets/images/mw/business-tab.svg',
                alt:prodServPaylod.tabs[1].alt ||'Business Email | MilesWeb India',
            },
            {
                text:prodServPaylod.tabs[2].text ||'Website Builder',
                image:prodServPaylod.tabs[2].image || '/assets/images/mw/builder-tab.svg',
                alt:prodServPaylod.tabs[2].alt ||'Website Builder | MilesWeb India',
            },
            {
                text:prodServPaylod.tabs[3].text ||'Domain',
                image:prodServPaylod.tabs[3].image || '/assets/images/mw/domain-tab.svg',
                alt:prodServPaylod.tabs[3].alt ||'Domain | MilesWeb India',
            }
        ],
        tabsContent:[
            {
                text:prodServPaylod.tabsContent[0].text ||'Fully optimized cloud hosting',
                description:prodServPaylod.tabsContent[0].description ||'Our feature-rich cloud hosting plans optimally offer top-tier server specs and high uptime to ensure peak performance for your website around the clock.',
                btn: {
                    text: prodServPaylod.tabsContent[0].btn.text ||'View plans',
                    link: prodServPaylod.tabsContent[0].btn.link ||'/hosting/cloud-hosting/',
                },
                image:prodServPaylod.tabsContent[0].image ||'/assets/images/mw/cloud-hosting.gif',
                alt:prodServPaylod.tabsContent[0].alt ||'Fully optimized cloud hosting | MilesWeb India',
            },
            {
                text:prodServPaylod.tabsContent[1].text ||'Professional email that grows with your business.',
                description:prodServPaylod.tabsContent[1].description ||'Get custom business emails that match your brand and align with your domain.',
                btn: {
                    text: prodServPaylod.tabsContent[1].btn.text ||'Get Started',
                    link: prodServPaylod.tabsContent[1].btn.link ||'/business-email',
                },
                image:prodServPaylod.tabsContent[1].image ||'/assets/images/mw/business-email.gif',
                alt:prodServPaylod.tabsContent[1].alt ||'Professional email that grows with your business | MilesWeb India',
            },
            {
                text:prodServPaylod.tabsContent[2].text ||'Build a professional website in minutes.',
                description:prodServPaylod.tabsContent[2].description ||'Our AI website builder designs your site for a simplified online journey.',
                btn: {
                    text: prodServPaylod.tabsContent[2].btn.text ||'Build with AI',
                    link: prodServPaylod.tabsContent[2].btn.link ||'/ai-website-builder',
                },
                image:prodServPaylod.tabsContent[2].image ||'/assets/images/mw/website-builder.gif',
                alt:prodServPaylod.tabsContent[2].alt ||'Build a professional website in minutes | MilesWeb India',
            },
            {
                text:prodServPaylod.tabsContent[3].text ||'A dream domain for a strong web presence.',
                description:prodServPaylod.tabsContent[3].description ||'Our AI domain generator finds you the ideal domain name in seconds.',
                btn: {
                    text: prodServPaylod.tabsContent[3].btn.text ||'Get Your Domain',
                    link: prodServPaylod.tabsContent[3].btn.link ||'/domains/',
                },
                image:prodServPaylod.tabsContent[3].image ||'/assets/images/mw/domain.gif',
                alt:prodServPaylod.tabsContent[3].alt ||'A dream domain for a strong web presence | MilesWeb India',
            }
        ]
    }

</script>

<template>
    <div>
        <Hero v-bind="hero" />
        <Newrating />
        <!-- Support Section  -->
        <section class="pt-120 pb-45 px-md-6 mw_focus">
            <div class="mw-container mw_focus_box">
                <div class="mw-row mw-align-center">
                    <div class="mw-col-lg-6 pr-30 pb-lg-30">
                    <div class="mw_focus_content">
                        <div class="pb-30">
                            <h2 class="mw-h2" v-html="supportPayload.title"></h2>
                            <p class="mw-p mw_sub_clr" v-html="supportPayload.description"></p>
                        </div>
                        <div class="d-flex mw_focus_row1">
                            <span class="off-support-img"><img loading="lazy" :src="supportPayload.feature.image" :alt="supportPayload.feature.alt" :title="supportPayload.feature.alt" class="img-fluid"></span>
                            <div class="pl-22">
                                <div class="mw-h4 pb-6" v-html="supportPayload.feature.title"></div>
                                <div class="mw_focus_h4_p mw-h3-p" v-html="supportPayload.feature.description"></div>
                            </div>
                        </div>
                        <div class="d-flex pb-30">
                            <span class="off-support-img"><img loading="lazy" :src="supportPayload.feature2.image" :alt="supportPayload.feature2.alt" :title="supportPayload.feature2.alt" class="img-fluid"></span>
                            <div class="pl-22">
                                <div class="mw-h4 pb-6" v-html="supportPayload.feature2.title"></div>
                                <div class="mw_focus_h4_p mw-h3-p" v-html="supportPayload.feature2.description"></div>
                            </div>
                        </div>
                        <a :href="supportPayload.btn.link" class="mw-btn" v-html="supportPayload.btn.text"></a>
                    </div>
                    </div>
                    <div class="mw-col-lg-6">
                        <div class="title-center ho-global-img mw_support_img pt-md-24"><img class="img-fluid" :src="supportPayload.image" loading="lazy" :alt="supportPayload.feature2.alt" :title="supportPayload.feature2.alt"></div>
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
                        <h2 class="mw-h2 fff" v-html="mpanelPayload.title"></h2>
                        <p class="mw-p fff" v-html="mpanelPayload.description"></p>
                    </div>
                    <div class="title-center pb-45 mw_account_img">
                        <img loading="lazy" :src="mpanelPayload.image" class="img-fluid" :alt="mpanelPayload.alt" :title="mpanelPayload.alt">
                    </div>
                    <div class="mw-row mw_account_row">
                        <div class="mw-col-lg-3 mw-col-sm-6 mw_account_col">
                            <div>
                                <div class="pb-16"><img loading="lazy" :src="mpanelPayload.feature.image" class="img-fluid" :alt="mpanelPayload.feature.alt" :title="mpanelPayload.feature.alt" width="31" height="33"></div>
                                <div class="mw-h4 fff" v-html="mpanelPayload.feature.title"></div>
                                <p class="mw_account_h4_p" v-html="mpanelPayload.feature.description"></p>
                            </div>
                        </div>
                        <div class="mw-col-lg-3 mw-col-sm-6 mw_account_col">
                            <div>
                                <div class="pb-16"><img loading="lazy" :src="mpanelPayload.feature2.image" class="img-fluid" :alt="mpanelPayload.feature2.alt" :title="mpanelPayload.feature2.alt" width="31" height="33"></div>
                                <div class="mw-h4 fff" v-html="mpanelPayload.feature2.title"></div>
                                <p class="mw_account_h4_p" v-html="mpanelPayload.feature2.description"></p>
                            </div>
                        </div>
                        <div class="mw-col-lg-3 mw-col-sm-6 mw_account_col">
                            <div>
                                <div class="pb-16"><img loading="lazy" :src="mpanelPayload.feature3.image" class="img-fluid" :alt="mpanelPayload.feature3.alt" :title="mpanelPayload.feature3.alt" width="31" height="33"></div>
                                <div class="mw-h4 fff" v-html="mpanelPayload.feature3.title"></div>
                                <p class="mw_account_h4_p" v-html="mpanelPayload.feature3.description"></p>
                            </div>
                        </div>
                        <div class="mw-col-lg-3 mw-col-sm-6 mw_account_col">
                            <div>
                                <div class="pb-16"><img loading="lazy" :src="mpanelPayload.feature4.image" class="img-fluid" :alt="mpanelPayload.feature4.alt" :title="mpanelPayload.feature4.alt" width="31" height="33"></div>
                                <div class="mw-h4 fff" v-html="mpanelPayload.feature4.title"></div>
                                <p class="mw_account_h4_p" v-html="mpanelPayload.feature4.description"></p>
                            </div>
                        </div>
                    </div>
                    <div class="title-center mw_account_btn_border">
                        <span class="mw-btn jump-to-plans" v-html="mpanelPayload.btn.text"></span>
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
                        <div class="d-flex" v-for="(feature, index) in whyChoose.features" :class="index < whyChoose.features.length - 1 ? 'mw_focus_row1' : ''" :key="index">
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
</style>