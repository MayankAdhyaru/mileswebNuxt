<template>
  <section class="mw-ban-dark-bg">
    <div class="mw-ban-container">
      <div class="mw-row mw-align-center">
        <!-- LEFT CONTENT -->
        <div class="mw-ban-col-7">
          <div class="mw-ban-content">
            <!-- Heading -->
            <div v-if="headingH1" class="mw-ban-ttl-h1 fff" v-html="headingH1"></div>
            <h1 v-else class="mw-ban-ttl fff">{{ heading }}</h1>

            <!-- Subheading -->
            <div class="mw-h1 fff" v-html="subheading"></div>

            <!-- Features List -->
            <div class="re-banner-list pt-25">
              <ul class="re-ban-list_1 mw-row p-0">
                <li v-for="(feature, i) in features" :key="i" class="mw-row-align">
                    <!-- If feature is an object with a `tip`, render Tooltip component -->
                    <component
                      v-if="feature && typeof feature === 'object' && feature.tip"
                      :is="Tooltip"
                      :tip="feature.tip"
                      :position="feature.position || 'bottom'"
                    >
                      {{ feature.text}}
                    </component>

                    <!-- Otherwise render plain text -->
                    <template v-else>
                      <span>{{ feature }}</span>
                    </template>
                </li>
              </ul>
            </div>

            <!-- Price Section -->
            <div v-if="showPrice" class="d-flex pt-22 pb-30 mw-align-center mw-ban-price-row">
              <div v-if="strikePrice" class="mw-ban-str-price">
                <span>
                    <i class="crncy_fas">{{currency}}</i>
                </span>{{ strikePrice }}/mo
              </div>
              <div class="mw-ban-price fff">
                <span>
                    <i class="crncy_fas">{{currency}}</i>
                </span>
                <b>{{ price }}</b>
                <div class="mw-ban-price1">{{ billingCycle }}</div>
              </div>
            </div>

            <!-- Free Months -->
            <div class="re_month_free pb-30 fff" v-if="freeMonthsText">
              {{ freeMonthsText }}
            </div>

            <!-- Buttons -->
            <div class="d-flex flex-wrap" :class="{ 'pt-45': !showPrice }">
              <span class="mw-btn jump-to-plans mw-ban-mr mw-ban-btn mw-btn-h">
                <span>{{ plansBtn }}</span>
              </span>

              <div v-if="showTimer" class="mw-ban-btn mw-ban-mr" id="mw-offer-timer">00 : 29 : 59</div>

              <a v-if="showFreeTrial" href="/hosting/dedicated-servers/free-trial" class="mw-ban-btn mw-ban-mr mw-ban-btn2">
                Free Trial
              </a>
            </div>

            <!-- Guarantee -->
            <div v-if="guarantee && guarantee.text" class="d-flex mw-align-center">
                <span class="mw-guarantee-icon">
                    <img
                    class="img-fluid no-hw-attribute"
                    width="18"
                    height="20"
                    src="/assets/images/banner-icons/check-money-back.svg"
                    :alt="`${guarantee.text}-day Money-Back Guarantee`"
                    fetchpriority="high"
                    decoding="async"
                    />
                </span>

                <div class="mw-ban-guarantee">
                    {{ guarantee.text }}-day
                    <component
                    :is="Tooltip"
                    :tip="guarantee.tip"
                    :position="guarantee.position || 'bottom'"
                    class="inline-block"
                    >
                    money-back
                    </component>
                    guarantee
                </div>
            </div>

          </div>
        </div>

        <!-- RIGHT IMAGE -->
        <div class="mw-ban-col-5 p-0 d-flex mw-d-none">
          <div class="mw-ban-img">
            <img class="img-fluid mw-ban-img-mobile" :src="bannerImage" :alt="bannerAlt" :title="bannerAlt"  fetchpriority="high" decoding="async" />
          </div>
        </div>
      </div>

      <!-- Partners -->
      <div class="mw_partners">
        <div class="mw_partners_ttl pb-45">
          Proudly Serving <b>{{ commonPayload.customerCount }}+</b> Customers
        </div>
        <div class="mw_partners_inner mw_partners_slider-animate" id="partner-slider">
          <img v-for="(partner, i) in partners" :key="i" class="img-fluid no-hw-attribute" :src="partner.src" :alt="partner.alt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Tooltip from '~/components/Tooltip.vue'
import { useCommon } from '~/composables/useCommon';
import { computed } from 'vue'

// fetch common API (may return either { common: {...} } or the raw object)
const { data: commonData, pending: commonPending, error: commonError } = await useAsyncData('common', () => $fetch('/api/common'))

const common = useCommon();

// unified payload: prefer API value (either wrapper or raw), otherwise fall back to injected common
const commonPayload = computed(() => {
  return (commonData?.value?.common ?? commonData?.value) || common || {}
})
defineProps({
// Heading: string for content, false to hide
  heading: { type: [String, Boolean], default: false },

  // Heading H1: string for content, false to hide
  headingH1: { type: [String, Boolean], default: false },

  // Subheading: string for content, false to hide
  subheading: { type: [String, Boolean], default: false },

  features: { type: Array, default: () => [] },
  currency: { type: String, default: "$" },

  // Strike price: string to show, false to hide
  strikePrice: { type: [String, Boolean], default: false },

  price: String,
  billingCycle: String,
  showPrice: { type: Boolean, default: true },
  freeMonthsText: String,
  plansBtn: { type: String, default: "View Plans" },

  showTimer: { type: Boolean, default: false },
  showFreeTrial: { type: Boolean, default: false },
 guarantee: { type: Object, default: () => ({}) },
  bannerImage: { type: String, default: "/assets/images/mw/best-web-hosting.gif" },
  bannerAlt: { type: String, default: "Best Web Hosting | MilesWeb India" },
  partners: {
    type: Array,
    default: () => [
      { src: "/assets/images/partners/balaji-dental.png", alt: "Balaji Dental" },
      { src: "/assets/images/partners/cd.png", alt: "cd" },
      { src: "/assets/images/partners/cyble.png", alt: "cyble" },
      { src: "/assets/images/partners/easygo.png", alt: "easygo" },
      { src: "/assets/images/partners/e-biotorium.png", alt: "E-Biotorium" },
      { src: "/assets/images/partners/izoo.png", alt: "Izoo" },
      { src: "/assets/images/partners/jipanditji.png", alt: "jipanditji" },
      { src: "/assets/images/partners/mobi.png", alt: "mobi" },
      { src: "/assets/images/partners/my-instituter.png", alt: "my-instituter" },
      { src: "/assets/images/partners/ninjanew.png", alt: "ninjanew" },
      { src: "/assets/images/partners/oyekudiye.png", alt: "oyekudiye" },
      { src: "/assets/images/partners/santushti.png", alt: "santushti" },
      { src: "/assets/images/partners/sr-thorat.png", alt: "sr-thorat" },
      { src: "/assets/images/partners/ticket-dekho.png", alt: "ticket-dekho" },
      { src: "/assets/images/partners/waaree.png", alt: "waaree" },
    ],
  },
})

</script>

