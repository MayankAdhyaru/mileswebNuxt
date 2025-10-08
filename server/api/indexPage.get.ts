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
        bannerAlt:"India's Best Web Hosting Company | MilesWeb India",
        bannerImage:"/assets/images/mw/best-web-hosting.gif",
        features: [
            "Free SSL and website migration",
            "Free mailboxes and AI website builder",
            {
                text: '24/7 customer support',
                position: 'right',
                tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/support.avif" alt="24/7 expert support | MilesWeb India" title="24/7 expert support | MilesWeb India" width="355" height="159" fetchpriority="high" decoding="async">Get real help, anytime! Our 24/7 expert support is available via live chat, email, and tickets—no chatbots, just real people.`
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

    // Support Section data
    const support = {
        title: 'Get dependable business hosting with 24/7 support.',
        description:'From 24/7 bilingual support to lightning-fast servers everything’s handled for you, stress-free.',
        image:"/assets/images/mw/support.gif",
        alt: "Real human support | MilesWeb India",
        feature:{
            title:"Real human support",
            description:"No chat-bots, get expert solutions from our professionals with high-end security.",
            image:"/assets/images/mw/support.png",
            alt: "Real human support | MilesWeb India"
        },
        feature2:{
            title:"Fully managed WordPress",
            description:"We handle all the technical details so you can focus on your content.",
            image:"/assets/images/mw/toolkit.png",
            alt: "Fully managed WordPress | MilesWeb India"
        },
        btn:{
            text:"Connect with experts",
            link:"javascript:void(Tawk_API.toggle())"
        }
    }

    const mpanel = {    
        title: 'Refined mPanel for seamless hosting management',
        description:'MilesWeb offers you an entire hosting toolkit in one intuitive dashboard.',
        image:'/assets/images/mw/mpanel.png',
        alt: 'Refined mPanel for seamless hosting management | MilesWeb India',
        feature:{
            title:"Unified dashboard",
            description:"Manage all your domains and websites from a single, intuitive control panel.",
            image:"/assets/images/mw/domain-control.svg",
            alt: "Unified dashboard | MilesWeb India"
        },
        feature2:{
            title:"Performance monitoring",
            description:"Get real-time insights into your site's performance with a dedicated speed score.",
            image:"/assets/images/mw/build.svg",
            alt: "Performance monitoring | MilesWeb India"
        },
        feature3:{
            title:"Comprehensive tools",
            description:"Manage your files, databases, and WordPress installation all from one dashboard.",
            image:"/assets/images/mw/tools.svg",
            alt: "Comprehensive tools | MilesWeb India"
        },
        feature4:{
            title:"Seamless email setup",
            description:"Create and manage all your <a class='aclr2' href='/professional-email'>professional email</a> accounts with ease.",
            image:"/assets/images/mw/email.svg",
            alt: "Seamless email setup | MilesWeb India"
        },
        btn:{
            text:"Get Started Now",
        }

    }

    return { hero, head, support, mpanel};
});
