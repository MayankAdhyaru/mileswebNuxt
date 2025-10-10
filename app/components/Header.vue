<template>
    <!-- Root wrapper -->
    <div class="na-bodywrap na-menu-fix" :class="{
        'na-menu-scrolled': isScrolled,
        'mw-dark-menu': !isScrolled
    }">
        <div class="mw-menu" :class="{ 'mw-active': isNavOpen }">
            <div class="mw-menu-container">
                <div class="mw-menu-row">
                    <div class="mw-menu-mncol-7 mw-menu-mncol-1">
                        <div class="mw-menu-left">
                            <!-- Logo -->
                            <div class="mw-menu-logo">
                                <NuxtLink to="/" class="mw-menu-logo-a">
                                    <img src="/assets/images/home/mw-logo.svg" class="mw-menu-logo-1"
                                        alt="Web Hosting India | MilesWeb" title="Web Hosting India | MilesWeb" />
                                    <img src="/assets/images/home/milesweb-white.svg"
                                        class="mw-menu-logo-1 mw-menu-logo-2" alt="Web Hosting India | MilesWeb"
                                        title="Web Hosting India | MilesWeb" />
                                </NuxtLink>
                            </div>

                            <div class="mw-menu-left-2">
                                <!-- Navigation -->
                                <nav :class="['mw-navigation-show', { 'mw-active': isNavOpen }]">
                                    <ul class="mw-navigation-show-ul">
                                        <!-- Hosting -->
                                        <li class="mw-menu-dropdown"
                                            :class="{ 'mw-menu-active': openDropdown === 'hosting' }">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('hosting')">
                                                Hosting
                                                <span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'hosting'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li" v-for="(item, i) in hostingMenu"
                                                        :key="i">
                                                        <a class="mw-sub-content-lnk" :href="item.href">{{ item.text
                                                            }}</a>
                                                        <span v-if="item.badge" class="drop-link-sup-tt">{{ item.badge
                                                            }}</span>
                                                        <p>{{ item.desc }}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <!-- WordPress -->
                                        <li class="mw-menu-dropdown"
                                            :class="{ 'mw-menu-active': openDropdown === 'wordpress' }">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('wordpress')">
                                                WordPress
                                                <span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'wordpress'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li" v-for="(item, i) in wordpressMenu"
                                                        :key="i">
                                                        <a class="mw-sub-content-lnk" :href="item.href">{{ item.text
                                                            }}</a>
                                                        <span v-if="item.badge" class="drop-link-sup-tt">{{ item.badge
                                                            }}</span>
                                                        <p>{{ item.desc }}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <!-- VPS -->
                                        <li class="mw-menu-dropdown"
                                            :class="{ 'mw-menu-active': openDropdown === 'vps' }">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('vps')">
                                                VPS & Dedicated
                                                <span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'vps'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li" v-for="(item, i) in vpsMenu" :key="i">
                                                        <a class="mw-sub-content-lnk" :href="item.href">{{ item.text
                                                            }}</a>
                                                        <span v-if="item.badge" class="drop-link-sup-tt">{{ item.badge
                                                            }}</span>
                                                        <p>{{ item.desc }}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <!-- Domain -->
                                        <li class="mw-menu-dropdown"
                                            :class="{ 'mw-menu-active': openDropdown === 'domain' }">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('domain')">
                                                Domain & Email
                                                <span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'domain'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li" v-for="(item, i) in domainMenu"
                                                        :key="i">
                                                        <a class="mw-sub-content-lnk" :href="item.href">{{ item.text
                                                            }}</a>
                                                        <span v-if="item.badge" class="drop-link-sup-tt">{{ item.badge
                                                            }}</span>
                                                        <p>{{ item.desc }}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <!-- Support -->
                                        <li class="mw-menu-dropdown"
                                            :class="{ 'mw-menu-active': openDropdown === 'support' }">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('support')">
                                                Support
                                                <span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'support'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li" v-for="(item, i) in supportMenu"
                                                        :key="i">
                                                        <a class="mw-sub-content-lnk" :href="item.href"
                                                            :target="item.target" :rel="item.rel">{{ item.text }}</a>
                                                        <p>{{ item.desc }}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <!-- Pricing -->
                                        <li>
                                            <a class="mw-navigation-show-a" href="/hosting/">
                                                <div class="mw-menu-tabs mw-menu-wi-tabs">Pricing</div>
                                            </a>
                                        </li>

                                        <!-- Login -->
                                        <li>
                                            <a class="d-flex" target="_blank"
                                                href="https://my.milesweb.com/clientarea.php"><span
                                                    class="mw_user_icon">Log In</span></a>
                                        </li>

                                        <!-- Flag -->
                                        <li class="mw-flag-dropdown-small">
                                            <div class="mw-flag-dropdown">
                                                <div class="mw-flag">
                                                    <div class="mw-flag-toggle mw-menu-tabs">
                                                        <img style="vertical-align: middle" width="32" height="32"
                                                            src="/assets/images/home/flag-ind3.svg" alt="India" />
                                                        <span class="pl-10 mw-flag-span">India</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>

                                <!-- Right section -->
                                <div class="mw-menu-right">
                                    <div class="mw-flag-dropdown mw-flag-dropdown-larg">
                                        <div class="mw-flag">
                                            <div class="mw-flag-toggle mw-menu-tabs">
                                                <img loading="lazy" style="vertical-align: middle"
                                                    src="/assets/images/home/flag-ind3.svg" alt="India" width="30"
                                                    height="30" />
                                                <span class="pl-10 mw-flag-span">India</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="mw-menu-right-ul">
                                        <li class="mw-menu-right-li menu-login-hide">
                                            <a target="_blank" href="https://my.milesweb.com/clientarea.php">
                                                <span class="mw-menu-login">Log In</span>
                                            </a>
                                        </li>
                                        <li class="mw_menu_toggle mw-menu-right-li" @click="toggleNav">
                                            <div class="mw-navigation-toggle"><span></span><span></span><span></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- mw-menu-left-2 -->
                        </div>
                        <!-- mw-menu-left -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* ------------------------
   State
