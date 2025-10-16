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
.mw-menu-dropdown{position:relative!important}.mw-submenu1 .mw-h3{font-weight:500;font-size:20px;padding:20px 20px 0}.mw-submenu{display:none;right:0;box-shadow:1px -1px 18px 3px rgba(0,0,0,.15);position:absolute;z-index:400;border-radius:11px;background:#fff;width:100%;transform:translate(-50%,0);top:100%;animation:slideDown .2s ease-in-out;min-width:max-content;left:50%;padding:15px 20px 25px;border:none}.mw-sub-content-li{padding:12px 25px 12px;cursor:pointer}.mw-sub-content-lnk{font-weight:700;margin-bottom:12px;font-size:15px;}.mw-sub-content-li:hover{background:#f0f0ff;border-radius:8px}.mw-menu-tabs{font-size:15px;padding:34px 14px;color:var(--ttl_clr)}.mw-menu-tab-dwn{top:38px;position:unset;display:inline-block}.mw-menu-tabs:before{content:'';position:absolute;bottom:-18px;border:1px solid transparent;opacity:0;left:40%;margin-left:-8px;transform:rotate(45deg);background:#fff;height:28px;width:28px;box-shadow:-4px -3px 10px 0 rgb(0 0 0 / 5%);border-radius:10px 0 0 0;z-index:402}.mw-submenu-p{font-size:14px;color:#3b3b55}@media (max-width:1152px){.mw-menu-tabs{padding:30px 20px}.mw-menu-tab-dwn{top:34px}}@media(max-width:1140px){.mw-sub-content-li{padding:14px 0 14px}.mw-submenu{position:relative;box-shadow:unset;transform:unset;left:0;height:auto;padding:15px 30px 10px}.mw-menu-tabs:before{left:12%;margin-left:-22px;z-index:0}.mw-menu-tabs{padding:16px 16px;border-radius:5px}.mw-menu-tab-dwn{top:50%;transform:translateY(-50%);position:absolute;right:48px}.mw-menu-active .mw-menu-tab-dwn{transform:rotateZ(180deg) translateY(-50%);top:20%}}@media(max-width:600px){.mw-menu-tab-dwn{right:20px}.mw-navigation-show-ul{padding-inline:14px}}.new-tag2{position:absolute;top:10px;right:33%;padding:5px 12px;background:var(--azure_clr);border-radius:5px;color:#fff;animation:MoveUpDown 1s ease-in-out infinite alternate-reverse both}@media(max-width:1140px){.new-tag2{top:15px;right:unset}}@media (min-width:1140px) and (max-width:1260px){.mw-menu-tabs{padding:30px 9px!important}.mw-menu-tab-dwn{top:42px}}.mw-menu-right-call{color:var(--gray_clr);position:relative}@media (max-width:1144px){.mw-menu-right-li.pl-22{padding-left:10px}}@media (max-width:997px){.mw-menu-right-li.pl-22{padding-left:5px}}.mw_flag{padding-left:12px;display:block}@media (max-width:1600px){.mw_flag img{width:32px!important;height:20px!important}}.mw-flag-dropdown{position:relative;display:inline-block}.mw-flag-toggle{background:0 0;border:0;cursor:pointer;display:flex;align-items:center;padding: 12px 15px 12px 2px}.mw-flag-drop-list{padding:12px}.mw-flag-drop-list img{width:30px;height:30px}.mw-flag-drop{padding:20px}.mw-flag-drop.mw-show{display:block}.mw-flag-lnk{color:var(--gray_clr)}.mw-flag-dropdown-small,.mw-flag-toggle::after{display:none}@media (max-width:1400px){.mw-flag-txt{font-size:14px}}@media (max-width:1140px){.mw-flag-dropdown{display:block}.mw-flag-dropdown-larg{display:none}.mw-flag-dropdown-small{display:block}.mw-flag-drop{padding:4px 0 0}.mw-flag-drop-list img{vertical-align:middle}.mw-flag-txt{font-weight:500}}.mw-flag-toggle{padding: 12px 15px 12px 2px !important;}@media(min-width:1140px){.mw_user_icon{display:none}}.mw-menu-web-builder{padding-right:10px!important}@media(min-width:1140px){.g-suite-p{padding-left:12px!important;padding-right:10px!important;margin-right:10px}}@media(max-width:1220px){.g-suite-p{padding-left:8px!important;padding-right:10px!important;margin-right:0}}.mw-ftr-pm_logo{height:30px;margin:0}.mw-ftr-pm_logo img{object-fit:contain}.mw-ftr-wrapr{max-width:unset;display:flex;flex-flow:row wrap;justify-content:end;align-items:center;width:100%}@media(max-width:1140px){.mw-flag-dropdown-small{display:none!important}.mw_user_icon{border:1px solid #123455;color:#123455;padding:16px;margin:100px 16px 16px;text-align:center;width:100%;border-radius:10px;font-weight:600;margin-top:calc(4vh - 0px)}.mw-menu-tabs{font-weight:600}}@media (max-width:950px){.g-suite-p{padding-left:0!important;padding-right:4px!important}.mw-ftr-pm_logo{height:40px;width:60px;margin:0}.mw-ftr-wrapr{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;justify-content:start}.mw-ftr-pm_logo img{object-fit:contain}}@media (max-width:1012px){.mw-menu{padding:14px 10px}}.mw-menu-tabs::after{bottom:23px}.mw-menu-login{padding: 5px 15px;border-color:#15222E;font-weight:500;border-radius:5px;color: #15222E;}.mw-flag-toggle img{width:30px;height:30px}.mw-menu-tabs:hover::after{padding:0}.mw-menu-right{display:flex;align-items:center;padding-left:6px}@media(min-width:1141px){.mw-menu-left-2{justify-content:space-between}}.mw-menu-login:hover{background:#f0f0ff;border-color:var(--ttl_clr)}@media(max-width:1260px){.mw-menu-tabs::after{bottom:18px}}
@media(max-width:1050px){.mw-flag-toggle{padding: 12px 15px 12px 2px !important;}}.mw-flag-drop.mw-show{display:none!important;}.mw-menu-active .mw-flag-toggle.mw-menu-tabs:before{display:none !important}.mw-flag-toggle{cursor: unset;}
@media(max-width:1090px){
	.mw-flag-toggle{    padding: 12px 16px 12px 2px !important;}
	.mw-menu-tabs{padding-left:6px !important;padding-right:6px !important;}
}
@media(max-width:1140px){.mw-menu-tabs{padding-left:12px !important;}}
</style>
