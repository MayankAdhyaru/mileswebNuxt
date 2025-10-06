<script setup>
import Hero from '~/components/Hero.vue'
import { useCommon } from '~/composables/useCommon';

const common = useCommon();
// SEO for this page
useHead({
  title: "India's Best Web Hosting Company | 76% OFF Web Hosting Services",
  meta: [
    { charset: "utf-8" },
    {
      name: "description",
      content: "Host smarter with India's best web hosting services. SSD NVMe storage, FREE AI website builder, Domain, SSL, migration & 24/7 support—all at affordable prices."
    },
    { name: "alexaVerifyID", content: "bwEf6ZuaKbJBtiD3eIlduiGJKLY" },

    { property: "og:title", content: "India's Best Web Hosting Company | 76% OFF Web Hosting Services" },
    { property: "og:site_name", content: "MilesWeb" },
    { property: "og:url", content: "https://www.milesweb.in" },
    { property: "og:description", content: "Host smarter with India's best web hosting services. SSD NVMe storage, FREE AI website builder, Domain, SSL, migration & 24/7 support—all at affordable prices." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://www.milesweb.in/assets/images/logo/milesweb-200x200.png" },

    { name: "viewport", content: "width=device-width, initial-scale=1.0" }
  ],
  link: [
    { rel: "canonical", href: "https://www.milesweb.in" },
    { rel: "alternate", href: "https://hi.milesweb.in", hreflang: "hi-IN" },
    { rel: "alternate", href: "https://www.milesweb.com", hreflang: "en-US" },
    { rel: "alternate", href: "https://www.milesweb.in", hreflang: "en-IN" },
    { rel: "alternate", href: "https://www.milesweb.co.uk", hreflang: "en-GB" },
    { rel: "alternate", href: "https://www.milesweb.ae/", hreflang: "en-AE" },
    { rel: "alternate", href: "https://www.milesweb.com", hreflang: "x-default" },
    { rel: "shortcut icon", href: "https://www.milesweb.in/img-assets/favicon.ico" }
  ]
})

// ✅ Inline data (instead of external file)
const hero = {
  heading: `<h1>Web Hosting India</h1> - Up to  ${common.getDiscount('web_hosting_discount')} off`,
  headingH1: `<h1>Web Hosting India</h1> - Up to  ${common.getDiscount('web_hosting_discount')} off`,
  subheading: "<h2>Get fast and reliable hosting </h2> + Free domain",
  features: [
    "Free SSL and website migration",
    "Free mailboxes and AI website builder",
    {
      text: '24/7 customer support',
      position: 'right',
      tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/support.avif" alt="24/7 expert support | MilesWeb India" title="24/7 expert support | MilesWeb India" loading="lazy" width="355" height="159">Get real help, anytime! Our 24/7 expert support is available via live chat, email, and tickets—no chatbots, just real people.`
    }
  ],
  currency: common.currencySymbol,
  strikePrice: false,
  price: common.price.web_2[1],
  billingCycle: "/mo",
  freeMonthsText: "+3 months free",
  showTimer: false,
  showFreeTrial: false,
  plansBtn: "Start now",
  showPrice: true,
guarantee: {
  text: 30,
  position: "bottom",
  tip: `<img loading="lazy" class="img-fluid pb-10"
             src="/assets/images/mw/tooltip/30-days.avif"
             alt="Money-Back Guarantee | MilesWeb"
             title="Money-Back Guarantee | MilesWeb"
             width="355" height="159">
        Customer satisfaction is our top priority here at MilesWeb!
        You can try our services with complete peace of mind!
        However, if something goes wrong, you can request a <b>refund within 30 days</b> of signup.`
}

}
</script>

<template>
  <div>
    <!-- Pass props to Hero.vue -->
    <Hero v-bind="hero" />


  </div>
</template>