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

    const migration = {
        title : 'Free website migration, fully managed by Us',
        description : 'Our experts handle the technical aspects of moving your website, with data security at the utmost priority. So sit back and enjoy a stress-free transition to our platform without any additional costs.',
        image : '/assets/images/mw/migration.gif',
        alt: 'Free website migration, fully managed by Us | MilesWeb India',
        btn:{
            text:'Migrate now!',
            link:''
        }
    }

    const whyChoose = {
        title : 'Web hosting that works for you: Our unstoppable platform!',
        description : 'The all-in-one web hosting solution is designed for speed, security, and the unique needs of the Indian market.',
        btn:{
            text:'Get Started',
            link:''
        },
        image:'/assets/images/mw/smart-hosting.gif',
        alt:'Smart Hosting. Smarter Growth | MilesWeb India',
        features:[
            {
                title:'Always secure with free SSL',
                description:'Instantly protect your site and your visitors with our free SSL certificates.',
                icons:{
                    path:'/assets/images/mw/security.png',
                    alt:'Always secure with free SSL | MilesWeb India'
                }
            },
            {
                title:'All-in-one hosting toolkit',
                description:'Everything you need in one dashboard without extra plugins or costs.',
                icons:{
                    path:'/assets/images/mw/toolkit.png',
                    alt:'All-in-one hosting toolkit | MilesWeb India'
                }
            },
            {
                title:'Zero-risk guarantee',
                description:`Try us for 30 days and if you're not 100% satisfied, get your money back.`,
                icons:{
                    path:'/assets/images/mw/security.png',
                    alt:'Zero-risk guarantee | MilesWeb India'
                }
            },
        ]
    }

    const productAndServices = {
        title: 'Our high-grade, performance-powered products and services',
        description: '',
        tabs:[
            {
                text:'Cloud Hosting',
                image:'/assets/images/mw/cloud.svg',
                alt:'Cloud Hosting | MilesWeb India',
            },
            {
                text:'Business Email',
                image:'/assets/images/mw/business-tab.svg',
                alt:'Business Email | MilesWeb India',
            },
            {
                text:'Website Builder',
                image:'/assets/images/mw/builder-tab.svg',
                alt:'Website Builder | MilesWeb India',
            },
            {
                text:'Domain',
                image:'/assets/images/mw/domain-tab.svg',
                alt:'Domain | MilesWeb India',
            }
        ],
        tabsContent:[
            {
                text:'Fully optimized cloud hosting',
                description:'Our feature-rich cloud hosting plans optimally offer top-tier server specs and high uptime to ensure peak performance for your website around the clock.',
                btn: {
                    text: 'View plans',
                    link: '/hosting/cloud-hosting/',
                },
                image:'/assets/images/mw/cloud-hosting.gif',
                alt:'Fully optimized cloud hosting | MilesWeb India',
            },
            {
                text:'Professional email that grows with your business.',
                description:'Get custom business emails that match your brand and align with your domain.',
                btn: {
                    text: 'Get Started',
                    link: '/business-email',
                },
                image:'/assets/images/mw/business-email.gif',
                alt:'Professional email that grows with your business | MilesWeb India',
            },
            {
                text:'Build a professional website in minutes.',
                description:'Our AI website builder designs your site for a simplified online journey.',
                btn: {
                    text: 'Build with AI',
                    link: '/ai-website-builder',
                },
                image:'/assets/images/mw/website-builder.gif',
                alt:'Build a professional website in minutes | MilesWeb India',
            },
            {
                text:'A dream domain for a strong web presence.',
                description:'Our AI domain generator finds you the ideal domain name in seconds.',
                btn: {
                    text: 'Get Your Domain',
                    link: '/domains/',
                },
                image:'/assets/images/mw/domain.gif',
                alt:'A dream domain for a strong web presence | MilesWeb India',
            }
        ]
    }
    const PowerHouse = {
        title:'MilesWeb: India’s web hosting powerhouse',
        description:'Everything you need to build, grow, and scale your online presence with confidence.',
        features:[
            {
                title:'High-speed hosting',
                description:'Boost your site’s loading speed with advanced LiteSpeed servers and LSCache technology.',
                btn:{
                    text:'Get Started',
                    link:''
                },
                list:[],
                image:{
                    path:'/assets/images/mw/speed.svg',
                    path2:'/assets/images/mw/speed-grid.png',
                    alt:'High-speed hosting | MilesWeb India'
                }
            },
            {
                title:'Top website performance metrics',
                description:'Real-time insights into website loading speed',
                btn:{
                    text:'Get Started',
                    link:''
                },
                list:[
                    'Blazing fast TTFB (Time to First Byte)',
                    'Maximized sales and  conversion rates',
                    'Top-notch SSD NVMe storage drives'

                ],
                image:{
                    path:'/assets/images/mw/performance.svg',
                    path2:'/assets/images/mw/uptime.png',
                    alt:'Top website performance metrics | MilesWeb India'
                }
            },
            {
                title:'Hosting that drives business growth',
                description:'Speed-optimized hosting improves engagement and search rankings.',
                btn:{
                    text:'',
                    link:''
                },
                list:[
                    'Sub-2.5s LCP, for instant user experience.',
                    'Near-zero CLS for a stable, professional site.',
                    '100ms INP for a responsive site'

                ],
                image:{
                    path:'/assets/images/mw/drive.svg',
                    path2:'/assets/images/mw/core-web.png',
                    alt:'Hosting that drives business growth | MilesWeb India'
                }
            },
            {
                title:'Game-Changer for Speed!',
                description:'Experience next-level speed and performance built for high-traffic websites.',
                btn:{
                    text:'',
                    link:''
                },
                list:[
                    '“ Our website now delivers twice the speed, ensuring a faster, smoother, and more seamless experience. “',
                    'Gaurav Patil',
                    'Director. Standard Wings Technologies.',
                ],
                image:{
                    path:'/assets/images/mw/gaurav-patil.png',
                    alt:'High-speed hosting | MilesWeb India'
                }
            }

        ]
    }

    return { hero, head, support, mpanel, migration, whyChoose, productAndServices, PowerHouse};
});
