<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
// Swiper (client-only usage) - we keep this import but ensure Swiper is only mounted on client
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'


const props = defineProps({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tabs: { type: Array, required: true },
    tabsContent: { type: Array, required: true }
})

// active tab index (default 0)
const activeIndex = ref(0)
function setActive(index, opts = { scrollToSection: true }) {
    if (index < 0 || index >= props.tabs.length) return
    activeIndex.value = index
    // after DOM updates, optionally smooth-scroll the section into view
    if (opts.scrollToSection) {
        // scroll to the section with an offset similar to original behavior
        nextTick(() => {
            const box = document.querySelector('.wai-tab-section-box')
            if (!box) return
            const t = window.innerWidth < 1400 ? 80 : 100
            const top = box.getBoundingClientRect().top + window.pageYOffset - t
            window.scrollTo({ top, behavior: 'smooth' })
        })
    }
}

// optional helper: extra pane classes per index to preserve original styles
const paneExtra = ['wai-tab-pane5', 'wai-tab-pane3', '', 'wai-tab-pane4']

// references and reactive state for responsive tab buttons scroller
let buttonsContainer = null
const swiperRef = ref(null)
const isMobileMode = ref(false)
const showLeftShadow = ref(false)
const showRightShadow = ref(false)

function updateMode() {
    // mobile mode mirrors original (<768)
    isMobileMode.value = window.innerWidth < 768
}

function updateShadows() {
    if (!buttonsContainer) return
    const el = buttonsContainer
    // if swiper is active (client-only), use swiper state
    const swiper = swiperRef.value && swiperRef.value.swiper
    if (swiper && isMobileMode.value) {
        showLeftShadow.value = !swiper.isBeginning
        showRightShadow.value = !swiper.isEnd
        return
    }
    // fallback: use scrollLeft for overflowed container
    // when not in mobile mode we expect no shadows
    if (!isMobileMode.value) {
        showLeftShadow.value = false
        showRightShadow.value = false
        return
    }
    const scrollLeft = el.scrollLeft
    const maxScroll = el.scrollWidth - el.clientWidth
    showLeftShadow.value = scrollLeft > 5
    showRightShadow.value = scrollLeft < maxScroll - 5
}

function scrollToTab(index) {
    const swiper = swiperRef.value && swiperRef.value.swiper
    if (swiper && isMobileMode.value) {
        swiper.slideTo(index)
        return
    }
    if (!buttonsContainer) return
    const btn = buttonsContainer.querySelectorAll('.wai-tab-btn')[index]
    if (!btn) return
    // center the tab in view when possible
    const parentRect = buttonsContainer.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const offset = btnRect.left - parentRect.left - (parentRect.width / 2) + (btnRect.width / 2)
    buttonsContainer.scrollBy({ left: offset, behavior: 'smooth' })
}

function onButtonsClick(e) {
    const btn = e.target.closest('.wai-tab-btn')
    if (!btn || !buttonsContainer) return
    const idx = Number(btn.dataset.tab)
    if (Number.isFinite(idx)) {
        setActive(idx)
        if (isMobileMode.value) scrollToTab(idx)
    }
}

function onButtonsScroll() {
    updateShadows()
}

function onResize() {
    updateMode()
    updateShadows()
}

onMounted(() => {
    buttonsContainer = document.querySelector('.wai-tab-buttons')
    updateMode()
    updateShadows()
    // attach listeners
    if (buttonsContainer) {
        // click handled via Vue @click on static buttons; we keep a scroll listener for shadow calc
        buttonsContainer.addEventListener('scroll', onButtonsScroll, { passive: true })
    }
    window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
    if (buttonsContainer) {
        buttonsContainer.removeEventListener('scroll', onButtonsScroll)
    }
    window.removeEventListener('resize', onResize)
})
</script>

