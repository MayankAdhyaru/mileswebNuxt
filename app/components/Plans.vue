<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

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
    tooltipEl.remove()
    tooltipEl = null
    targetEl = null
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
    target.removeEventListener('mouseenter', target._tooltipHandler)
    target._tooltipHandler = () => {
      targetEl = target
      createTooltip(target)
    }
    target.addEventListener('mouseenter', target._tooltipHandler)
  })
}

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

    <div ref="containerRef" class="plan-container plan-container-4col mw-justify-center mw-plan-slider" :class="{'mvh-plan-container-active' : showHiddenAll}">
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
    .plan_new_shadow{margin-top:-88px;}
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
</style>
<style>
#tooltip{text-align: left;color: #f7fbff;background: #121E37;position: absolute;z-index: 100;padding: 20px 20px;cursor: pointer;font-size: 14px;line-height: 24px;font-weight: 400;border-radius: 5px;}
/* #tooltip:after{width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #121e37;content: '';position: absolute;left: 30%;top: -10px;margin-left: -10px;transform: rotate(180deg);} */
#tooltip.top:after {border-top-color: transparent;border-bottom: 10px solid #2f3c4b;top: -20px;bottom: auto;display:none;}
#tooltip.left:after {left: 10px;margin: 0;display:none;}
#tooltip.right:after {right: 10px;left: auto;margin: 0;display:none;}.tooltip_space {padding-bottom: 10px;}#tooltip::after {display:none;}
</style>