------------------------ */
const isNavOpen = ref(false)
const openDropdown = ref(null)
const isScrolled = ref(false)

/* ------------------------
   SVG icon
------------------------ */
const headerArrow =
    '<svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L5 5L1 1" stroke="#15222E" stroke-width="1.5" stroke-linecap="round"/></svg>'

/* ------------------------
   Menu Data
------------------------ */
const hostingMenu = [
    { text: 'Web Hosting', href: '/hosting/web-hosting', badge: '80% OFF', desc: 'For new and small business websites' },
    { text: 'Cloud Hosting', href: '/hosting/cloud-hosting/', badge: 'PREMIUM', desc: 'Best for rapidly growing websites' },
    { text: 'Reseller Hosting', href: '/hosting/reseller-hosting/', desc: 'Perfect for reselling hosting services' },
    { text: 'cPanel Hosting', href: '/hosting/cpanel-hosting', desc: 'Deploy and manage node.js apps' },
    { text: 'Website Builder', href: '/ai-website-builder', desc: 'No coding, just smart AI design' }
]

const wordpressMenu = [
    { text: 'WordPress Hosting', href: '/hosting/wordpress-hosting/', badge: 'AI-Powered', desc: 'For new and growing WordPress sites' },
    { text: 'WooCommerce Hosting', href: '/hosting/woocommerce-hosting', desc: 'Designed for selling online easily' }
]

const vpsMenu = [
    { text: 'VPS Hosting', href: '/hosting/vps-hosting/', desc: 'For more power and control' },
    { text: 'Managed VPS Hosting', href: '/hosting/vps-hosting/managed-vps-hosting', desc: 'We manage your VPS for you' },
    { text: 'Windows VPS', href: '/hosting/vps-hosting/windows-vps', desc: 'Ideal for ASP.NET and Windows apps' },
    { text: 'Dedicated Server', href: '/hosting/dedicated-servers/', desc: 'Ideal for ASP.NET and Windows apps' },
    { text: 'n8n VPS', href: '/hosting/vps-hosting/n8n', badge: 'POPULAR', desc: 'Scalable VPS for n8n users' }
]

const domainMenu = [
    { text: 'Domain', href: '/domains/', desc: 'Register your domain name' },
    { text: 'Business Email', href: '/business-email', badge: '81% OFF', desc: 'Professional email for startups' },
    { text: 'Google Workspace', href: '/google-workspace', desc: 'Smart tools for everyday work' }
]

const supportMenu = [
    { text: 'Knowledge Base', href: '/hosting-faqs/', desc: 'Find instant answers and solutions' },
    { text: 'Tutorials', href: 'https://www.youtube.com/c/MilesWeb/playlists', target: '_blank', rel: 'noopener noreferrer', desc: 'Step-by-step guides and how-tos' },
    { text: 'Contact', href: '/contact', desc: 'Reach our support team anytime' }
]

/* ------------------------
   Interaction Logic
------------------------ */
function toggleNav() {
    isNavOpen.value = !isNavOpen.value
}

