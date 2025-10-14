<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface CaseStudy {
  id: number
  name: string
  company: string
  imageDesktop: string
  imageMobile: string
  logo: string
  alt: string
  description: string
  stats: { value: string | number, label: string }[]
  link: string
}

const caseStudies = ref<CaseStudy[]>([
  {
    id: 1,
    name: 'Amnas Ahamed',
    alt: 'Amnas Ahamed | MilesWeb India',
    company: 'Claps Learn EdTech LLP',
    imageDesktop: '/assets/images/mw/case-study/amnas.avif',
    imageMobile: '/assets/images/mw/case-study-mob/amnas-ahamed.avif',
    logo: '/assets/images/mw/case-study/claps.svg',
    description: 'The setup process was astonishingly simple. There were no issues, and everything was accomplished efficiently by their expert migration team...',
    stats: [
      { value: '10x', label: 'Retention Increase' },
      { value: '25%', label: 'Increased Savings' }
    ],
    link: '/blog/client-stories/claps-learn-edtech-llp/'
  },
  {
    id: 2,
    name: 'Jaydev Solanki',
    alt: 'Jaydev Solanki | MilesWeb India',
    company: 'Search Minds Pvt. Ltd.',
    imageDesktop: '/assets/images/mw/case-study/jaydev-solanki.avif',
    imageMobile: '/assets/images/mw/case-study-mob/jaydev-solanki.avif',
    logo: '/assets/images/mw/case-study/searchminds.svg',
    description: 'I started my web hosting with MilesWeb 5 years ago. They have constantly offered the required speed, security, and support...',
    stats: [
      { value: '10x', label: 'Business Boost' },
      { value: '25%', label: 'Faster Website Performance' }
    ],
    link: '/blog/client-stories/search-minds-achieves-10x-business-boost/'
  },
  {
    id: 3,
    name: 'Gaurav Patil',
    alt: 'Gaurav Patil | MilesWeb India',
    company: 'Standard Wings Technologies',
    imageDesktop: '/assets/images/mw/case-study/gaurav-patil.avif',
    imageMobile: '/assets/images/mw/case-study-mob/gaurav-patil.avif',
    logo: '/assets/images/mw/case-study/standard-wings.svg',
    description: 'We’ve been with MilesWeb for quite a long time and we’re beyond satisfied. They cater to all our services in one place...',
    stats: [
      { value: '30%', label: 'Business Efficiency Gain' },
      { value: '99.9%', label: 'Reliable Hosting Uptime' }
    ],
    link: '/blog/client-stories/standard-wings-technologies/'
  },
  {
    id: 4,
    name: 'Rumy Sharma',
    alt: 'Rumy Sharma | MilesWeb India',
    company: 'TRF Studio',
    imageDesktop: '/assets/images/mw/case-study/rumy-sharma.avif',
    imageMobile: '/assets/images/mw/case-study-mob/rumy-sharma.avif',
    logo: '/assets/images/mw/case-study/trf-studio.svg',
    description: 'Milesweb’s dashboard is designed for all, not just tech experts. When I need more resources or want to add a feature...',
    stats: [
      { value: '70%', label: 'Improved Loading Speeds' },
      { value: '99.9%', label: 'Uptime Reliability' }
    ],
    link: '/blog/client-stories/trf-studio/'
  },
  {
    id: 5,
    name: 'Aatish Nair',
    alt: 'Aatish Nair | MilesWeb India',
    company: 'Aatish G Nair Ventures',
    imageDesktop: '/assets/images/mw/case-study/aatish-nair.avif',
    imageMobile: '/assets/images/mw/case-study-mob/aatish-nair.avif',
    logo: '/assets/images/mw/case-study/aatish-your-tech.svg',
    description: 'It was not only about cost-saving; it was about getting the right partner. My business needed a reliable hosting provider...',
    stats: [
      { value: '40%', label: 'Faster Load Times' },
      { value: '99.9%', label: 'Uptime Stability' }
    ],
    link: '/blog/client-stories/aatish-g-nair-ventures/'
  },
  {
    id: 6,
    name: 'Santanu Ganguly',
    alt: 'Santanu Ganguly | MilesWeb India',
    company: 'Coders Mind',
    imageDesktop: '/assets/images/mw/case-study/santanu-ganguly.avif',
    imageMobile: '/assets/images/mw/case-study-mob/santanu-ganguly.avif',
    logo: '/assets/images/mw/case-study/coders-mind.svg',
    description: 'My expectations were exceeded when I chose MilesWeb’s basic hosting plan. Later, I took their shared plans...',
    stats: [
      { value: '50%', label: 'Cost Savings' },
      { value: '100%', label: 'Elimination of Interruptions' }
    ],
    link: '/blog/client-stories/coders-mind/'
  },
  {
    id: 7,
    name: 'Akash Chitragar',
    alt: 'Akash Chitragar | MilesWeb India',
    company: 'WebArt4U',
    imageDesktop: '/assets/images/mw/case-study/akash-chitragar.avif',
    imageMobile: '/assets/images/mw/case-study-mob/akshay-chitragar.avif',
    logo: '/assets/images/mw/case-study/webart4u.svg',
    description: 'The support team are quick, expert, attentive, and always there to help. When your website is your virtual self...',
    stats: [
      { value: '60%', label: 'Faster Page Speeds' },
      { value: '3x', label: 'Traffic Growth' }
    ],
    link: '/blog/client-stories/webart4u/'
  }
])

