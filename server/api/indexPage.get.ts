export default defineEventHandler(() => {
  const hero = {
    heading: `<h1>Web Hosting India</h1> - Up to  76% off`,
    headingH1: `<h1>Web Hosting India</h1> - Up to  76% off`,
    subheading: `<h2>Get fast and reliable hosting </h2> + Free domain`,
    features: [
      "Free SSL and website migration",
      "Free mailboxes and AI website builder",
      {
        text: '24/7 customer support',
        position: 'right',
        tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/support.avif" alt="24/7 expert support | MilesWeb India" title="24/7 expert support | MilesWeb India" loading="lazy" width="355" height="159">Get real help, anytime! Our 24/7 expert support is available via live chat, email, and tickets—no chatbots, just real people.`
      }
    ],
    currency: '₹',
    strikePrice: false,
    price: '149',
    billingCycle: '/mo',
    freeMonthsText: '+3 months free',
    showTimer: false,
    showFreeTrial: false,
    plansBtn: 'Start now',
    showPrice: true,
    guarantee: {
      text: 30,
      position: 'bottom',
      tip: `<img loading="lazy" class="img-fluid pb-10" src="/assets/images/mw/tooltip/30-days.avif" alt="Money-Back Guarantee | MilesWeb" title="Money-Back Guarantee | MilesWeb" width="355" height="159">Customer satisfaction is our top priority here at MilesWeb! However, if something goes wrong, you can request a <b>refund within 30 days</b> of signup.`
    }
  }

  return { hero }
})
