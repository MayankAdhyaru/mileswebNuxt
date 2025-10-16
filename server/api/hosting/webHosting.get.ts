export default defineEventHandler(async () => {
    // Fetch your common data
    const config = useRuntimeConfig();
const siteBase = config.public.siteBase;
    const common = await $fetch('/api/common').catch(() => ({}));
     function getDiscount(category, index = null) {
    const arr = (common.discounts?.[category]) || [];
    const cleaned = arr.filter(d => d && d !== '');
    if (index !== null) return cleaned[index] || '';
    const numbers = cleaned.map(d => parseInt(d)).filter(n => !isNaN(n));
    return numbers.length ? Math.max(...numbers) : '';
  }

  const pagePath = 'hosting/web-hosting';
  const discount = getDiscount('web_hosting'); // ✅ Now works!
    //   Meta Data For Page
    const head = {
        title: `Buy Web Hosting Services | Unlimited Bandwidth Hosting Plans`,
        description: "Get the best in web hosting with MilesWeb. Buy fast, secure, scalable web hosting services with 24/7 expert support. Ideal for businesses of all sizes.",
        ogTitle: `Buy Web Hosting Services | Unlimited Bandwidth Hosting Plans`,
        ogDescription: "Get the best in web hosting with MilesWeb. Buy fast, secure, scalable web hosting services with 24/7 expert support. Ideal for businesses of all sizes.",
        link: [
            { rel: "canonical", href: siteBase + pagePath },
            { rel: "alternate", href: "https://www.milesweb.com/" + pagePath, hreflang: "en-US" },
            { rel: "alternate", href: siteBase + pagePath, hreflang: "en-IN" },
            { rel: "alternate", href: "https://www.milesweb.co.uk/" + pagePath, hreflang: "en-GB" },
            { rel: "alternate", href: "https://www.milesweb.ae/" + pagePath, hreflang: "en-AE" },
            { rel : "preload",href:"/assets/images/web-hosting/unlimited-web-hosting-1760x1320.png",imagesrcset:"/assets/images/web-hosting/unlimited-web-hosting-320x240.avif 320w,/assets/images/web-hosting/unlimited-web-hosting-640x480.avif 640w, /assets/images/web-hosting/unlimited-web-hosting-762x571.avif 762w, /assets/images/web-hosting/unlimited-web-hosting-1280x930.avif 1280w, /assets/images/web-hosting/unlimited-web-hosting-1760x1320.avif 1760w",imagesizes:"(min-width: 860px) 50vw, (min-width: 616px) 50vw, 100vw"}
        ],
        // Styles are loaded per-layout (home layout injects newmain.css on mount).
        // Avoid injecting global layout CSS here to prevent duplicate/conflicting styles.
    };


    //   Hero Section Data
    const hero = {
  heading: ``,
  headingH1: `<h1>Buy Web Hosting</h1> - Up to <span>${discount}%</span> off`,
  subheading: `Trusted Web Hosting for Startups to Ecommerce`,

  // 🖼️ Image Data
  bannerAlt: "Buy Perfect Web Hosting Solution For Your Website | MilesWeb India",
  bannerImage: "/assets/images/web-hosting/unlimited-web-hosting-1760x1320.png",


  features: [
    "Free Domain and SSL",
    "Install WordPress in 1-click",
    {
      text: "24/7 Customer support",
      position: "right",
      tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/support.avif" alt="24/7 expert support | MilesWeb India" title="24/7 expert support | MilesWeb India" width="355" height="159" fetchpriority="high" decoding="async">Get real help, anytime! Our 24/7 expert support is available via live chat, email, and tickets—no chatbots, just real people.`
    }
  ],

  currency: common.currencySymbol,
  strikePrice: false,
  price: common.price?.web_2?.[1],
  billingCycle: "/mo",
  freeMonthsText: "+3 months free",
  showTimer: false,
  showFreeTrial: false,
  plansBtn: "See Plans & Prices",
  showPrice: true,

  guarantee: {
    text: 30,
    position: "bottom",
    tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/30-days.avif" alt="Money-Back Guarantee | MilesWeb" title="Money-Back Guarantee | MilesWeb" width="355" height="159">Customer satisfaction is our top priority here at MilesWeb! However, if something goes wrong, you can request a <b>refund within 30 days</b> of signup.`
  }
}

    const planHeading = {
        title:'Choose your web hosting plan',
        description:'<span>All plans include a 30-day risk-free trial.</span>'
    }


    return { hero, head, planHeading};
});
