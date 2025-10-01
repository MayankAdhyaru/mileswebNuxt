<template>
    <div class="na-bodywrap na-menu-fix mw-dark-menu">
        <div class="mw-menu" :class="{ 'mw-active': isNavOpen }">
            <div class="mw-menu-container">
                <div class="mw-menu-row">
                    <div class="mw-menu-mncol-7 mw-menu-mncol-1">
                        <div class="mw-menu-left">
    
                            <div class="mw-menu-logo">
                                <!-- Logo -->
                                <NuxtLink to="/" class="mw-menu-logo-a">
                                    <img src="/assets/images/home/mw-logo.svg" class="mw-menu-logo-1" alt="Web Hosting India | MilesWeb" title="Web Hosting India | MilesWeb" />
                                    <img src="/assets/images/home/milesweb-white.svg" class="mw-menu-logo-1 mw-menu-logo-2" alt="Web Hosting India | MilesWeb" title="Web Hosting India | MilesWeb" />
                                </NuxtLink>
                            </div>
    
                            <div class="mw-menu-left-2">
                                <nav :class="['mw-navigation-show', { 'mw-active': isNavOpen }]">
                                    <ul class="mw-navigation-show-ul">
        
                                        <!-- Hosting -->
                                        <li class="mw-menu-dropdown">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('hosting')">Hosting<span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'hosting'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/web-hosting">Web Hosting</NuxtLink>
                                                        <span class="drop-link-sup-tt">80% OFF</span>
                                                        <p>For new and small business websites</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/cloud-hosting/">Cloud Hosting</NuxtLink>
                                                        <span class="drop-link-sup-tt">PREMIUM</span>
                                                        <p>Best for rapidly growing websites</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/reseller-hosting/">Reseller Hosting</NuxtLink>
                                                        <p>Perfect for reselling hosting services</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/cpanel-hosting">cPanel Hosting</NuxtLink>
                                                        <p>Deploy and manage node.js apps</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/ai-website-builder">Website Builder</NuxtLink>
                                                        <p>No coding, just smart AI design</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
        
                                        <!-- WordPress -->
                                        <li class="mw-menu-dropdown">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('wordpress')">WordPress<span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'wordpress'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/wordpress-hosting/">WordPress Hosting</NuxtLink>
                                                        <span class="drop-link-sup-tt">AI-Powered</span>
                                                        <p>For new and growing WordPress sites</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/woocommerce-hosting">WooCommerce Hosting</NuxtLink>
                                                        <p>Designed for selling online easily</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <!-- VPS -->
                                        <li class="mw-menu-dropdown">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('vps')">VPS & Dedicated<span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'vps'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/vps-hosting/">VPS Hosting</NuxtLink>
                                                        <p>For more power and control</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/vps-hosting/managed-vps-hosting">Managed VPS Hosting</NuxtLink>
                                                        <p>We manage your VPS for you</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/vps-hosting/windows-vps">Windows VPS</NuxtLink>
                                                        <p>Ideal for ASP.NET and Windows apps</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/dedicated-servers/">Dedicated Server</NuxtLink>
                                                        <p>Ideal for ASP.NET and Windows apps</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/hosting/vps-hosting/n8n">n8n VPS</NuxtLink>
                                                        <span class="drop-link-sup-tt">POPULAR</span>
                                                        <p>Scalable VPS for n8n users</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <!-- Domain -->
                                        <li class="mw-menu-dropdown">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('domain')">Domain & Email<span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'domain'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/domains/">Domain</NuxtLink>
                                                        <p>Register your domain name</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/business-email">Business Email</NuxtLink>
                                                        <span class="drop-link-sup-tt">81% OFF</span>
                                                        <p>Professional email for startups</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/google-workspace">Google Workspace</NuxtLink>
                                                        <p>Smart tools for everyday work</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <!-- Support -->
                                        <li class="mw-menu-dropdown">
                                            <div class="mw-menu-tabs" @click="toggleDropdown('support')">Support<span class="mw-menu-tab-dwn" v-html="headerArrow"></span>
                                            </div>
                                            <div v-show="openDropdown === 'support'" class="mw-submenu">
                                                <ul class="mw-sub-content-ul">
                                                    <li class="mw-sub-content-li">
                                                        <a class="mw-sub-content-lnk" to="/hosting-faqs/">Knowledge Base</a>
                                                        <p>Find instant answers and solutions</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <a class="mw-sub-content-lnk" target="_blank" href="https://www.youtube.com/c/MilesWeb/playlists" rel="noopener noreferrer">
                                                            Tutorials
                                                        </a>
                                                        <p>Step-by-step guides and how-tos</p>
                                                    </li>
                                                    <li class="mw-sub-content-li">
                                                        <NuxtLink class="mw-sub-content-lnk" to="/contact">Contact</NuxtLink>
                                                        <p>Reach our support team anytime</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <!-- Pricing -->
                                        <li>
                                            <NuxtLink class="mw-navigation-show-a" to="/hosting/"><div class="mw-menu-tabs mw-menu-wi-tabs">Pricing</div></NuxtLink>
                                        </li>
                                        <li>
                                            <a class="mw-sub-content-lnk" target="_blank"  to="https://my.milesweb.com/clientarea.php"><span class="mw_user_icon">Log In</span></a>
                                        </li>
                                        <li class="mw-flag-dropdown-small">
                                            <div class="mw-flag-dropdown">
                                                <div class="mw-flag">
                                                    <div class="mw-flag-toggle mw-menu-tabs">
                                                        <img style="vertical-align:middle;" width="32" height="32" src="/assets/images/home/flag-ind3.svg" alt="India">
                                                        <span class="pl-10 mw-flag-span">India</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                                
                                <div class="mw-menu-right">
                                    <div class="mw-flag-dropdown mw-flag-dropdown-larg">
                                        <div class="mw-flag">
                                            <div class="mw-flag-toggle mw-menu-tabs">
                                                <img loading="lazy" style="vertical-align:middle;" src="/assets/images/home/flag-ind3.svg" alt="India" width="30" height="30">
                                                <span class="pl-10 mw-flag-span">India</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="mw-menu-right-ul">
                                        <li class="mw-menu-right-li menu-login-hide">
                                            <a target="_blank" href="https://my.milesweb.com/clientarea.php"><span class="mw-menu-login">Log In</span></a>
                                        </li>
                                        <li class="mw_menu_toggle mw-menu-right-li" @click="toggleNav">
                                            <div class="mw-navigation-toggle"><span></span><span></span><span></span></div>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                            <!-- Navigation -->
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isNavOpen = ref(false)     // mobile nav
const openDropdown = ref(null)   // dropdowns
const headerArrow = '<svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L5 5L1 1" stroke="#15222E" stroke-width="1.5" stroke-linecap="round"></path></svg>'
function toggleNav() {
  isNavOpen.value = !isNavOpen.value
}
function toggleDropdown(menu) {
  openDropdown.value = openDropdown.value === menu ? null : menu
}

