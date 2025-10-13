<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


// Props
const props = defineProps({
  plans: { type: Array, default: () => [] },
  planHeading: {
    type: Object,
    default: () => ({ title: '', description: '' })
  }
})

// Toggle hidden features
const showHiddenAll = ref(false)
const containerRef = ref(null)
const isMobileSlider = ref(false)
// Scroll to plans section
const scrollToPlans = () => {
  setTimeout(() => {
    const el = document.getElementById('plansToJmp')
    const header = document.querySelector('header')
    const offset = header?.offsetHeight || 80
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 300)
}

// ------------------- Mobile detection -------------------
const updateSliderMode = () => {
  isMobileSlider.value = window.innerWidth < 1100
}

onMounted(() => {
  updateSliderMode()
  window.addEventListener('resize', updateSliderMode)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSliderMode)
})
// Toggle all hidden features
const toggleAll = async () => {
  showHiddenAll.value = !showHiddenAll.value
  if (!showHiddenAll.value) scrollToPlans()
  await nextTick()
  applyScrollEffect()
}

// Scroll effect
const applyScrollEffect = () => {
  if (!containerRef.value) return
  const container = containerRef.value
  const cols = container.querySelectorAll('.plan-col')
  const windowTop = window.scrollY
  const containerTop = container.offsetTop
  const containerHeight = container.offsetHeight

  if (showHiddenAll.value && windowTop >= containerTop && windowTop < containerTop + containerHeight) {
    container.classList.add('mvh-plan-container-active')
    cols.forEach(col => col.classList.add('mvh-plan-col-active'))
    cols.forEach(col => col.querySelector('.mvh-plan-ttl-box')?.classList.add('mvh-plan-ttl-box-active'))
  } else {
    container.classList.remove('mvh-plan-container-active')
    cols.forEach(col => col.classList.remove('mvh-plan-col-active'))
    cols.forEach(col => col.querySelector('.mvh-plan-ttl-box')?.classList.remove('mvh-plan-ttl-box-active'))
  }
}

// Scroll listener
const onScroll = () => applyScrollEffect()

// ------------------- Tooltip -------------------
let tooltipEl = null
let targetEl = null

const createTooltip = (target) => {
  const tip = target.dataset.tooltip
  if (!tip) return

  // Remove existing tooltip first
  if (tooltipEl) tooltipEl.remove()

  tooltipEl = document.createElement('div')
  tooltipEl.id = 'tooltip'
  tooltipEl.innerHTML = tip
  tooltipEl.style.position = 'absolute'
  tooltipEl.style.opacity = '0'
  tooltipEl.style.width = '235px'
  tooltipEl.style.maxWidth = '100%'
  tooltipEl.style.zIndex = '9999'
  tooltipEl.style.transition = 'all 0.1s ease'
  document.body.appendChild(tooltipEl)

  const positionTooltip = () => {
    if (!tooltipEl) return

    const rect = target.getBoundingClientRect()
    const scrollTop = window.scrollY
    const scrollLeft = window.scrollX
    const tooltipWidth = tooltipEl.offsetWidth
    const tooltipHeight = tooltipEl.offsetHeight
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    let left = rect.left + scrollLeft
    let topBottom = rect.bottom + scrollTop + 4
    let topTop = rect.top + scrollTop - tooltipHeight - 4

    if (left + tooltipWidth > windowWidth) left = windowWidth - tooltipWidth - 10
    if (left < 10) left = 10

    let finalTop = topBottom
    let positionClass = 'bottom'

    if (topBottom + tooltipHeight > scrollTop + windowHeight) {
      finalTop = topTop
      positionClass = 'top'
    }
    if (finalTop < scrollTop) {
      finalTop = topBottom
      positionClass = 'bottom'
    }

    tooltipEl.className = positionClass
    tooltipEl.style.left = `${left}px`
    tooltipEl.style.top = `${finalTop}px`
    tooltipEl.style.opacity = '1'
  }

  positionTooltip()

  const removeTooltip = () => {
    if (tooltipEl) {
      tooltipEl.remove()
      tooltipEl = null
      targetEl = null
    }
    window.removeEventListener('scroll', removeTooltip)
    window.removeEventListener('resize', removeTooltip)
  }

  target.addEventListener('mouseleave', removeTooltip)
  tooltipEl.addEventListener('click', removeTooltip)
  window.addEventListener('scroll', removeTooltip)
  window.addEventListener('resize', removeTooltip)
}

