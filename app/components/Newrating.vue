<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

type RatingKey = 'trustpilot' | 'hostadvice' | 'google'

interface RatingItem {
  rating: number
  count: number
  url?: string
  logo?: string
  newlogo: string
  alt: string
}

interface RatingSection {
  showCode: boolean
  trustpilot: RatingItem
  hostadvice: RatingItem
  google: RatingItem
}

const commonPayload = ref<{ ratingSection: RatingSection }>({
  ratingSection: {
    showCode: false,
    trustpilot: { rating: 0, count: 0, url: '', logo: '', newlogo: '', alt: '' },
    hostadvice: { rating: 0, count: 0, logo: '', newlogo: '', alt: ''  },
    google: { rating: 0, count: 0, logo: '', newlogo: '', alt: ''  }
  }
})

onMounted(async () => {
  try {
    const data = await $fetch('/api/common')
    if (data?.common?.ratingSection) commonPayload.value = data.common
  } catch (err) {
    console.error('Failed to fetch ratings:', err)
  }
})

// Detect client & mobile
const isClient = ref(false)
const isMobile = ref(false)

function checkWidth() {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 660
  }
}

onMounted(() => {
  isClient.value = true
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWidth)
})

const ratingItems: RatingKey[] = ['trustpilot', 'hostadvice', 'google']
</script>

<template>
  <div class="pt-90 mw-rating2">
    <div class="ho-rating-container">
    <div class="mw-row ho-rating-row mw-justify-center mw-align-center" >
        <div class="mw-row ho-rating-slider mw-align-center position-relative">
            <ClientOnly>
        <div v-if="isClient && isMobile" class="custom-swiper relative">
          <!-- Custom Buttons -->
          <button class="mw-plan-prev">&#x276E;</button>
          <button class="mw-plan-next">&#x276F;</button>
      
          <Swiper
            :modules="[Navigation, Autoplay]"
            :space-between="12"
            :navigation="{ nextEl: '.mw-plan-next', prevEl: '.mw-plan-prev' }"
            :breakpoints="{ 0: { slidesPerView: 1 }, 602: { slidesPerView: 2 } }"
          >
            <SwiperSlide  v-for="(key, index) in ratingItems" :key="key">
              <div class="ho-rating-col" style="width: 100%; display: inline-block;">
                  <div class="ho-rating">
                    <div  class="d-flex mw_trust_row">
                        <div class="mw_trust_img">
                          <img
                            class="img-fluid"
                            :src="commonPayload.ratingSection[key].newlogo"
                            :alt="commonPayload.ratingSection[key].alt"
                            :title="commonPayload.ratingSection[key].alt"
                          />
                        </div>
                        <div class="ho-rating-point">
                          <b v-html="commonPayload.ratingSection[key].rating"></b>
                          <b>/5</b>
                          <span>&nbsp;|&nbsp;</span>
                          <b v-html="commonPayload.ratingSection[key].count"></b> Reviews
                        </div>
                    </div>
                  </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </ClientOnly>
      <!-- Mobile slider: only if client AND isMobile -->


      <!-- Desktop / larger screens: static row -->
        <div v-if="!isMobile" class="ho-rating-col" v-for="(key, index) in ratingItems" :key="key" :class="{'ho-rating-point-divider': index < 2}">
            <div class="ho-rating">
                <div class="d-flex mw_trust_row">
                    <div class="mw_trust_img">
                        <img
                            class="img-fluid"
                            :src="commonPayload.ratingSection[key].newlogo"
                            :alt="commonPayload.ratingSection[key].alt"
                            :title="commonPayload.ratingSection[key].alt"
                        />
                    </div>
                    <div class="ho-rating-point">
                        <b v-html="commonPayload.ratingSection[key].rating"></b>
                        <b>/5</b>
                        <span>&nbsp;|&nbsp;</span>
                        <b v-html="commonPayload.ratingSection[key].count"></b> Reviews
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.swiper-slide {
margin: 0 10px !important;
}
.swiper-button-disabled{
    color: #635CF785 !important;
}
.ho-rating-slider{overflow: hidden;}.ho-rating-slider .slick-dots{display:flex;justify-content:center;align-items: center;gap:10px;height: 30px;position: relative;}.ho-rating-slider .slick-dots li{width:8px;height:8px;margin:0 5px}.ho-rating-slider .slick-dots li button{font-size:0;width:100%;height:100%;border-radius:50%;background-color:#bfdefe;border:0;padding:0;cursor:pointer;transition:background-color .3s ease}.ho-rating-slider .slick-dots li.slick-active button{background-color:var(--azure_clr)}.ho-rating-slider .slick-dots li button:hover{background-color:#4B43DD}.mw-plan-next,.mw-plan-prev{width:auto;position:absolute;top:50%;z-index:2;transform: translate(50%,-50%);font-size:22px;color:var(--azure_clr);background:0 0;border:0;cursor:pointer;outline:0;}.mw-plan-prev{left: 18px !important;transform: translate(-50%,-50%)}.mw-plan-next{right:18px}.mw-plan-next:hover,.mw-plan-prev:hover{color:#4B43DD}.ho-rating-slider .slick-slide{margin: 0 10px;}.ho-rating-slider .slick-slider{left: -4px;}.slick-slide img {display: unset;}.ho-rating-slider .slick-dots li.slick-active button::before {color: inherit;}  .ho-rating-slider .slick-track{padding-bottom: 10px;}
.ho-rating-slider .slick-dots li button::before {color: inherit;}
</style>