// Close nav if click outside
function handleClickOutside(event) {
  const nav = document.querySelector('.mw-navigation-show')
  if (nav && !nav.contains(event.target)) {
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

// Add event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscKey)
})

// Cleanup listeners
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscKey)
})

</script>


<style scoped>
/* Hide dropdowns by default (v-show will inline style display:block) */
.mw-navigation-show {
  display: none;
}

.mw-navigation-show.mw-active {
  display: block;
}
.mw-dark-menu .mw-menu{background:#060815!important}.mw-dark-menu .mw-menu-logo-1{display:none!important}.mw-dark-menu .mw-menu-logo-1.mw-menu-logo-2{display:none!important}.mw-dark-menu .mw-menu-logo-1.mw-menu-logo-2{display:block!important}.mw-dark-menu .mw-menu-tabs:hover::after{background:#252733}.mw-dark-menu .mw-navigation-toggle span{border-color:#fff!important}.mw-dark-menu .mw-menu-tabs{color:#fff!important}.mw-dark-menu .mw-menu-tab-dwn svg path{stroke:#fff!important}.mw-dark-menu{color:#fff}.mw-dark-menu .mw-menu-login{color:#fff;border-color:#fff}.mw-dark-menu .mw-menu-login:hover{background:#252733;border-color:#fff}.mw-menu-login{color:var(--ttl_clr);border-color:var(--ttl_clr)}.mw-menu-login:hover{background:#f0f0ff;border-color:#252733}.mw-dark-menu .mw-menu-logo-2{display:none}.mw-menu-logo-2{display:none}@media(max-width:1140px){.mw-dark-menu .mw-navigation-show-ul{background:#060815}.mw-dark-menu .mw-menu-active .mw-menu-tabs,.mw-dark-menu .mw-menu-tabs:hover{background:#312e42}.mw-dark-menu .mw-submenu{background:#060815}.mw-dark-menu .mw-sub-content-lnk{color:#fff}.mw-dark-menu .mw_user_icon{border-color:#fff!important;color:#fff!important}.mw-dark-menu .mw-sub-content-li p{color:#cecbd8}.mw-dark-menu .mw-sub-content-li:hover{background:#160f3c}.mw-dark-menu .mw-sub-content-li:hover{background:#1b1136!important}.mw-dark-menu .mw_user_icon:hover{background:#312e42!important;border-color:#fff!important}.mw_user_icon:hover{background:#f0f0ff}}#mw-offer-timer{display:none}.mw-tooltip-text{color:var(--ttl_clr)!important}@media(max-width:1024px){.mw-ban-dark-bg{padding-top:0}}@media(max-height:768px) and (min-width:1250px){.mw-ban-dark-bg{padding-top:20px;}.mw-ban-img{max-width:600px}}@media(max-height:650px) and (min-width:1250px){.mw-ban-container{padding-top:12px}.mw-ban-price-row{padding:12px 0 32px}.re_month_free{padding-bottom:20px}}
</style>
