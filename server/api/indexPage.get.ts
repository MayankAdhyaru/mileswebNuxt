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

  const discount = getDiscount('web_hosting'); // ✅ Now works!
    //   Meta Data For Page
    const head = {
        title: `India's Best Web Hosting Company | ${discount}% OFF Web Hosting Services`,
        description: "Host smarter with India's best web hosting services. SSD NVMe storage, FREE AI website builder, Domain, SSL, migration & 24/7 support—all at affordable prices.",
        ogTitle: `India's Best Web Hosting Company | ${discount}% OFF Web Hosting Services`,
        ogDescription: "Host smarter with India's best web hosting services. SSD NVMe storage, FREE AI website builder, Domain, SSL, migration & 24/7 support—all at affordable prices.",
        link: [
            { rel: "canonical", href: siteBase },
            { rel: "alternate", href: "https://hi.milesweb.in", hreflang: "hi-IN" },
            { rel: "alternate", href: "https://www.milesweb.com", hreflang: "en-US" },
            { rel: "alternate", href: siteBase, hreflang: "en-IN" },
            { rel: "alternate", href: "https://www.milesweb.co.uk", hreflang: "en-GB" },
            { rel: "alternate", href: "https://www.milesweb.ae/", hreflang: "en-AE" },
        ]
    };


    //   Hero Section Data
    const hero = {
        heading: `Up to ${discount}% Off <h1>Web Hosting India</h1>`,
        headingH1: `Up to ${discount}% Off <h1>Web Hosting India</h1>`,
        subheading: `<h2>MilesWeb — Where India hosts its websites</h2>`,
        bannerAlt:"India's Best Web Hosting Company | MilesWeb India",
        bannerImage:"/assets/images/mw/best-web-hosting.gif",
        features: [
            "Get a free .COM domain and SSL",
            "Free emails and website migration",
            "24/7 customer support",
            // {
            //     text: '24/7 customer support',
            //     position: 'right',
            //     tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/support.avif" alt="24/7 expert support | MilesWeb India" title="24/7 expert support | MilesWeb India" width="355" height="159" fetchpriority="high" decoding="async">Get real help, anytime! Our 24/7 expert support is available via live chat, email, and tickets—no chatbots, just real people.`
            // }
        ],
        currency: common.currencySymbol,
        strikePrice: false,
        price: common.price?.web_2?.[1],
        billingCycle: '/mo',
        freeMonthsText: '+3 months free',
        showTimer: false,
        showFreeTrial: false,
        plansBtn: 'See Plans & Prices',
        showPrice: true,
        guarantee: {
            text: 30,
            position: 'bottom',
            tip: `<img class="img-fluid pb-10" src="/assets/images/mw/tooltip/30-days.avif" alt="Money-Back Guarantee | MilesWeb" title="Money-Back Guarantee | MilesWeb" width="355" height="159">Customer satisfaction is our top priority here at MilesWeb! However, if something goes wrong, you can request a <b>refund within 30 days</b> of signup.`
        }
    };
    const planHeading = {
        title:'Choose your web hosting plan',
        description:'<span>All plans include a 30-day risk-free trial.</span>'
    }

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

       const faqs = {
        title: `Your web hosting questions answered`,
        description:`Got questions about our web hosting services? You'll find answers to the most common queries here.`,
        faqlist:[
            {
                question:`Where is MilesWeb based?`,
                answer:`<p>Founded in 2012, MilesWeb is an Indian web hosting company headquartered in Nashik, Maharashtra. We provide best web hosting services globally with data centers in six countries including, India, the USA, the UK, Canada, Australia and Singapore. We are proud to be one of the top-rated hosts in the industry and are dedicated to raising the bar every day. You can learn more <a class='aclr' target='_blank' href='/about-us.php'>about us</a>.</p>`
            },
            {
                question:`What features do I get with web hosting?`,
                answer:`<p>Our web hosting plans offer everything you need to start and succeed online. You get superfast and highly reliable web hosting services with impactful features such as NVMe storage, control panel and WordPress 1-click installer. A <a class='aclr' href='/domains/free-domain'>free domain</a>, website builder, and backups are included too. We provide 24/7 support to help you with any of your concerns related to web hosting.</p>`
            },
            {
                question:`How is MilesWeb's technical support?`,
                answer:`<p>MilesWeb has proved itself as an award-winning web hosting provider with a stellar customer service record. The testimony is $ReviewCount positive customer reviews and ratings on major review sites like Google, Trustpilot, HostAdvice, HostReview, G2 and Serchen.</p><p>Additionally, you can check out our blogs, guides, and video tutorials that will help you gain insights and troubleshoot issues independently.</p>`
            },
            {
                question:`Can I migrate my website to MilesWeb?`,
                answer:`<p>Yes! <a href='/hosting/website-migration' class='aclr'>Website migration</a> is absolutely a breeze with us! Our dedicated migration team will help you migrate your website from another hosting provider to MilesWeb at no extra cost. We ensure all your website data is preserved exactly as it is and moved to our servers seamlessly. Customers switch to MilesWeb for a better and faster hosting experience.</p>`
            },
            {
                question:`Why Choose MilesWeb?`,
                answer:`<p>With over 13 years of expertise and innovation in the web hosting industry, MilesWeb is renowned for delivering blazing-fast page loads, ironclad security, and best web hosting services to customers globally. </p><p>We focus on offering customer-oriented solutions at the best price. With this, you get access to world-class support 24/7 available through email, live chat, and system ticket route. </p><p>Enjoy a 99.9% uptime, 30-day money back guarantee with best-in-class features such as unlimited free SSL, control panel, NVMe storage, 1-click installs, backups, and more which comes standard with our premium web hosting! This is one of the many ways MilesWeb sets the bar of excellence in helping businesses succeed. As an independent web hosting company, we have a track record of hosting over one million websites and earning the trust of over ${common.customerCount} customers worldwide.</p>`
            },
            {
                question:`Can I upgrade my web hosting plan later?`,
                answer:`<p>Absolutely yes! You can upgrade your web hosting plan anytime. You only have to pay the difference amount; the upgrades will be done instantly. If you're just starting online, we recommend you to opt for our <a class='aclr' target='_blank' href='/hosting/cheap-web-hosting'>cheap web hosting</a> plan. It meets the requirements of entry-level websites and fits perfectly within your budget!</p>
                <p>However, if you're expecting traffic surges or your existing plan has limited resources. At this point, you can upgrade to a higher plan, such as <a class='aclr' target='_blank' href='/hosting/cloud-hosting/'>cloud hosting</a>, <a class='aclr' target='_blank' href='/hosting/vps-hosting/'>VPS</a>, or a <a class='aclr' target='_blank' href='/hosting/dedicated-servers/'>dedicated server</a>, later.</p>
                <p>You can get in touch with our customer support team, who will help you with the upgrade process. Also, you will get an email notification when your site outgrows its current hosting resources. </p>`
            },
            {
                question:`What kind of web hosting services you offer?`,
                answer:`<p>We at MilesWeb, provide a range of powerful web hosting services that can host any website and cater to any requirements.</p>
                <p><b>Shared Hosting:</b> Budget-friendly hosting option where multiple websites share resources on a single server. Ideal for first-timers and small to medium-sized websites.</p>
                <p><b>VPS Hosting:</b> Wherein, one powerful physical server hosts multiple virtual servers, each isolated from the others. </p>
                <p><b>Reseller Hosting:</b> A white-label approach to selling hosting services. MilesWeb offers 100% white-labeled reseller hosting allowing you to sell hosting under your own brand name.</p>
                <p><b>Dedicated Hosting:</b> A type of web hosting wherein you get an entire physical server that’s completely dedicated to you.</p>
                <p><b>Cloud Hosting:</b> Here your website/app is not deployed on a single server. Rather, a cluster of virtual and physical cloud servers is connected internally. This ensures higher flexibility and scalability.</p>
                <p>You can choose a web hosting plan that best suits your requirements and budget!</p>`
            },
            {
                question:`Is MilesWeb good for my business website?`,
                answer:`<p>Yes, you can definitely host your business website with MilesWeb hosting. We offer a range of powerful web hosting solutions specifically tailored for your business needs. Our feature-rich plans and exceptional customer support ensure your business website receives top-notch hosting services. </p>
                <p>Whether you require shared hosting, cloud hosting, VPS, or dedicated server, our packages cater to various business needs and budgets. With our reliable infrastructure, high uptime, and fast loading speeds, we prioritize the performance and stability of your website. Our robust security measures protect your valuable data and information.</p>
                <p>Our user-friendly control panel also empowers you to manage your website, <a class='aclr' href='/business-email'>business email</a> accounts, and databases easily. Further, our expert support team is available 24/7 to assist you with any technical queries or concerns. Choose MilesWeb hosting to empower your business website and experience exceptional performance and reliability.</p>`
            },
            {
                question:`Are MilesWeb’s hosting services for non-techies?`,
                answer:`<p>Absolutely yes! By default, we offer fully <a href='/hosting/managed-web-hosting' class='aclr'>managed hosting services</a>. We handle the maintenance and manage the powerful hosting server, so you can completely focus on growing your business. Additionally, our technical experts are up for assistance no matter the day and time! We offer brilliant customer support 24/7 via live chat and email. Being non-tech savvy, rest assured, to receive the best support and hosting experience.</p>`
            },
            {
                question:`What security measures do you include?`,
                answer:`<p>Security comes first at MilesWeb! We prioritize your website’s safety by incorporating the best security practices to protect it from threats and malware. Our servers are safeguarded with advanced security software, including Firewall, Malware Scanners, CageFS, BitNinja Server Security, Brute-force Protection, Web Application Firewall (WAF), Two-Factor Authentication (2FA) and more.</p><p>Additionally, our SSL certificates ensure secure encryption between website visitors and web browsers.</p>`
            },
            
        ]
    }

    const closing = {
            title :`Ready to experience superior web hosting performance?`,
            description :`Hosting ${common.customerCount} clients’ websites and apps. We’re only missing yours! Compare our features with other hosting providers and see our customers choose us.`,
            image:`/assets/images/mw/experience.gif`,
            alt:`Ready to experience superior web hosting performance | MilesWeb India`,
            btn:{
                text:`Get Started Now`,
                href:``,
            }
    }
    

    return { hero, head, planHeading, support, mpanel, migration, whyChoose, productAndServices, PowerHouse, faqs, closing};
});
