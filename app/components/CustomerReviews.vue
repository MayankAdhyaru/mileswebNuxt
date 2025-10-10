<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// 🔹 Reviews data (simple & maintainable)
const reviews = [
  {
    day: '5 days ago',
    title: 'Exceptional hosting service',
    text: 'MilesWeb constantly delivers on their promises of uptime and excellent service. Their team handled everything with ease, and I couldn’t be more impressed with the service.',
    name: 'Vineet B',
    img: '/assets/images/hosting/vineet-b.png',
  },
  {
    day: '3 days ago',
    title: 'Superior Performance and Reliability',
    text: 'MilesWeb is a super-fast and reliably engineered host. For anyone who is serious about maintaining a powerful online presence, I surely recommend going with them.',
    name: 'Swagatika S',
    img: '/assets/images/hosting/swagatika-s.png',
  },
  {
    day: '2 days ago',
    title: 'Ideal for High-Growth Business Owners',
    text: 'With SSD NVMe storage, LiteSpeed servers, and an intuitive control panel, I maximize my online business presence with MilesWeb’s high-performance hosting plans.',
    name: 'Firos K',
    img: '/assets/images/hosting/firos-k.png',
  },
  {
    day: '10 days ago',
    title: 'Absolutely Love MilesWeb',
    text: 'Their tech support expertise is just unbelievable. I highly recommend MilesWeb to anyone looking for the most dependable hosting provider around.',
    name: 'Sbio S',
    img: '/assets/images/hosting/sbio-s.png',
  },
  {
    day: '3 days ago',
    title: 'Excellent support quality',
    text: 'I had an outstanding experience with the support team at MilesWeb! They resolved my issue swiftly and with professionalism.',
    name: 'Jaison J',
    img: '/assets/images/hosting/jaison-j.png',
  },
  {
    day: '2 days ago',
    title: 'Reliable and secure hosting',
    text: 'I receive reliable technical assistance and excellent security features from this web hosting company. Their user-friendly control panel makes my website management task hassle-free anytime.',
    name: 'Bhupendra M',
    img: '/assets/images/hosting/bhupendra-m.png',
  },
  {
    day: '12 days ago',
    title: 'Website running smoothly',
    text: 'Their high-quality servers, reliable customer support, and ample bandwidth consistently keep my website running smoothly.',
    name: 'Ravinder K.',
    img: '/assets/images/hosting/ravinder-k.png',
  },
  {
    day: '8 days ago',
    title: 'Delightful experience with MilesWeb',
    text: `MilesWeb's support is exceptional in multiple instances, they efficiently resolved issues during chat sessions, earning high praise from Australia.`,
    name: 'Paul Gibson',
    img: '/assets/images/hosting/paul-gibson.png',
  },
  {
    day: '6 days ago',
    title: 'Support team is superb',
    text: 'It was such a support team is superb. Their technical support is compelling supportive 24x7.',
    name: 'Mohammed Moizuddin',
    img: '/assets/images/hosting/mohammed-moizuddin.png',
  }
]

const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 700
}


onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <section class="sections-space">
    <div class="mw-container title-center pb-45">
      <h2 class="mw-h2">Hear what our customers have to say</h2>
      <p class="mw-p">We appreciate every word from our customers immensely.</p>
    </div>

    <!-- 💻 Dual Marquee (Desktop) -->
    <div v-if="!isMobile" class="mw_our_slider">
      <div class="marquee-container">
        <div class="marquee-row marquee-row-1">
            <div v-for="(review, i) in [...reviews, ...reviews]" :key="'r1-' + i" class="mw_our_slider1">
                <div class="mw_our_box">
                    <div class="mw_our_day">{{ review.day }}</div>
                    <div class="mw-h4 pb-16">{{ review.title }}</div>
                    <div class="mw-h3-p">{{ review.text }}</div>
                    <div class="d-flex pt-22 mw-align-center">
                        <img :src="review.img" :alt="review.name" width="54" height="54" loading="lazy" />
                        <div class="pl-16">
                        <div class="mw_our_name">{{ review.name }}</div>
                        <img
                            src="/assets/images/hosting/trust-star.svg"
                            alt="Trustpilot Stars"
                            width="92"
                            height="17"
                            loading="lazy"
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="marquee-row marquee-row-2">
          <div
            v-for="(review, i) in [...reviews, ...reviews]"
            :key="'r2-' + i"
            class="mw_our_slider1"
          >
          <div class="mw_our_box">
              <div class="mw_our_day">{{ review.day }}</div>
              <div class="mw-h4 pb-16">{{ review.title }}</div>
              <div class="mw-h3-p">{{ review.text }}</div>
              <div class="d-flex pt-22 mw-align-center">
                <img :src="review.img" :alt="review.name" width="54" height="54" loading="lazy" />
                <div class="pl-16">
                  <div class="mw_our_name">{{ review.name }}</div>
                  <img
                    src="/assets/images/hosting/trust-star.svg"
                    alt="Trustpilot Stars"
                    width="92"
                    height="17"
                    loading="lazy"
                  />
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 📱 Swiper (Mobile) -->
    <div v-else class="mw_our_slider">
      <Swiper
        :modules="[Pagination, Autoplay]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
      >
        <SwiperSlide v-for="(review, i) in reviews.slice(0, 6)" :key="i">
            <div class="mw_our_slider1">
                <div class="mw_our_box">
                    <div class="mw-review-box mw-mobile">
                      <div class="mw_our_day">{{ review.day }}</div>
                      <div class="mw-h4 pb-16">{{ review.title }}</div>
                      <div class="mw-h3-p">{{ review.text }}</div>
                      <div class="d-flex pt-22 mw-align-center">
                        <img :src="review.img" :alt="review.name" width="54" height="54" loading="lazy" />
                        <div class="pl-16">
                          <div class="mw_our_name">{{ review.name }}</div>
                          <img
                            src="/assets/images/hosting/trust-star.svg"
                            alt="Trustpilot Stars"
                            width="92"
                            height="17"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                </div>

            </div>
        </SwiperSlide>
      </Swiper>
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
</style>

