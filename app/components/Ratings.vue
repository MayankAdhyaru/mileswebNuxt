<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Define a reactive variable to store API data
const commonPayload = ref({
  ratingSection: {
    showCode: false,
    wordpressHighlight: { show: false, title: '', icon: '' },
    trustpilot: { rating: 0, count: 0, url: '' },
    hostadvice: { rating: 0, count: 0, logo: '' },
    google: { rating: 0, count: 0, logo: '' }
  }
})

// Fetch API data on mounted
onMounted(async () => {
  try {
    const data = await $fetch('/api/common')
    // API returns { common: { ... } } structure
    if (data?.common?.ratingSection) {
      commonPayload.value = data.common
    }
  } catch (error) {
    console.error('Failed to fetch ratings:', error)
  }
})
</script>

<template>
  <div v-if="commonPayload.ratingSection.showCode" class="pt-90 mw-rating2">
    <div class="ho-rating-container">

      <!-- WordPress Highlight -->
      <div v-if="commonPayload.ratingSection.wordpressHighlight.show" class="title-center pb-45 ho-rating-cp-pb">
        <span class="ho-rating-wp">
          <img
            :src="commonPayload.ratingSection.wordpressHighlight.icon"
            class="img-fluid"
            loading="lazy"
            alt="WordPress Highlight"
            title="WordPress Highlight"
          />
        </span>
        <span class="ho-rating-wp-txt">
          <b v-html="commonPayload.ratingSection.wordpressHighlight.title"></b>
        </span>
      </div>

      <!-- Ratings Slider -->
      <div class="mw-row ho-rating-row mw-justify-center">
        <div class="mw-row ho-rating-slider mw-align-center">

          <!-- Trustpilot -->
          <div class="ho-rating-col">
            <div class="ho-rating">
              <div class="ho-trust-a">
                <a
                  :href="commonPayload.ratingSection.trustpilot.url"
                  target="_blank"
                  rel="noopener"
                >
                  <div>
                    <img
                      class="img-fluid"
                      loading="lazy"
                      src="/assets/images/hosting/trustpilot-five.svg"
                      width="220"
                      height="80"
                      alt="TrustScore"
                      title="TrustScore"
                    />
                  </div>
                  <div class="ho-rating-point">
                    TrustScore <b v-html="commonPayload.ratingSection.trustpilot.rating"></b>
                    <span>|</span>
                    <b v-html="commonPayload.ratingSection.trustpilot.count"></b> Reviews
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Hostadvice -->
          <div class="ho-rating-col">
            <div class="ho-rating pr-10">
              <div>
                <img
                  :src="commonPayload.ratingSection.hostadvice.logo"
                  class="img-fluid"
                  loading="lazy"
                  width="215"
                  height="65"
                  alt="Hostadvice"
                  title="Hostadvice"
                />
              </div>
              <div class="ho-rating-point">
                Rating: <b v-html="commonPayload.ratingSection.hostadvice.rating"></b> |
                <b v-html="commonPayload.ratingSection.hostadvice.count"></b> Reviews
              </div>
            </div>
          </div>

          <!-- Google -->
          <div class="ho-rating-col">
            <div class="ho-rating">
              <div>
                <img
                  :src="commonPayload.ratingSection.google.logo"
                  class="img-fluid"
                  loading="lazy"
                  width="215"
                  height="65"
                  alt="Google"
                  title="Google"
                />
              </div>
              <div class="ho-rating-point">
                Rating: <b v-html="commonPayload.ratingSection.google.rating"></b> |
                <b v-html="commonPayload.ratingSection.google.count"></b> Reviews
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.ho-rating-wp {
  display: inline-block;
  vertical-align: middle;
  padding-right: 2px;
}
.ho-rating-wp-txt {
  font-size: 18px;
  color: #123455;
}
.mw-rating2 {
  padding-top: 90px;
}
/* Add your other responsive styles here */
</style>