const swiperModules = [Navigation, Autoplay]
</script>


<template>
<section>
  <div class="mw_results pt-60 pb-60">
    <div class="mw-container pt-10">
      <div class="mw-row mw-align-center pb-60 mw_results_ttl_row">
        <div class="mw_results_ttl_col title-center">
          <h2 class="mw-h2">Success stories of proven performance</h2>
          <p class="mw-p">
            We've helped thousands of businesses scale their online performance and reach new heights. Check them out.
          </p>
        </div>
      </div>
    </div>
    <div class="mw-swiper-outer">
            <button type="button" class="mw_results_prev" aria-label="Previous slide">
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7.5H1M1 7.5L7 1.5M1 7.5L7 13.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button type="button" class="mw_results_next" aria-label="Next slide">
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7.5H17M17 7.5L11 1.5M17 7.5L11 13.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <ClientOnly>
            <Swiper
                :modules="[Navigation]"
                :loop="true"
                :centered-slides="true"
                :space-between="24"
                :slides-per-view="'auto'"
                :navigation="{
                nextEl: '.mw_results_next',
                prevEl: '.mw_results_prev'
                }"
                :breakpoints="{
                0: { spaceBetween: 24 },
                768: { spaceBetween: 24 },
                1024: { spaceBetween: 24 }
                }"
                class="case-swiper"
            >
            <SwiperSlide v-for="study in caseStudies" :key="study.id" class="case-slide">
                <div class="mw_results_box">
                    <div class="mw-row">
                        <div class="mw-col-md-5 pb-md-24">
                            <div class="position-relative mw_results_user_img">
                                <img :src="study.imageDesktop" class="img-fluid mw_results_user_img_desktop" :alt="study.alt"  :title="study.alt"/>
                                <img :src="study.imageMobile" class="img-fluid mw_results_user_img_mob" :alt="study.alt"  :title="study.alt"/>
                                <div class="mw_results_user">
                                    <div class="mw-h4 fff pb-6" v-html="study.name"></div>
                                    <p class="mw-h3-p fff" v-html="study.company"></p>
                                </div>
                            </div>
                        </div>
                        <div class="mw-col-md-7">
                            <div class="mw_results_content pb-6">
                                <div class="mw_results_content2">
                                    <div class="pb-22">
                                        <img :src="study.logo" class="img-fluid" alt="" />
                                    </div>
                                    <p class="mw_results_user_p" v-html="study.description"></p>
                                    <div class="d-flex pt-30 pb-22">
                                        <div
                                            v-for="(stat, index) in study.stats"
                                            :key="index"
                                            class="mw_results_10x_col"
                                            :class="{ 'mw_results_10x_col2': index === 1 }"
                                            >
                                            <div class="mw_results_10x" v-html="stat.value"></div>
                                            <p class="mw_results_10x_p" v-html="stat.label"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="mw_results_btn">
                                    <a class="mw-btn mw-btn-gray" :href="study.link" target="_blank">Read Case Study</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            </Swiper>
        </ClientOnly>
    </div>
  </div>
</section>
</template>

<style scoped>
/* Outer wrapper hides unwanted overflow (prevents horizontal scrollbar) */
.mw_results {
  overflow: hidden;
}
.mw-swiper-outer {

  padding-bottom: 60px; /* space for navigation if needed */
  position: relative;
}

/* Swiper container: allow visible neighbouring slides */
.case-swiper {
  overflow: visible;               /* allow partial slides to show */
  padding-left: calc((100vw - 1008px) / 2);   /* <-- centers a 1008px slide in viewport */
  padding-right: calc((100vw - 1008px) / 2);
  box-sizing: content-box;
}

/* If you prefer centering relative to your container (e.g. mw-container width),
   change those paddings to calc((1200px - 1008px)/2) or remove calc and use values. */

/* The slide itself must be fixed width so peek effect works */
.case-slide {
  width: 1008px !important;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  transition: transform .28s ease
}

/* Active slide styling */
.swiper-slide-active {
  z-index: 3;
}

/* Style for card */
.case-card {
  width: 100%;
  display: flex;
  gap: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  overflow: hidden;
}

