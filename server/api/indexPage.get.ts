export default defineEventHandler(async () => {
    // Fetch your common data
    const common = await $fetch('/api/common').catch(() => ({}));

    //   Meta Data For Page
    const head = {
        title: `India's Best Web Hosting Company | ${common.getDiscount?.('web_hosting') || '76'}% OFF Web Hosting Services`,
        description: "Host smarter with India's best web hosting services. SSD NVMe storage, FREE AI website builder, Domain, SSL, migration & 24/7 support—all at affordable prices.",
        ogTitle: `India's Best Web Hosting Company | ${common.getDiscount?.('web_hosting') || '76'}% OFF Web Hosting Services`,
        ogDescription: "Host smarter with India's best web hosting services. SSD NVMe storage, FREE AI website builder, Domain, SSL, migration & 24/7 support—all at affordable prices.",
        link: [
            { rel: "canonical", href: "https://www.milesweb.in" },
            { rel: "alternate", href: "https://hi.milesweb.in", hreflang: "hi-IN" },
            { rel: "alternate", href: "https://www.milesweb.com", hreflang: "en-US" },
            { rel: "alternate", href: "https://www.milesweb.in", hreflang: "en-IN" },
            { rel: "alternate", href: "https://www.milesweb.co.uk", hreflang: "en-GB" },
            { rel: "alternate", href: "https://www.milesweb.ae/", hreflang: "en-AE" },
        ]
    };


    //   Hero Section Data
    const hero = {
        heading: `<h1>Web Hosting India</h1> - Up to ${common.getDiscount?.('web_hosting') || '76'}% off`,
        headingH1: `<h1>Web Hosting India</h1> - Up to ${common.getDiscount?.('web_hosting') || '76'}% off`,
        subheading: `<h2>Get fast and reliable hosting </h2> + Free domain`,
        features: [
            "Free SSL and website migration",
            "Free mailboxes and AI website builder",
            {
                text: '24/7 customer support',
                position: 'right',
                tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/support.avif" alt="24/7 expert support | MilesWeb India" title="24/7 expert support | MilesWeb India" width="355" height="159">Get real help, anytime! Our 24/7 expert support is available via live chat, email, and tickets—no chatbots, just real people.`
            }
        ],
        currency: common.currencySymbol || '₹',
        strikePrice: false,
        price: common.price?.web_2?.[1] || '149',
        billingCycle: '/mo',
        freeMonthsText: '+3 months free',
        showTimer: false,
        showFreeTrial: false,
        plansBtn: 'Start now',
        showPrice: true,
        guarantee: {
            text: 30,
            position: 'bottom',
            tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/30-days.avif" alt="Money-Back Guarantee | MilesWeb" title="Money-Back Guarantee | MilesWeb" width="355" height="159">Customer satisfaction is our top priority here at MilesWeb! However, if something goes wrong, you can request a <b>refund within 30 days</b> of signup.`
        }
    };

    return { hero, head };
});
