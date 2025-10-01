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
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Price Section -->
            <div v-if="showPrice" class="d-flex pt-22 pb-30 mw-align-center mw-ban-price-row">
              <div v-if="strikePrice" class="mw-ban-str-price">
                <span>{{ currency }}</span>{{ strikePrice }}/mo
              </div>
              <div class="mw-ban-price fff">
                <span>{{ currency }}</span>
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
            <div v-if="guarantee === '30'" class="d-flex mw-align-center">
              <span class="mw-guarantee-icon">
                <img
                  class="img-fluid no-hw-attribute"
                  width="18"
                  height="20"
                  src="/assets/images/banner-icons/check-money-back.svg"
                  alt="30-day Money-Back Guarantee"
                />
              </span>
              <div class="mw-ban-guarantee">30-day money-back guarantee</div>
            </div>

            <div v-if="guarantee === '7'" class="d-flex mw-align-center">
              <span class="mw-guarantee-icon">
                <img
                  class="img-fluid no-hw-attribute"
                  width="18"
                  height="20"
                  src="/assets/images/banner-icons/check-money-back.svg"
                  alt="7-day Money-Back Guarantee"
                />
              </span>
              <div class="mw-ban-guarantee">7-day money-back guarantee</div>
            </div>
          </div>
        </div>

        <!-- RIGHT IMAGE -->
        <div class="mw-ban-col-5 p-0 d-flex mw-d-none">
          <div class="mw-ban-img">
            <img class="img-fluid mw-ban-img-mobile" :src="bannerImage" alt="Hero Image" />
          </div>
        </div>
      </div>

      <!-- Partners -->
      <div class="mw_partners">
        <div class="mw_partners_ttl pb-45">
          Proudly Serving <b>60,000+</b> Customers
        </div>
        <div class="mw_partners_inner mw_partners_slider-animate" id="partner-slider">
          <img v-for="(partner, i) in partners" :key="i" class="img-fluid no-hw-attribute" :src="partner.src" :alt="partner.alt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
// Heading: string for content, false to hide
  heading: { type: [String, Boolean], default: false },

  // Heading H1: string for content, false to hide
  headingH1: { type: [String, Boolean], default: false },

  // Subheading: string for content, false to hide
  subheading: { type: [String, Boolean], default: false },

  features: { type: Array, default: () => [] },
  currency: { type: String, default: "₹" },

  // Strike price: string to show, false to hide
  strikePrice: { type: [String, Boolean], default: false },

  price: String,
  billingCycle: String,
  showPrice: { type: Boolean, default: true },
  freeMonthsText: String,
  plansBtn: { type: String, default: "View Plans" },

  showTimer: { type: Boolean, default: false },
  showFreeTrial: { type: Boolean, default: false },
  guarantee: { type: String, default: "30" },
  bannerImage: { type: String, default: "/assets/images/mw/best-web-hosting.gif" },
  partners: {
    type: Array,
    default: () => [
      { src: "/assets/images/mw/partners/cyble.avif", alt: "cyble" },
      { src: "/assets/images/mw/partners/easygo.avif", alt: "easygo" },
      { src: "/assets/images/mw/partners/e-biotorium.avif", alt: "e-biotorium" },
      { src: "/assets/images/mw/partners/expressin.avif", alt: "expressin" },
      { src: "/assets/images/mw/partners/grown-dimond.avif", alt: "grown-dimond" },
      { src: "/assets/images/mw/partners/izoo.avif", alt: "izoo" },
      { src: "/assets/images/mw/partners/mobi.avif", alt: "mobi" },
      { src: "/assets/images/mw/partners/my-instituter.avif", alt: "my-instituter" },
      { src: "/assets/images/mw/partners/santushti.avif", alt: "santushti" },
      { src: "/assets/images/mw/partners/shanti-junior.avif", alt: "shanti-junior" },
      { src: "/assets/images/mw/partners/sr-thorat.avif", alt: "sr-thorat" },
      { src: "/assets/images/mw/partners/searchengine.avif", alt: "searchengine" },
      { src: "/assets/images/mw/partners/ticket-dekho.avif", alt: "ticket-dekho" },
      { src: "/assets/images/mw/partners/waaree.avif", alt: "waaree" },
      { src: "/assets/images/mw/partners/rootvital.avif", alt: "rootvital" },
    ],
  },
})

</script>