/* Left image column */
.case-left { width: 40%; position: relative; }
.case-img { width: 100%; height: 100%; object-fit: cover; display:block; }
.case-user { position: absolute; bottom: 18px; left: 18px; color: #fff; }

/* Right content column */
.case-right { width: 60%; padding: 32px; }

/* small tweaks for nav and preview look */

/* RESPONSIVE: on narrow screens make slide fluid and remove the big paddings */
@media (max-width: 1100px) {
  .case-swiper {
    padding-left: 24px;
    padding-right: 24px;
  }
  .case-slide { width: calc(100% - 48px) !important; } /* leave small side gutters */
  .case-card { flex-direction: column; }
  .case-left, .case-right { width: 100%; }
  .case-right { padding: 20px; }
}

/* MOBILE fallback */
@media (max-width: 640px) {
  .case-slide { width: 100% !important; }
  .case-card { border-radius: 12px; }
}

/* Case study block and responsive tweaks */
.mw_results{background:#f8f8ff;position:relative}
.mw_results_box{background:#fff;border:4px solid #f5f5f5;box-shadow:0 4px 24px rgba(0,0,0,.02);border-radius:24px;max-width:1008px;margin:0 auto;padding:24px}
.mw_results_user{position:absolute;bottom:26px;left:24px;right:4px}
.mw_results_user_p{font-size:20px;color:#667085;line-height:1.3}
.mw_results_user_img{overflow:hidden;border-radius:12px}
.mw_results_user_img img{border-radius:12px}
.mw_results_content{display:flex;flex-flow:column;justify-content:space-between;height:100%}
.mw_results_10x{font-size:32px;color:#101323;font-weight:600}
.mw_results_10x_p{font-size:16px;color:#101323;padding-top:4px}
.mw_results_10x_col{border-right:1px solid #f5f5f5;padding-right:24px;margin-right:24px}
.mw_results_ttl_row{justify-content:space-between}
.mw_results_slider1{margin:0 15px}

/* Navigation buttons: positioned inside the swiper outer container and visible at the bottom */
.mw_results_next, .mw_results_prev {
  position: absolute;
  bottom: -10px; /* keep buttons inside the visible area */
  z-index: 20;
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 48px;
  height: 48px;
  background: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0 4px 4px rgba(0,0,0,.06);
  border-radius: 56px;
  top: unset;
}
.mw_results_prev { left: calc(50% - 28px); }
.mw_results_next { left: calc(50% + 28px); }
.mw_results_next:active, .mw_results_next:hover, .mw_results_prev:active, .mw_results_prev:hover { background: var(--azure_clr); }
.mw_results_next svg, .mw_results_prev svg { stroke: #686D73; }
.mw_results_next:hover svg, .mw_results_prev:hover svg { stroke: #fff; }
.mw_results_user_img_jaydev2{display:none !important}

@media(max-width:1100px){
  .mw_results_box{max-width:870px}
  .mw_results_user_p{font-size:16px}
  .mw_results_10x{font-size:24px}
  .mw_results_10x_p{font-size:14px}
}
@media(max-width:991px){
  .mw_results_slider1{padding:0 30px;margin:0 auto}
}
@media(max-width:768px){
  /* move buttons closer to center for smaller screens */
  .mw_results_prev{ left:40%; }
  .mw_results_next{ left:50%; }
  .mw_results_ttl_col{text-align:left}
}
@media(max-width:600px){
  .mw_results_prev, .mw_results_next{ bottom: 12px; width:40px; height:40px; }
  .mw_results_prev{ left:40%; }
  .mw_results_next{ left:50%; }
  .mw_results_box{max-width: 330px;margin: 0 auto;padding:14px;}
  .mw_results_10x_col{padding-right:8px;margin-right: 15px;}
  .mw_results_slider1{padding:0 8px}
  .mw_results_user_img{height:230px;}
  .mw_our_box2_row{display:none;}
  .mw_results_user{bottom:16px;left:14px;}
  .mw_results_user_p{font-size: 14px;}
  .mw_results_content2> .pb-22{padding-bottom:4px;}
  .mw_results_content2> .pt-30{padding-top:10px;}
  .mw_results_btn{margin-top:8px;}
  .mw_results_user .mw-h4{padding-bottom:2px;}
  .mw_results_box .pb-md-24{padding-bottom:16px !important}
  .mw_results_user_img_jaydev2{display:block !important}
  .mw_results_user_img_jaydev1{display:none !important}
}
.mw_results_user_img_mob{display:none;}
@media(max-width:600px){
.mw_results_user_img_desktop{display:none }
.mw_results_user_img {height: auto;display:flex;align-items: center;}
.mw_results_user .fff{color: #101323 !important;}
.mw_results_user{position:unset;padding: 0px 0 0;}
.mw_results_user_img_mob{display:inline-block;padding-right:10px;}
}
@media(max-width:430px){
   .mw_results_prev{left: 38%;}
   .mw_results_next{left: 50%;}
}
@media(max-width:350px){
   .mw_results_prev{left: 30%;}
   .mw_results_next{left: 60%;}
}
</style>