function toggleDropdown(menuKey) {
    openDropdown.value = openDropdown.value === menuKey ? null : menuKey
}


// Close nav if click outside
function handleClickOutside(event) {
    const nav = document.querySelector('.mw-navigation-show')
    const toggleBtn = document.querySelector('.mw_menu_toggle')
    const target = event.target

    const clickedInsideNav = nav && nav.contains(target)
    const clickedOnToggle = toggleBtn && toggleBtn.contains(target)

    if (!clickedInsideNav && !clickedOnToggle) {
        isNavOpen.value = false
        openDropdown.value = null
    }
}

// Close nav on ESC key
function handleEscKey(event) {
    if (event.key === 'Escape') {
        isNavOpen.value = false
        openDropdown.value = null
    }
}

// 🔹 Handle scroll to toggle menu classes
function handleScroll() {
    const menu = document.querySelector('.na-menu-fix')
    if (!menu) return

    if (window.scrollY > 50) {
        menu.classList.add('na-menu-scrolled')
        menu.classList.remove('mw-dark-menu')
        isScrolled.value = true
    } else {
        menu.classList.remove('na-menu-scrolled')
        menu.classList.add('mw-dark-menu')
        isScrolled.value = false
    }
}


/* ------------------------
   Lifecycle
------------------------ */
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscKey)
    window.addEventListener('scroll', handleScroll)
    handleScroll() // run once on load
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>


<style scoped>
/* Hide dropdowns by default (v-show will inline style display:block) */
/* .mw-navigation-show {
  display: none;
} */

/* .mw-navigation-show.mw-active {
  display: block;
} */
.mw-dark-menu .mw-menu {
    background: #060815 !important
}

.mw-dark-menu .mw-menu-logo-1 {
    display: none !important
}

.mw-dark-menu .mw-menu-logo-1.mw-menu-logo-2 {
    display: none !important
}

.mw-dark-menu .mw-menu-logo-1.mw-menu-logo-2 {
    display: block !important
}

.mw-dark-menu .mw-menu-tabs:hover::after {
    background: #252733
}

.mw-dark-menu .mw-navigation-toggle span {
    border-color: #fff !important
}

.mw-dark-menu .mw-menu-tabs {
    color: #fff !important
}

.mw-dark-menu .mw-menu-tab-dwn svg path {
    stroke: #fff !important
}

.mw-dark-menu {
    color: #fff
}

.mw-dark-menu .mw-menu-login {
    color: #fff;
    border-color: #fff
}

.mw-dark-menu .mw-menu-login:hover {
    background: #252733;
    border-color: #fff
}

.mw-menu-login {
    color: var(--ttl_clr);
    border-color: var(--ttl_clr)
}

.mw-menu-login:hover {
    background: #f0f0ff;
    border-color: #252733
}

.mw-dark-menu .mw-menu-logo-2 {
    display: none
}

.mw-menu-logo-2 {
    display: none
}

@media(max-width:1140px) {
    .mw-dark-menu .mw-navigation-show-ul {
        background: #060815
    }

    .mw-dark-menu .mw-menu-active .mw-menu-tabs,
    .mw-dark-menu .mw-menu-tabs:hover {
        background: #312e42
    }

    .mw-dark-menu .mw-submenu {
        background: #060815
    }

    .mw-dark-menu .mw-sub-content-lnk {
        color: #fff
    }

    .mw-dark-menu .mw_user_icon {
        border-color: #fff !important;
        color: #fff !important
    }

    .mw-dark-menu .mw-sub-content-li p {
        color: #cecbd8
    }

    .mw-dark-menu .mw-sub-content-li:hover {
        background: #160f3c
    }

    .mw-dark-menu .mw-sub-content-li:hover {
        background: #1b1136 !important
    }

    .mw-dark-menu .mw_user_icon:hover {
        background: #312e42 !important;
        border-color: #fff !important
    }

    .mw_user_icon:hover {
        background: #f0f0ff
    }
}

#mw-offer-timer {
    display: none
}

.mw-tooltip-text {
    color: var(--ttl_clr) !important
}

@media(max-width:1024px) {
    .mw-ban-dark-bg {
        padding-top: 0
    }
}

@media(max-height:768px) and (min-width:1250px) {
    .mw-ban-dark-bg {
        padding-top: 20px;
    }

    .mw-ban-img {
        max-width: 600px
    }
}

@media(max-height:650px) and (min-width:1250px) {
    .mw-ban-container {
        padding-top: 12px
    }

    .mw-ban-price-row {
        padding: 12px 0 32px
    }

    .re_month_free {
        padding-bottom: 20px
    }
}
</style>
