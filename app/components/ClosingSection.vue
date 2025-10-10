<script setup>
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  alt: { type: String, required: true },
  btn: {
    type: Object,
    required: true,
    default: () => ({
      text: '',
      href: ''
    })
  }
});
</script>

<template>
  <section class="pt-45 pb-90 px-md-6">
    <div class="mw-container">
      <div class="mw-row mw-container mw_ready_box">
        <div class="mw-row mw-align-center">
          <!-- Left Column -->
          <div class="mw-col-lg-5 pr-16">
            <h2 class="fff mw-h2" v-html="props.title"></h2>
            <p class="mw-p" v-html="props.description"></p>

            <a v-if="props.btn.href" :href="props.btn.href" class="mw-btn">
              {{ props.btn.text }}
            </a>
            <span v-else class="mw-btn jump-to-plans">{{ props.btn.text }}</span>
          </div>

          <!-- Right Column -->
          <div class="mw-col-lg-7 mw_ready_col2 pt-lg-30">
            <img
              class="img-fluid"
              :src="props.image"
              :alt="props.alt"
              :title="props.alt"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.mw_ready_box{background:#020206;border-radius:24px;padding:0px 0px 0px 53px;position:relative;overflow:hidden;z-index:1}.mw_ready_col2 img{vertical-align:bottom}.mw_ready_col2{padding-right:0;text-align:right;}.mw_ready_box .mw-p{color:#d6d6d6;padding-bottom:40px}@media(max-width:1200px){.mw_ready_box .mw-p{padding-bottom:24px}}@media(max-width:991px){.mw_ready_col2 img{border-radius:20px;}.mw_ready_box{padding:46px 34px 16px}}@media(max-width:768px){.mw_ready_box{padding:28px 16px 14px}}@media(max-width:600px){.mw_ready_col2{display:none;}.mw_ready_box{padding:28px 16px;}}
</style>