const initTooltips = () => {
  const targets = document.querySelectorAll('[data-tooltip]')
  targets.forEach(target => {
    if (target._tooltipHandler) target.removeEventListener('mouseenter', target._tooltipHandler)
    target._tooltipHandler = () => {
      targetEl = target
      createTooltip(target)
    }
    target.addEventListener('mouseenter', target._tooltipHandler)
  })
}


const initialSlideIndex = computed(() => {
  return props.plans.findIndex((plan, index) => {
    // This is where you define your condition for "Most Popular"
    return index === 2 || plan?.isMostPopular || plan?.class === 'plan-recom-offer-col'
  })
})

// ------------------- Lifecycle -------------------
onMounted(() => {
  window.addEventListener('scroll', onScroll)
  nextTick(() => applyScrollEffect())
  initTooltips()

  const observer = new MutationObserver(() => initTooltips())
  observer.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('scroll', () => tooltipEl?.remove())
  window.removeEventListener('resize', () => tooltipEl?.remove())
})
</script>

<template>
  <section ref="containerRef"  id="plansToJmp" class="pt-45 pb-90 px-md-6">
    <!-- Plans list -->
<h2 class="mw-h2 title-center" v-html="planHeading.title"></h2>
    <p class="mw-p title-center plan-subt-list" v-html="planHeading.description"></p>

    <div v-if="!isMobileSlider" ref="containerRef" class="plan-container plan-container-4col mw-justify-center" :class="{'mvh-plan-container-active' : showHiddenAll}">
      <div
      ref="containerRef"
        v-for="(plan, index) in plans"
        :key="plan.pid || index"
        :class="[
          'plan-col hide_plan',
          index === 2 ? 'plan-recom-offer-col' : '',
          [5, 6, 7, 8].includes(index) ? 'mw-sm-mt-plan' : '',
          {'mvh-plan-col-active' : showHiddenAll}
        ]"
      >
        <div class="mvh-plan-ttl-box" :class="{ 'mvh-plan-ttl-box-active': showHiddenAll }">
          <div class="position-relative">
            <div v-if="index === 2" class="plan-best-deal">
              <div class="plan-recom-h3">Most Popular</div>
            </div>
            <div class="title-right">
              <img
                class="img-fluid"
                :src="plan.plan_ttl_img"
                :alt="plan.plan_ttl_img_alt"
                :title="plan.plan_ttl_img_alt"
              />
            </div>
          </div>

          <div class="plan-h4" v-html="plan.title"></div>
          <div v-if="plan.subtitle" class="plan-p" v-html="plan.subtitle"></div>

          <div class="plan-price">
            <i class="crncy_fas" v-html="plan.currency"></i>
            <div class="kl_price_discounted" v-html="plan.price"></div>
            <span class="up_mo">/mo</span>
          </div>

          <div class="pt-16">
            <div class="plan-save mw-inline-block" v-html="plan.save"></div>
            <div class="plan-prc-strik">
              <i class="crncy_fas" v-html="plan.currency"></i>
              <div class="mw-inline-block" v-html="plan.strike_price"></div>
            </div>
          </div>

          <div class="plan-btn-box">
            <button
              class="plan-btn"
              style="width: 100%; cursor: pointer;"
              @click="redirectToCart(plan)"
              @contextmenu.prevent
            >
              Choose plan
            </button>
          </div>
        </div>

        <!-- Visible features -->
        <ul class="plan-list plan-list-box">
          <li
            v-for="(feature, i) in plan.features"
            :key="'feature-'+i"
            :class="{ plan_cross: feature.cross }"
          >
            <div class="plan-txt">
              <span
                class="plan-txt-b1"
                v-html="feature.label"
                v-if="feature.label" 
                :data-tooltip="feature.tooltip || null"
                :class="{ 'plans-border': feature.tooltip }"
              ></span>
            </div>
          </li>
        </ul>

        <!-- Hidden features (toggleable) -->
        <transition name="fade">
          <div v-if="showHiddenAll" class="hidden-menu">
            <template
              v-for="(features, sectionTitle) in plan.hidden_features"
              :key="'hidden-'+sectionTitle"
            >
              <div class="plan-list-ttl">{{ sectionTitle }}</div>
              <ul class="plan-list plan-list-box">
                <li
                  v-for="(feature, i) in features"
                  :key="'hidden-item-'+i"
                  :class="{ plan_cross: feature.cross }"
                >
                  <div class="plan-txt">
                    <span
                      class="plan-txt-b1"
                      v-html="feature.label"
                      v-if="feature.label" 
                       :data-tooltip="feature.tooltip || null"
                      :class="{ 'plans-border': feature.tooltip }"
                    ></span>
                  </div>
                </li>
              </ul>
            </template>
          </div>
        </transition>
      </div>
    </div>
    <div v-if="isMobileSlider" ref="containerRef" class="plan-container plan-container-4col mw-justify-center mw-plan-slider" :class="{'mvh-plan-container-active' : showHiddenAll}">
        <div class="mw-arrows-wrapper">
            <button class="mw-new-pln-prev">&#x276E;</button>
            <button class="mw-new-pln-next">&#x276F;</button>
        </div>
      <Swiper
        :modules="[Navigation,Pagination]"
        :space-between="12"
        :navigation="{ nextEl: '.mw-new-pln-next', prevEl: '.mw-new-pln-prev' }"
        :pagination="{ clickable: true }"
         :initial-slide="initialSlideIndex >= 0 ? initialSlideIndex : 0"
        :breakpoints="{ 0: { slidesPerView: 1 }, 600: { slidesPerView: 2 },900: { slidesPerView: 3 }}"
      >
      <SwiperSlide
        v-for="(plan, index) in plans"
        :key="plan.pid || index"
      >
      <div :class="[
          'plan-col hide_plan',
          index === 2 ? 'plan-recom-offer-col' : '',
          [5, 6, 7, 8].includes(index) ? 'mw-sm-mt-plan' : '',
          {'mvh-plan-col-active' : showHiddenAll}
        ]" class="w-100">
        <div class="mvh-plan-ttl-box" :class="{ 'mvh-plan-ttl-box-active': showHiddenAll }">
          <div class="position-relative">
            <div v-if="index === 2" class="plan-best-deal">
              <div class="plan-recom-h3">Most Popular</div>
            </div>
            <div class="title-right">
              <img
                class="img-fluid"
                :src="plan.plan_ttl_img"
                :alt="plan.plan_ttl_img_alt"
                :title="plan.plan_ttl_img_alt"
              />
            </div>
          </div>

          <div class="plan-h4" v-html="plan.title"></div>
          <div v-if="plan.subtitle" class="plan-p" v-html="plan.subtitle"></div>

          <div class="plan-price">
            <i class="crncy_fas" v-html="plan.currency"></i>
            <div class="kl_price_discounted" v-html="plan.price"></div>
            <span class="up_mo">/mo</span>
          </div>

          <div class="pt-16">
            <div class="plan-save mw-inline-block" v-html="plan.save"></div>
            <div class="plan-prc-strik">
              <i class="crncy_fas" v-html="plan.currency"></i>
              <div class="mw-inline-block" v-html="plan.strike_price"></div>
            </div>
          </div>

          <div class="plan-btn-box">
            <button
              class="plan-btn"
              style="width: 100%; cursor: pointer;"
              @click="redirectToCart(plan)"
              @contextmenu.prevent
            >
              Choose plan
            </button>
          </div>
        </div>

        <!-- Visible features -->
        <ul class="plan-list plan-list-box">
          <li
            v-for="(feature, i) in plan.features"
            :key="'feature-'+i"
            :class="{ plan_cross: feature.cross }"
          >
            <div class="plan-txt">
              <span
                class="plan-txt-b1"
                v-html="feature.label"
                v-if="feature.label" 
                :data-tooltip="feature.tooltip || null"
                :class="{ 'plans-border': feature.tooltip }"
              ></span>
            </div>
          </li>
        </ul>

        <!-- Hidden features (toggleable) -->
        <transition name="fade">
          <div v-if="showHiddenAll" class="hidden-menu">
            <template
              v-for="(features, sectionTitle) in plan.hidden_features"
              :key="'hidden-'+sectionTitle"
            >
              <div class="plan-list-ttl">{{ sectionTitle }}</div>
              <ul class="plan-list plan-list-box">
                <li
                  v-for="(feature, i) in features"
                  :key="'hidden-item-'+i"
                  :class="{ plan_cross: feature.cross }"
                >
                  <div class="plan-txt">
                    <span
                      class="plan-txt-b1"
                      v-html="feature.label"
                      v-if="feature.label" 
                       :data-tooltip="feature.tooltip || null"
                      :class="{ 'plans-border': feature.tooltip }"
                    ></span>
                  </div>
                </li>
              </ul>
            </template>
          </div>
        </transition>
      </div>
      </SwiperSlide>
      </Swiper>
    </div>

    <!-- Global show/hide button -->
    <div class="title-center plan_new_shadow position-relative mt-6">
      <div
        class="show-hidden-menu plan-view-btn plns-show-btn position-relative"
        :class="{ 'plns-show-active': showHiddenAll }"
        @click="toggleAll"
      >
        <div class="plan-view-btn-a">
          <span>
            {{ showHiddenAll ? 'View less comparison' : 'View comparison' }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 🎯 Custom Swiper pagination styles */
:deep(.swiper-pagination) {
  bottom: unset !important;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 30px;
  z-index: 10;
}

/* Individual bullets */
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background-color: transparent;
  border: 1px solid var(--azure_clr);
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Active + hover state */
:deep(.swiper-pagination-bullet:hover),
:deep(.swiper-pagination-bullet-active) {
  background-color: var(--azure_clr);
}
:deep(.swiper-button-disabled) {
  display: none !important;
}

@media (max-width: 700px) {
  :deep(.swiper-pagination) {
    top: 5px;
  }
  :deep(.swiper) {
    padding-top: 60px;
  }
.mw_our_slider {
    padding-top: 0px;
  }
}
@media (max-width: 551px) {
  :deep(.swiper-pagination) {
    top: 0;
  }
}
.w-100{width: 100%;}
.dh-plan-label-flex {
  justify-content: end;
}
.dh-plan-label1 {
  margin-right: 8px;
}
.dh-plan-label {
  color: #1B46BF;
  font-size: 12px;
  font-weight: 600;
  border-radius: 23px;
  background: #EAF1FF;
  display: inline-block;
  padding: 8px 11px;
  margin-bottom: 15px;
  position: relative;
  z-index: 99;
  letter-spacing: 0.4px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
    .plan_new_shadow{margin-top:-88px;z-index: 1;}
    .plan_new_shadow:before{
      content: "";
    position: absolute;
    left: 0%;
    right: 0%;
    bottom: -42%;
    background: linear-gradient(0deg, #F5F5F5 13%, rgb(255 255 255 / 8%) 100%);
    height: 100px;
    }

    .plan_new_shadow:after{
        position:absolute;
        right:0;left:0;bottom:-30px;
        height:12px;
        content:'';
        background:url('/assets/images/mw/plans-divider.svg') center center repeat-x;
        background-size:auto;
    }
    .plnru-btn{cursor: pointer; transition: all .3s ease-in-out; display: inline-flex; align-items: center; justify-content: center; padding: 0 8px 5px; border-top-left-radius: 10px; border-top-right-radius: 10px; text-align: center; font-weight: var(--fw-bold); margin-bottom: 45px}
.all-sales{padding-top:var(--pt_45)}

@media (max-width:1100px){.mw-plan-slider .plan-container-4col{width:unset!important;}.mw-plan-slider{position:relative;display: block;}.mw-plan-slider .slick-track{display:flex;left: -10px;}.mw-plan-slider .plan-container{display:unset!important;}.mw-plan-slider .slick-list{overflow:hidden;padding-top:42px}.mw-plan-slider .plan-container-3col .plan-col{margin:10px!important}}.mw-plan-slider .slick-dots{bottom:20px;display:flex;justify-content:center;align-items: center;gap:10px;position:absolute;left:50%;transform:translateX(-50%);top:-40px;height: 30px;}.mw-plan-slider .slick-dots li{width:12px;height:12px;margin:0 5px}.mw-plan-slider .slick-dots li button{font-size:0;width:100%;height:100%;border-radius:50%;background-color:transparent;border:1px solid var(--azure_clr);padding:0;cursor:pointer;transition: .3s ease}.mw-plan-slider .slick-dots li.slick-active button{background-color:var(--azure_clr)}.mw-plan-slider .slick-dots li button:hover{background-color:var(--azure_clr)}
.mw-plan-slider .slick-slide{margin: 0 10px;}.mw-plan-slider .slick-slider{left: -4px;}.slick-slide img {display: unset;}.mw-plan-slider .slick-dots li.slick-active button::before {color: inherit;}
.mw-plan-slider .slick-dots li button::before {color: inherit;}@media(max-width:992px){.mw-plan-slider .slick-dots{top: -20px;}}
@media (max-width: 991px) {
  .plan-container-4col .plan-col {
    margin: 6px 0px 32px;
  }
}
@media(max-width:785px){.mw-plan-slider .slick-dots{top: -5px;}}@media(max-width:551px){.mw-plan-slider .slick-dots{top: 10px;}}
.mw-new-pln-next,.mw-new-pln-prev{position:absolute;top:50%;z-index:1;transform:translate(45%,-50%);font-size:22px;color:var(--azure_clr);background:0 0;border:0;cursor:pointer;outline:0;transition:all .3s ease-in-out}.mw-new-pln-prev{align-items:center;background:#fff;border-radius:50%;box-shadow:0 4px 16px #00000029;cursor:pointer;display:flex;height:46px;justify-content:center;width:46px;z-index:2;left:-12px;position:sticky;top:52vh;margin-left:-14px}.mw-new-pln-next{margin-left:calc(100% - -93vw);margin-top:-48px;align-items:center;background:#fff;border-radius:50%;box-shadow:0 4px 16px #00000029;cursor:pointer;display:flex;height:46px;justify-content:center;width:46px;z-index:2;left:-12px;position:sticky;top:52vh}.mw-new-pln-next:hover,.mw-new-pln-prev:hover{color:#4B43DD}.mw-arrows-wrapper{transition:all .3s ease;z-index:100;margin-bottom:100px;max-width:0;min-height:44%;overflow:visible;position:absolute;top:50%;left:0;right:0}@media(max-width:950px){.mw-arrows-wrapper{min-height:46%}.mw-new-pln-next{margin-left:calc(100vw - 75px)}}@media(max-width:680px){.mw-arrows-wrapper{min-height:46%}}@media(max-width:600px){.mw-arrows-wrapper{top:38%;min-height:54%}}
</style>
<style>
#tooltip{text-align: left;color: #f7fbff;background: #121E37;position: absolute;z-index: 100;padding: 20px 20px;cursor: pointer;font-size: 14px;line-height: 24px;font-weight: 400;border-radius: 5px;}
/* #tooltip:after{width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #121e37;content: '';position: absolute;left: 30%;top: -10px;margin-left: -10px;transform: rotate(180deg);} */
#tooltip.top:after {border-top-color: transparent;border-bottom: 10px solid #2f3c4b;top: -20px;bottom: auto;display:none;}
#tooltip.left:after {left: 10px;margin: 0;display:none;}
#tooltip.right:after {right: 10px;left: auto;margin: 0;display:none;}.tooltip_space {padding-bottom: 10px;}#tooltip::after {display:none;}

</style>