<style>
.mw-ban-dark-bg{background:url('/assets/images/mw/hero-bg.png') center center no-repeat;background-size:cover;padding:26px 0 70px}.mw-ban-str-price{color:#b2b2b2!important;text-decoration-color:#B2B2B2!important}.ttl-ttp{font-size:unset}.mw-ban-price b,.mw-h1{font-weight:var(--fw-semi-bold)}.mw-ban-guarantee,.re-ban-list_1 li span{color:#fff}.mw-h1 .mw-hov-tooltip-btn{border:none;line-height:normal}.mw-dark-menu.na-menu-fix{background:#060815}.mw-dark-menu .re-ban-list_1 li span{font-weight:300;color:#fff}.mw-dark-menu .mw-menu{background:#060815!important}.mw-dark-menu .mw-menu-logo-1{display:none!important}.mw-dark-menu .mw-menu-logo-1.mw-menu-logo-2{display:none!important}.mw-dark-menu .mw-menu-logo-1.mw-menu-logo-2{display:block!important}.mw-dark-menu .mw-menu-tabs:hover::after{background:#252733}.mw-dark-menu .mw-navigation-toggle span{border-color:#fff!important}.mw-dark-menu .mw-menu-tabs{color:#fff!important}.mw-dark-menu .mw-menu-tab-dwn svg path{stroke:#fff!important}.mw-dark-menu{color:#fff}.mw-dark-menu .mw-menu-login{color:#fff;border-color:#fff}.mw-dark-menu .mw-menu-login:hover{background:#252733;border-color:#fff}.mw-menu-login{color:var(--ttl_clr);border-color:var(--ttl_clr)}.mw-menu-login:hover{background:#f0f0ff;border-color:#252733}.mw-dark-menu .mw-menu-logo-2{display:none}.mw-menu-logo-2{display:none}@media(max-width:1140px){.mw-dark-menu .mw-navigation-show-ul{background:#060815}.mw-dark-menu .mw-menu-active .mw-menu-tabs,.mw-dark-menu .mw-menu-tabs:hover{background:#312e42}.mw-dark-menu .mw-submenu{background:#060815}.mw-dark-menu .mw-sub-content-lnk{color:#fff}.mw-dark-menu .mw_user_icon{border-color:#fff!important;color:#fff!important}.mw-dark-menu .mw-sub-content-li p{color:#cecbd8}.mw-dark-menu .mw-sub-content-li:hover{background:#160f3c}.mw-dark-menu .mw-sub-content-li:hover{background:#1b1136!important}.mw-dark-menu .mw_user_icon:hover{background:#312e42!important;border-color:#fff!important}.mw_user_icon:hover{background:#f0f0ff}}#mw-offer-timer{display:none}.mw-tooltip-text{color:var(--ttl_clr)!important}@media(max-width:1024px){.mw-ban-dark-bg{padding-top:0}}@media(max-height:768px) and (min-width:1250px){.mw-ban-dark-bg{padding-top:20px;}.mw-ban-img{max-width:600px}}@media(max-height:650px) and (min-width:1250px){.mw-ban-container{padding-top:12px}.mw-ban-price-row{padding:12px 0 32px}.re_month_free{padding-bottom:20px}}
.mw_partners_ttl{font-weight:500;font-size:18px;color:#bfc0ca}.mw_partners_ttl b{color:#fff}.mw_partners{overflow:hidden;position:relative;margin-top:116px}.mw_partners:hover .mw_partners_inner{animation-play-state:paused}.mw_partners_inner{display:flex;will-change:transform}.mw_partners_slider-animate{animation:35s slide infinite linear;-webkit-animation:35s slide infinite linear}.mw_partners_inner img{margin:0 24px;flex-shrink:0}@media (max-width:1024px){.mw_partners{margin-top:52px}}@media (max-width:991px){.mw_partners_inner img{max-width:160px}}@media (max-width:600px){.mw_partners_inner img{margin:0 14px}.mw_partners_ttl{font-size:14px}}.mw-ban-ttl-h1 h1 ,.mw-h1 h2{font-size: inherit;font-weight: inherit;display: inline;color: inherit;margin: 0;}
@keyframes slide {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
@-webkit-keyframes slide {
  from {
    -webkit-transform: translate3d(0, 0, 0);
  }
  to {
    -webkit-transform: translate3d(-50%, 0, 0);
  }
}


</style>