<template>
    <section class="wai-tab-section-box">
        <div class="title-center pb-45 pt-10">
            <h2 class="mw-h2" v-html="title"></h2>
        </div>
      <div class="wai-tab-section">
                <!-- Desktop / SSR-friendly buttons (kept for initial render) -->
                <div v-if="!isMobileMode" class="wai-tab-buttons wai-tab-slider desktop-buttons" :class="{ 'slick-no-left-shadow': !showLeftShadow, 'slick-no-right-shadow': !showRightShadow }">
                    <div v-for="(tab,index) in props.tabs" :key="index" class="wai-tab-btn" :class="{ 'wai-tab-active': activeIndex===index }" @click="setActive(index, { scrollToSection: true })" role="button" :aria-pressed="activeIndex===index" :data-tab="index">
                        <span><img class="img-fluid" :src="tab.image" :alt="tab.alt" :title="tab.alt"></span> {{tab.text}}
                    </div>
                </div>

                <!-- Mobile: Swiper client-only slider to replace slick -->
                <ClientOnly>
                    <div v-if="isMobileMode" class="mobile-swiper-wrapper wai-tab-slider wai-tab-buttons" :class="{ 'slick-initialized': isMobileMode, 'slick-no-left-shadow': !showLeftShadow, 'slick-no-right-shadow': !showRightShadow }" style="width:100%">
                            <button class="slick-prev">&#x276E;</button>
                            <button class="slick-next">&#x276F;</button>
                        <Swiper
                            ref="swiperRef"
                            :modules="[Navigation]"
                            :spaceBetween="10"
                            :slidesPerView="'auto'"
                            :centeredSlides="false"
                            :navigation="{ nextEl: '.slick-next', prevEl: '.slick-prev' }"
                            @reachBeginning="() => updateShadows()"
                            @reachEnd="() => updateShadows()"
                        >
                            <SwiperSlide v-for="(tab, index) in props.tabs" :key="index" style="width:auto">
                                <div class="wai-tab-btn" :class="{ 'wai-tab-active': activeIndex===index }" @click="setActive(index)" role="button" :aria-pressed="activeIndex===index">
                                    <span><img class="img-fluid" :src="tab.image" :alt="tab.alt" :title="tab.alt"></span> {{tab.text}}
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </ClientOnly>
        
        <div class="wai-tab-content">
            <div v-for="(pane, i) in props.tabsContent" :key="i" :class="['wai-tab-pane', paneExtra[i] || '', { 'wai-tab-active': activeIndex===i }]">
                <div class="d-flex flex-wrap mw-align-center wai-box-row" v-if="i === 0">
                    <div class="mw-col-md-5">
                        <div class="wai-tab-box-content">
                            <div class="mw-h2" v-html="pane.text"></div>
                            <p class="mw-p" v-html="pane.description"></p>
                            <a :href="pane.btn.link" class="wai-tb-box-btn" v-html="pane.btn.text"></a>
                        </div>
                    </div>
                    <div class="mw-col-md-7">
                        <div class="title-right wai-tab-img"><img class="img-fluid" :src="pane.image" :alt="pane.alt" :title="pane.alt"></div>
                    </div>
                </div>

                <div class="d-flex flex-wrap wai-box-row" v-else-if="i === 1">
                    <div class="mw-col-md-5 d-flex wai-tab-pane3-content-box">
                        <div class="wai-tab-box-content">
                            <div class="mw-h2 fff" v-html="pane.text"></div>
                            <p class="mw-p fff" v-html="pane.description"></p>
                            <a :href="pane.btn.link" class="wai-tb-box-btn" v-html="pane.btn.text"></a>
                        </div>
                    </div>
                    <div class="mw-col-md-7 d-flex pl-30">
                        <div class="title-right wai-tab-img wai-tab-pane3-img-box"><img class="img-fluid" :src="pane.image" :alt="pane.alt" :title="pane.alt"></div>
                    </div>
                </div>

                <div class="d-flex flex-wrap mw-align-center wai-box-row" v-else-if="i === 2">
                    <div class="mw-col-md-5">
                        <div class="wai-tab-box-content">
                            <div class="mw-h2 fff" v-html="pane.text"></div>
                            <p class="mw-p fff" v-html="pane.description"></p>
                            <a :href="pane.btn.link" class="wai-tb-box-btn" v-html="pane.btn.text"></a>
                        </div>
                    </div>
                    <div class="mw-col-md-7">
                        <div class="title-right wai-tab-img"><img class="img-fluid" :src="pane.image" :alt="pane.alt" :title="pane.alt"></div>
                    </div>
                </div>

                <div class="d-flex flex-wrap mw-align-center wai-box-row" v-else-if="i === 3">
                    <div class="mw-col-md-7 wai-order2">
                        <div class="wai-tab-img"><img class="img-fluid" :src="pane.image" :alt="pane.alt" :title="pane.alt"></div>
                    </div>
                    <div class="mw-col-md-5">
                        <div class="wai-tab-box-content">
                            <div class="mw-h2" v-html="pane.text"></div>
                            <p class="mw-p" v-html="pane.description"></p>
                            <a :href="pane.btn.link" class="wai-tb-box-btn" v-html="pane.btn.text"></a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
