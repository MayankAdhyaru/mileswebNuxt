
<script setup>
// existing imports + logic
import { ref, onMounted, onUnmounted } from 'vue'

const scrollToPlans = () => {
  const el = document.getElementById('plansToJmp')
  if (!el) return

  const header = document.querySelector('header')
  const offset = header?.offsetHeight || 80 // adjust offset if needed

  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

const onClickJumpToPlans = (e) => {
  // Check if the clicked element or any of its parents has the class 'jump-to-plans'
  if (e.target.closest('.jump-to-plans')) {
    scrollToPlans()
  }
}


const baseUrl = 'https://www.milesweb.in/'
const isMobile = ref(false)
const openSections = ref(new Set())

function toggleSection(name) {
  if (!isMobile.value) return
  if (openSections.value.has(name)) {
    openSections.value.delete(name)
  } else {
    openSections.value.add(name)
  }
}

function checkWidth() {
  isMobile.value = window.innerWidth <= 550
}

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
  document.addEventListener('click', onClickJumpToPlans)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkWidth)
  document.removeEventListener('click', onClickJumpToPlans)
})

// 👇 custom transition hooks for jQuery-like slide effect
const slideToggle = {
  beforeEnter(el) {
    el.style.height = '0'
    el.style.opacity = '0'
  },
  enter(el) {
    el.style.height = el.scrollHeight + 'px'
    el.style.opacity = '1'
  },
  afterEnter(el) {
    el.style.height = 'auto'
  },
  beforeLeave(el) {
    el.style.height = el.scrollHeight + 'px'
    el.style.opacity = '1'
  },
  leave(el) {
    el.style.height = '0'
    el.style.opacity = '0'
  },
  afterLeave(el) {
    el.style.height = ''
  }
}
</script>