</template>

<style scoped>
.wai-tab-section-box{position:relative;scroll-snap-type:y mandatory;margin:48px 0}.wai-tab-section{top:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2}.wai-tab-buttons{display:flex;margin-bottom:45px;border:1px solid #a2aaea;border-radius:50px;padding:13px 11px}.wai-tab-buttons span{display:inline-block;}.wai-tab-buttons .wai-tab-btn{padding:12px 24px;margin:0 4px;font-size:16px;cursor:pointer;border:none;background:0 0;border-radius:44px;transition:background .3s;font-weight:500;color:#123455}.wai-tab-buttons .wai-tab-btn:hover{background:#f7f9ff}.wai-tab-buttons .wai-tab-btn.wai-tab-active{background:#fff;color:var(--azure_clr);box-shadow:0 0 24px rgba(203,207,232,.5)}.wai-tab-btn span{display:inline-block;padding-right:10px}.wai-tab-btn span img{filter:brightness(.4);vertical-align:bottom}.wai-tab-active span img{filter:unset}.wai-tab-pane{padding:0 0 0 50px;display:none;border-radius:40px;background:#050314;width:100%;overflow:hidden;max-width:1243px}.wai-tab-pane.wai-tab-active{display:block}.wai-tab-img img{vertical-align:bottom}.wai-box-row{justify-content:space-between}.wai-tb-box-btn{background:var(--azure_clr);color:#fff;transition:all .3s ease-in-out;text-align:center;font-size:14px;border-radius:30px;font-weight:500;padding:12px 36px;margin-top:40px;display:inline-block}.wai-tab-pane3-img-box{overflow:hidden;background:linear-gradient(45deg,#03010f 32.31%,#1c0f8c 94.99%);border-radius:40px}.wai-tab-box-content .mw-h2{max-width:402px;margin:0}.wai-tab-box-content .mw-p{max-width:400px;margin:0}.wai-tab-pane2{background:#100b37}.wai-tab-pane3{background:#fff;border-radius:0;padding-left:0}.wai-tab-pane3-content-box{background:#03010f;border-radius:40px;padding:0 42px 0 42px;align-items:center}.wai-tab-pane3-img-box{border-radius:40px;text-align:center;width:100%;flex:1}.wai-tab-pane4{padding-left:0;background:linear-gradient(56.42deg,#f2f0ff 68.68%,#9c7bff 118.19%)}.wai-tab-pane5{background:linear-gradient(294.66deg,#f8f6ff 71.08%,#bcb2ff 109.68%)}.wai-tab-pane4 .wai-tab-img{padding:0 0 0 16px}.wai-tab-pane4 .wai-tab-box-content{padding:0 62px 0 10px}.com-dom-tab-btn.com-dom-tab-btn-active{background:var(--azure_clr)!important}@media(max-height:768px){.wai-tab-buttons .wai-tab-btn{padding:10px 20px;font-size:15px}.wai-tab-section-box>.pb-45{padding-bottom:24px}.wai-tab-pane{max-width:1030px}.wai-tab-buttons{padding:6px 8px;margin-bottom:30px}.wai-tab-section-box .mw-p{padding-top:8px}.wai-tab-section-box .title-center.pb-30.pt-22{padding-bottom:12px}.wai-tab-img img{width:88%}.wai-tab-pane3-img-box img{width:88%}.wai-tab-box-content .mw-p.fff.pb-45{padding-bottom:16px}.wai-tab-section-box .title-center.pb-30.pt-22{padding-bottom:18px}}@media(max-width:1400px){.wai-tab-section-box{margin:45px 0 54px}.wai-tab-pane{max-width:1090px}.wai-tab-img img{width:86%}.wai-tab-pane3-img-box img{width:94%}}@media(max-width:1100px){.wai-tab-section-box{padding:0 10px}}@media(max-width:1024px){.wai-tab-section{padding:24px 14px!important}}@media(max-width:991px){.wai-tab-pane{padding:0 0 0 34px}.wai-tb-box-btn{margin-top:14px}}@media(max-width:870px){.wai-tab-buttons .wai-tab-btn{padding:12px 16px;}.wai-tab-pane4 .wai-tab-box-content{padding:26px 62px 26px 10px}.wai-tab-pane4 .wai-box-row{align-items:end}.wai-tab-box-content .mw-h2{font-size:24px}.wai-tab-box-content .mw-p{padding-top:6px}}@media(max-width:810px){.wai-tab-box-content .mw-h2{font-size:22px;line-height:1.2}.wai-tab-buttons{flex-wrap:wrap;justify-content:center}}
@media(max-width:768px){.wai-tab-img{padding-top:40px}.wai-tab-section-box{margin-bottom:18px}.wai-tab-pane2{background:#000}.wai-order2{order:2}.wai-tab-buttons{width:100%;max-width:100%;border-radius:0;border:none;margin-bottom:26px}.wai-box-row .mw-col-md-7.pl-30{padding-left:0}.wai-box-row{justify-content:center}.wai-tab-pane{padding:44px 0 0;text-align:center}.wai-tab-img{padding-top:30px}.wai-tab-pane3-content-box{padding:48px 22px;margin-bottom:22px;width:100%;justify-content:center}.wai-tab-pane4 .wai-tab-box-content{padding:30px 4px 30px}.wai-tab-pane3{padding-top:10px}.wai-tab-pane4{padding:18px 22px 0 22px}.wai-tab-buttons .wai-tab-btn{width:100%;padding:10px 12px}.wai-tab-btn span{display:none}}@media(max-width:450px){.wai-tab-box-content{padding:0 26px}.wai-tab-img img{width:100%}.wai-tab-pane3-content-box{width:100%}}@media (max-width:767px){.wai-tab-buttons .wai-tab-btn{background:#f4f5ff;text-align:center;max-width:174px}.wai-tab-buttons .wai-tab-btn.wai-tab-active{box-shadow:unset;background:#d5dfff}.wai-tab-buttons{display:block;padding:0 8px;position:relative;overflow:hidden;max-width:442px}.wai-tab-buttons::after,.wai-tab-buttons::before{content:'';position:absolute;top:0;bottom:0;width:30px;pointer-events:none;z-index:10;opacity:0;transition:opacity .3s ease-in-out}.wai-tab-buttons::before{left:0;background:linear-gradient(to right,#fff 0,rgba(255,255,255,0) 100%)}.wai-tab-buttons::after{right:0;background:linear-gradient(to left,#fff 0,rgba(255,255,255,0) 100%)}.wai-tab-section .slick-initialized.wai-tab-buttons::after,.wai-tab-section .slick-initialized.wai-tab-buttons::before{opacity:1}.wai-tab-section .slick-initialized.wai-tab-buttons.slick-no-left-shadow::before{opacity:0}.wai-tab-section .slick-initialized.wai-tab-buttons.slick-no-right-shadow::after{opacity:0}.slick-next,.wai-tab-section .slick-prev{font-size:0;line-height:0;position:absolute;top:50%;display:block;width:30px;height:30px;padding:0;transform:translate(0,-50%);cursor:pointer;color:transparent;border:none;outline:0;background:0 0;z-index:11}.wai-tab-section .slick-next:focus,.wai-tab-section .slick-next:hover,.wai-tab-section .slick-prev:focus,.wai-tab-section .slick-prev:hover{color:transparent;outline:0;background:0 0}.wai-tab-section .slick-next:before,.wai-tab-section .slick-prev:before{font-size:20px;line-height:1;opacity:.75;color:#333;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Cpath fill='currentColor' d='M10.03 3.97a.75.75 0 0 1 0 1.06L7.06 8l2.97 2.97a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z'/%3E%3C/svg%3E") center center no-repeat;width:24px;position:absolute;height:24px;background-size:contain;top:50%;transform:translateY(-50%)}.wai-tab-section .slick-prev{left:-14px}.wai-tab-section .slick-prev:before{content:''}.wai-tab-section .slick-next{right:5px}.wai-tab-section .slick-next:before{content:'';transform:translateY(-50%) rotate(180deg)}.wai-tab-section .slick-next.swiper-button-disabled,.wai-tab-section .slick-prev.swiper-button-disabled{opacity:0;pointer-events:none}.wai-tab-section .slick-slide{margin:0 5px}.wai-tab-section .slick-list{margin:0 -5px;padding:0!important}.wai-tab-section .wai-tab-btn img{max-width:100%;height:auto}.wai-tab-section{padding:20px 10px!important}}
</style>