<template>
    <footer class="mw-ftr">
        <div class="mw-ftr-container">
            <div class="mw-ftr-row">
                <!-- Logo + Social -->
                <div class="mw-ftr-col mw-ftr-col1">
                    <div class="mw-ftr-logo-box">
                        <div class="f6yt-ftr-mncol mw-ftr-mncol-logo">
                            <div class="mw-ftr-logo">
                                <img :src="`${baseUrl}assets/images/logo/svg/milesweb-190x61-white.svg`" loading="lazy"
                                    alt="Best Web Hosting in India | MilesWeb"
                                    title="Best Web Hosting in India | MilesWeb" />
                            </div>
                            <div class="mw-ftr-info">
                                Founded in 2012 with an aim to deliver the best web hosting in India that's crafted for
                                unmatched speed,
                                high security and 24/7 support.
                            </div>
                        </div>
                    </div>

                    <div class="mw-ftr-awrd">
                        <div class="mw-ftr-awrd-img-box awrd-img-box1">
                            <img loading="lazy" width="87" height="112" class="img-fluid"
                                src="/assets/images/awards/leader-small-business-winter.png"
                                alt="Leader Small Business Winter | MilesWeb" />
                        </div>
                        <div class="mw-ftr-awrd-img-box">
                            <img loading="lazy" width="86" height="112" class="img-fluid"
                                src="/assets/images/awards/high-performer-india-winter.png"
                                alt="High Performer India Winter | MilesWeb" />
                        </div>
                        <div class="mw-ftr-awrd-img-box">
                            <img loading="lazy" width="87" height="112" class="img-fluid"
                                src="/assets/images/awards/high-performer-mid-market-winter.png"
                                alt="High Performer Mid Market Winter | MilesWeb" />
                        </div>
                    </div>

                    <div class="mw-ftr-social">
                        <a class="mw-ftr-social-wrap" href="https://www.facebook.com/MilesWeb" target="_blank" aria-label="Facebook | MilesWeb"><i
                                class="mw-ftr-sc-ico mw-ftr-sc-fb"></i></a>
                        <a class="mw-ftr-social-wrap" href="https://x.com/MilesWeb" target="_blank" aria-label="Twitter | MilesWeb"><i
                                class="mw-ftr-sc-ico mw-ftr-sc-twit"></i></a>
                        <a class="mw-ftr-social-wrap" href="https://www.linkedin.com/company/milesweb-internet-services" target="_blank"
                            aria-label="Linkedin | MilesWeb"><i class="mw-ftr-sc-ico mw-ftr-sc-link"></i></a>
                        <a class="mw-ftr-social-wrap" href="https://www.instagram.com/milesweb" target="_blank"
                            aria-label="Instagram | MilesWeb"><i class="mw-ftr-sc-ico mw-ftr-sc-insta"></i></a>
                        <a class="mw-ftr-social-wrap" href="https://www.youtube.com/milesweb" target="_blank" aria-label="Youtube | MilesWeb"><i
                                class="mw-ftr-sc-ico mw-ftr-sc-yt"></i></a>
                    </div>
                </div>

                <!-- Hosting -->
                <div class="mw-ftr-col mw-ftr-col2">
                    <ul class="mw-ftr-list">
                        <li data-f3t303r-head class="mw-ftr-h3"
                            :class="{ '_f3t303r-head-lihide': isMobile && !openSections.has('Hosting') }"
                            @click="isMobile && toggleSection('Hosting')">Hosting</li>
                        <Transition  v-bind="slideToggle" name="slide">
                            <ul v-if="!isMobile || openSections.has('Hosting')">
                                <li><a :href="`${baseUrl}hosting/web-hosting`">Web Hosting</a></li>
                                <li><a :href="`${baseUrl}domains/free-domain`">Free Domain</a></li>
                                <li><a :href="`${baseUrl}hosting/shared-hosting`">Shared Hosting</a></li>
                                <li><a :href="`${baseUrl}hosting/cloud-hosting/`">Cloud Hosting</a></li>
                                <li><a :href="`${baseUrl}hosting/wordpress-hosting/`">WordPress Hosting</a></li>
                                <li><a :href="`${baseUrl}hosting/woocommerce-hosting`">WooCommerce Hosting</a></li>
                                <li><a :href="`${baseUrl}hosting/reseller-hosting/`">Reseller Hosting</a></li>
                                <li><a :href="`${baseUrl}hosting/nodejs-hosting`">Node.js Hosting</a></li>
                                <li><a :href="`${baseUrl}hosting/laravel-hosting`">Laravel Hosting</a></li>
                                <li><a :href="`${baseUrl}hosting/python-hosting`">Python Hosting</a></li>
                                <li><a :href="`${baseUrl}ssl-certificates.php`">SSL Certificates</a></li>
                            </ul>
                        </Transition>
                    </ul>

                    <ul class="mw-ftr-list">
                        <li data-f3t303r-head class="mw-ftr-h3"
                            :class="{ '_f3t303r-head-lihide': isMobile && !openSections.has('Affiliate') }"
                            @click="isMobile && toggleSection('Affiliate')">Affiliate</li>
                        <Transition  v-bind="slideToggle" name="slide">
                            <ul v-if="!isMobile || openSections.has('Affiliate')">
                                <li><a :href="`${baseUrl}affiliates.php`">Refer & Earn</a></li>
                            </ul>
                        </Transition>
                    </ul>
                </div>

                <!-- Servers -->
                <div class="mw-ftr-col mw-ftr-col3">
                    <ul class="mw-ftr-list">
                        <li data-f3t303r-head class="mw-ftr-h3"
                            :class="{ '_f3t303r-head-lihide': isMobile && !openSections.has('Servers') }"
                            @click="isMobile && toggleSection('Servers')">Servers</li>
                        <Transition  v-bind="slideToggle" name="slide">
                            <ul v-if="!isMobile || openSections.has('Servers')">
                                <li><a :href="`${baseUrl}hosting/vps-hosting/`">VPS Hosting</a></li>
                                <li><a :href="`${baseUrl}hosting/vps-hosting/windows-vps`">Windows VPS</a></li>
                                <li><a :href="`${baseUrl}hosting/vps-hosting/managed-vps-hosting`">Managed VPS</a></li>
                                <li><a :href="`${baseUrl}hosting/vps-hosting/n8n`">n8n VPS</a></li>
                                <li><a :href="`${baseUrl}hosting/vps-hosting/cpanel-vps-hosting`">cPanel VPS</a></li>
                                <li><a :href="`${baseUrl}hosting/vps-hosting/forex-vps`">Forex VPS</a></li>
                                <li><a :href="`${baseUrl}hosting/vps-hosting/cyberpanel`">CyberPanel VPS</a></li>
                                <li><a :href="`${baseUrl}hosting/vps-hosting/plesk`">Plesk VPS</a></li>
                                <li><a :href="`${baseUrl}hosting/virtual-dedicated-server`">Virtual Dedicated Server</a>
                                </li>
                                <li><a :href="`${baseUrl}hosting/dedicated-servers/`">Dedicated Server</a></li>
                                <li><a :href="`${baseUrl}hosting/dedicated-servers/bare-metal-server`">Bare Metal</a>
                                </li>
                                <li><a :href="`${baseUrl}hosting/dedicated-servers/gpu-dedicated-server`">GPU Dedicated
                                        Server</a></li>
                                <li><a :href="`${baseUrl}hosting/hostinger-alternative`">MilesWeb Competitor</a></li>
                            </ul>
                        </Transition>
                    </ul>
                </div>

                <!-- Cloud -->
                <div class="mw-ftr-col mw-ftr-col3">
                    <ul class="mw-ftr-list">
                        <li data-f3t303r-head class="mw-ftr-h3"
                            :class="{ '_f3t303r-head-lihide': isMobile && !openSections.has('Cloud') }"
                            @click="isMobile && toggleSection('Cloud')">Cloud</li>
                        <Transition  v-bind="slideToggle" name="slide">
                            <ul v-if="!isMobile || openSections.has('Cloud')">
                                <li><a :href="`${baseUrl}hosting/cloud-hosting/cloud-vps`">Cloud VPS</a></li>
                                <li><a :href="`${baseUrl}hosting/cloud-hosting/gpu`">GPU Cloud</a></li>
                                <li><a :href="`${baseUrl}managed-services/aws-managed-services`">Managed AWS Cloud</a>
                                </li>
                                <li><a :href="`${baseUrl}hosting/cloud-hosting/acronis-cloud-backup`">Acronis Backup</a>
                                </li>
                                <li><a :href="`${baseUrl}google-workspace.php`">Google Workspace</a></li>
                            </ul>
                        </Transition>
                    </ul>

                    <ul class="mw-ftr-list">
                        <li data-f3t303r-head class="mw-ftr-h3"
                            :class="{ '_f3t303r-head-lihide': isMobile && !openSections.has('Tools') }"
                            @click="isMobile && toggleSection('Tools')">Tools</li>
                        <Transition  v-bind="slideToggle" name="slide">
                            <ul v-if="!isMobile || openSections.has('Tools')">
                                <li><a :href="`${baseUrl}ai-website-builder`">AI Website Builder</a></li>
                                <li><a :href="`${baseUrl}business-name-generator`">AI Business Name Generator</a></li>
                                <li><a href="https://tools.milesweb.com/" target="_blank">Smart Web Tools</a></li>
                            </ul>
                        </Transition>
                    </ul>
                </div>

                <!-- Company + Legal -->
                <div class="mw-ftr-col mw-ftr-col4">
                    <ul class="mw-ftr-list">
                        <li data-f3t303r-head class="mw-ftr-h3"
                            :class="{ '_f3t303r-head-lihide': isMobile && !openSections.has('Company') }"
                            @click="isMobile && toggleSection('Company')">Company</li>
                        <Transition  v-bind="slideToggle" name="slide">
                            <ul v-if="!isMobile || openSections.has('Company')">
                                <li><a :href="`${baseUrl}about-us.php`">About MilesWeb</a></li>
                                <li><a :href="`${baseUrl}reviews.php`">Customer Reviews</a></li>
                                <li><a :href="`${baseUrl}blog/client-stories/`">Success Stories</a></li>
                                <li><a :href="`${baseUrl}brand-assets`">Brand Assets</a></li>
                                <li><a :href="`${baseUrl}blog/`" target="_blank">Blog</a></li>
                                <li><a :href="`${baseUrl}hosting-faqs/`" target="_blank">Knowledge Base</a></li>
                                <li><a href="https://www.youtube.com/c/MilesWeb/playlists" target="_blank">Video
                                        Tutorials</a></li>
                                <li><a :href="`${baseUrl}contact.php`" target="_blank">Contact Us</a></li>
                                <li><a :href="`${baseUrl}sitemap.php`" target="_blank">Sitemap</a></li>
                            </ul>
                        </Transition>
                    </ul>

                    <ul class="mw-ftr-list">
                        <li data-f3t303r-head class="mw-ftr-h3"
                            :class="{ '_f3t303r-head-lihide': isMobile && !openSections.has('Legal') }"
                            @click="isMobile && toggleSection('Legal')">Legal</li>
                        <Transition  v-bind="slideToggle" name="slide">
                            <ul v-if="!isMobile || openSections.has('Legal')">
                                <li><a :href="`${baseUrl}privacy-policy.php`">Privacy Policy</a></li>
                                <li><a :href="`${baseUrl}tos.php`">Terms of Service</a></li>
                                <li><a :href="`${baseUrl}hosting/dedicated-servers/sla`">SLA</a></li>
                            </ul>
                        </Transition>
                    </ul>
                </div>
            </div>

            <!-- Payment Methods -->
            <div class="mw-ftr-col mw-ftr-col4 mw-ftr-mncol-payments">
                <div class="mw-ftr-wrapr">
                    <div v-for="img in [
                        'visa_icon.svg',
                        'mastercard_icon.svg',
                        'rupay_icon.svg',
                        'upi_icon.svg',
                        'gpay_icon.svg',
                        'phone-pe.svg'
                    ]" :key="img" class="mw-ftr-pm_logo">
                        <img :src="`/img-assets/payment-method/${img}`" width="60" height="40" loading="lazy"
                            alt="Payment Method | MilesWeb India" />
                    </div>
                    <div class="mw-ftr-copyright pt-6 fff" style="padding-left: 8px;">
                        And <a style="text-decoration:underline;color:#fff" target="_blank"
                            href="/payment-methods.php">more payment options</a>.
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="mw-ftr-copy-wrap">
                <div class="mw-ftr-copyright2">
                    © Copyright 2012 - {{ new Date().getFullYear() }} MilesWeb Internet Services Pvt Ltd - Best Web
                    Hosting
                    Provider in India. Company Registration No. 269947. GSTIN 27AAKCM0202D1Z2.
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
:deep(.mw-ftr-sc-ico) {
  background: url('/img-assets/footer-social-media-icon.png') no-repeat;
}
:deep(.mw-ftr-sc-fb) {
  background-position: 0;
}
:deep(.mw-ftr-sc-twit) {
  background-position: 25%;
}
:deep(.mw-ftr-sc-link) {
  background-position: 50%;
}
:deep(.mw-ftr-sc-insta) {
  background-position: 75%;
}
:deep(.mw-ftr-sc-yt) {
  background-position: 100%;
}
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}
</style>
