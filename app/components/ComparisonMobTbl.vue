<script setup lang="ts">
import { ref, computed } from 'vue'

// Server-side fetch of common + renewal data to ensure SSR markup matches client
const { data: commonData } = await useAsyncData('comparison-mobile-common', () => $fetch('/api/common'))
const { data: renewalData } = await useAsyncData('comparison-mobile-renewal', () => $fetch('/api/renewalPrice'))

// reactive client state
const activeTab = ref('tab1')

// helper to map a tab id to an index (tab1 -> 0, tab2 -> 1, tab3 -> 2)
const indexForTab = (tab: string) => {
    if (tab === 'tab1') return 0
    if (tab === 'tab2') return 1
    if (tab === 'tab3') return 2
    return 0
}

// competitor for a specific tab (used inside the v-for so each tab shows its own data)
const competitorForTab = (tab: string) => {
    const idx = indexForTab(tab)
    return (competitorCols.value && competitorCols.value[idx]) ? competitorCols.value[idx] : firstCompetitor.value
}

// initialize stable server-side lists
const features = [
    'NVMe storage',
    'Advanced WordPress optimization',
    'Free mailboxes',
    'SSH access',
    'AI Website builder',
    'Daily backups',
    'Full website migration',
    'Email migration',
    'Database migration',
    'Application migration (All apps)'
]

const milesPrice = ref<{ price: Record<string, any>; currency: string }>({ price: { web_2: 0 }, currency: '₹' })
const milesRenewal = ref<string | number>('')
const competitorCols = ref<Array<any>>([])

// safe first competitor fallback to avoid template runtime errors when array is empty
const firstCompetitor = computed(() => {
    if (competitorCols.value && competitorCols.value.length) return competitorCols.value[0]
    return { name: 'Competitor', logo: '/assets/images/competitor/godaddy-competitor.png', price: '' }
})

if (commonData?.value) {
    const p: any = commonData.value
    if (p?.common?.price) {
        milesPrice.value.price = p.common.price
        milesPrice.value.currency = p.common.currency || '₹'
    }
}

if (renewalData?.value) {
    const r: any = renewalData.value
    competitorCols.value = r?.competitors ?? [
        {
            name: 'GoDaddy',
            logo: '/assets/images/competitor/godaddy-competitor.png',
            price: '329.00',
            features: [true, 10, false, true, false, false, false, false, false, false]
        },
        {
            name: 'Hostinger',
            logo: '/assets/images/competitor/hostinger.png',
            price: '149.00',
            features: [false, 25, false, false, true, true, true, false, false, false]
        },
        {
            name: 'Bluehost',
            logo: '/assets/images/bluehost-alternative/bluehost.png',
            price: '279.00',
            features: [false, 'Unlimited', false, true, false, true, false, false, false, false]
        }
    ]
    const rp = r?.renewalPricing ?? r
    if (rp?.['Shared Hosting']?.['Elite/Premium']) {
        milesRenewal.value = rp['Shared Hosting']['Elite/Premium']['36 months'] ?? ''
    }
}
</script>

<template>
    <section class="pb-45 pt-45">
        <div class="mw-container">
            <div class="title-center pb-45">
                <h2 class="mw-h2">MilesWeb: More than a host. See why we have a better deal!</h2>
                <p class="mw-p">Not just a plan—we offer strategic premium web hosting services in India. Enjoy world-class features and unlock your business's full potential.</p>
            </div>

            <div class="com-dom-tab-btns">
                        <div
                            class="com-dom-tab-btn"
                            :class="{ 'com-dom-tab-btn-active': activeTab === 'tab1' }"
                            @click="activeTab = 'tab1'"
                            :aria-pressed="activeTab === 'tab1'"
                        >
                    <img class="img-fluid com-dom-tab-img1" src="/assets/images/competitor/godaddy-black.svg" width="125" height="31" alt="GoDaddy" />
                    <img class="img-fluid com-dom-tab-img2" src="/assets/images/competitor/godaddy.svg" width="125" height="31" alt="GoDaddy" />
                </div>

                        <div
                            class="com-dom-tab-btn"
                            :class="{ 'com-dom-tab-btn-active': activeTab === 'tab2' }"
                            @click="activeTab = 'tab2'"
                            :aria-pressed="activeTab === 'tab2'"
                        >
                    <img class="img-fluid com-dom-tab-img1" src="/assets/images/competitor/hostinger-black.svg" width="125" height="31" alt="Hostinger" />
                    <img class="img-fluid com-dom-tab-img2" src="/assets/images/competitor/hostinger-white.svg" width="125" height="31" alt="Hostinger" />
                </div>

                        <div
                            class="com-dom-tab-btn"
                            :class="{ 'com-dom-tab-btn-active': activeTab === 'tab3' }"
                            @click="activeTab = 'tab3'"
                            :aria-pressed="activeTab === 'tab3'"
                        >
                    <img class="img-fluid com-dom-tab-img1" src="/assets/images/competitor/bluehost-black.svg" width="125" height="31" alt="Bluehost" />
                    <img class="img-fluid com-dom-tab-img2" src="/assets/images/competitor/bluehost.svg" width="125" height="31" alt="Bluehost" />
                </div>
            </div>

            <div class="tab-container">
                <div v-for="tab in ['tab1','tab2','tab3']" :key="tab" class="com-dom-tab-cont" :class="{ 'com-dom-tab-btn-active': activeTab === tab }" :aria-hidden="activeTab !== tab" v-show="activeTab === tab">
                    <div class="vps-pro-content">
                        <div class="vps-pro-col-1">
                            <table>
                                <tbody>
                                    <tr><td class="vps-pro-logos mw-h3-lg" style="border-radius: 20px 0 0 0;border-right:none;"></td></tr>
                                    <tr v-for="(feat, idx) in features" :key="idx"><td>{{ feat }}</td></tr>
                                    <tr><td style="border-radius: 0 0 0 20px;">Price per month</td></tr>
                                    <tr><td class="vps-pro-bottom-td" style="border-left:none;border-bottom:none;border-right:none;"></td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="vps-pro-col-2 vps-pro-col-highlight">
                            <table class="vps-tbl">
                                <tbody>
                                    <tr><td class="vps-pro-logos vps-pro-mw-logo"><img loading="lazy" src="/assets/images/competitor/mw.svg" alt="MilesWeb" title="MilesWeb" width="117" height="40"/></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><b class="vps-pro-price">{{ milesPrice.currency }}{{ milesPrice.price.web_2[1] }}</b></td></tr>
                                    <tr><td class="vps-pro-bottom-td" style="border-bottom:none;border:none;"><div class="vps-pro-get-btn jump-to-plans">Get Started</div></td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="vps-pro-col-2">
                            <table class="vps-tbl vps-pro-mw-col">
                                <tbody>
                                    <tr><td class="vps-pro-logos vps-pro-logos-hostinger" style="border-radius: 0 20px 0 0;border-left:none;"><img class="img-fluid" :loading="activeTab === tab ? 'eager' : 'lazy'" :src="competitorForTab(tab).logo" :alt="competitorForTab(tab).name"/></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-no"></i></td></tr>
                                    <tr><td><i class="vps-pro-ys"></i></td></tr>
                                    <tr><td><i class="vps-pro-no"></i></td></tr>
                                    <tr><td><i class="vps-pro-no"></i></td></tr>
                                    <tr><td><i class="vps-pro-no"></i></td></tr>
                                    <tr><td><i class="vps-pro-no"></i></td></tr>
                                    <tr><td><i class="vps-pro-no"></i></td></tr>
                                    <tr><td><i class="vps-pro-no"></i></td></tr>
                                    <tr><td style="border-radius: 0 0 20px 0;"><b class="vps-pro-price">{{ milesPrice.currency }}{{ competitorForTab(tab).price }}</b></td></tr>
                                    <tr><td class="vps-pro-bottom-td" style="border-right:none;border-bottom:none;border-left: none;"></td></tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
.vps-pro-col-highlight{background:#f0f2ff;border-radius:0 0 20px 20px}.vps-pro-col-highlight .vps-tbl{border:2px solid var(--azure_clr)!important;border-radius:20px;background:#f5f7ff;position:relative}.vps-pro-get-btn{cursor:pointer;font-size:16px;border-radius:36px;display:inline-block;padding:12px 8px;background:var(--azure_clr);color:#fff;transition:all .3s ease-in-out;text-align:center;letter-spacing:.6px;font-weight:600;width:100%;max-width:170px;margin:10px 0 2px}.vps-pro-get-btn:hover{background:#4b43dd;color:#fff;border-color:transparent}.vps-pro-col-highlight .vps-tbl{margin-top:-2px}.vps-pro-mw-logo{border-right:none!important}.vps-pro-content{color:#123455;display:flex;background:#fff;border-radius:20px}.vps-pro-content table{border-collapse:separate;border-spacing:0;border:none}.vps-pro-mw-col .vps-pro-logos{background:0 0}.vps-tbl-flag{vertical-align:bottom}.vps-pro-col-1{width:32%;margin:0;z-index:2}.vps-pro-col-2{flex:1}.vps-pro-content td{border-bottom:1px solid #e9e9e9;border-right:1px solid #e9e9e9;height:70px;margin:0 auto;max-width:188px;padding:10px;font-size:16px;line-height:1.4}.vps-pro-content .vps-pro-col-1 td{border-left:1px solid #e9e9e9}.vps-pro-col-1 table{width:100%;border-collapse:separate;border-spacing:0}.vps-tbl{border-left:1px solid #dcdce4;text-align:center}.vps-pro-content>.vps-pro-col-2:nth-child(2) table{width:100%}.vps-pro-content>.vps-pro-col-2:last-child table{width:100%}.vps-pro-content td.vps-pro-logos{height:84px;border-top:none;vertical-align:middle;background:#f0f2ff}.vps-pro-col-highlight td.vps-pro-logos{border-radius:20px 20px 0 0}.vps-pro-col-2 table{width:100%}.vps-pro-content-2{flex:1}.vps-pro-content td,.vps-pro-content th{vertical-align:middle}.vps-pro-content td.vps-pro-cost{font-weight:700;font-size:21px;line-height:29px;color:var(--ttl_clr)}.vps-pro-col-1 td{font-weight:400;font-size:16px;line-height:1.2;padding-left:30px}.vps-pro-col-1 td.vps-pro-cost{font-size:16px;color:var(--ttl_clr);font-weight:400}.vps-pro-col-1 td,.vps-pro-content .vps-pro-mw-col td.vps-pro-cost{color:var(--ttl_clr)}.vps-pro-cost b{font-size:20px;font-weight:600;color:var(--azure_clr)}@media (max-width:1045px){.vps-pro-content td{height:80px}}.vps-pro-col-1 .mw-h3-lg{padding:25px 10px;font-weight:500!important;font-size:var(--head_three_lg)!important;color:var(--ttl_clr)!important;margin:0}.vps-pro-content td span{font-size:22px;font-weight:700}@media(max-width:768px){.vps-pro-get-btn{font-size:14px;padding:12px 6px;margin:8px 0}.vps-pro-col-1{position:sticky;left:0;background:#fff}.vps-pro-col-1 td{padding-left:10px}}.rh-license-box{padding:42px 30px;flex:1}.vps-pro-ys{color:#2bd537;position:relative;display:inline-block}.vps-pro-ys:before{content:'';position:absolute;background:url('/assets/images/common-icons/check-mark.svg') center center no-repeat;left:-2px;top:-8px;background-size:contain;width:14px;height:14px}.vps-pro-no{color:red;position:relative;display:inline-block}.vps-pro-no:before{content:'';position:absolute;background:url('/assets/images/common-icons/cross2.svg') center center no-repeat;left:-2px;top:-8px;background-size:contain;width:15px;height:14px}.vps-pro-price{font-size:26px}.com-dom-tab-btns{display:flex;align-items:center;max-width:812px;margin:0 auto 40px;background:#f2f8ff;border-radius:15px;justify-content:space-between;padding:12px 12px 12px 30px}.com-dom-tab-btn{padding:19px 25px;position:relative;border-radius:10px;cursor:pointer;background:#fff;transition:all .3s ease-in-out;margin:0 6px}.com-dom-tab-btn:hover{background:#e3f1ff}.com-dom-tab-btn img{vertical-align:middle;width:125px;object-fit:cover;height:31px}.ai-dom-default-img img{vertical-align:middle}.ai-dom-default-img{padding-right:10px}.com-dom-tab-btn.com-dom-tab-btn-active{background:var(--azure_clr)}.com-dom-tab-cont{display:none}.com-dom-tab-cont.com-dom-tab-btn-active{display:block}.domain-input2{padding-left:16px}@media(max-width:1200px){.vps-pro-content td{height:80px}.vps-pro-col-1 td{padding-left:12px}}@media(max-width:768px){.mhg-popular-btn{margin-right:0}.vps-pro-col-1 td{font-size:14px}.com-dom-tab-btn{padding:6px 8px}.com-dom-tab-btns{padding:12px 8px 12px 20px}}@media(max-width:500px){.do-domains-box .mw-col-md-2.mw-col-sm-4{width:50%}.com-dom-tab-btns{display:flex;max-width:362px;border-radius:10px;padding:10px 5px;text-align:center}.com-dom-tab-btn{padding:4px;margin:0 4px 0;text-align:center;justify-content:center;display:flex}}.com-dom-tab-cont{display:none}.com-dom-tab-cont.com-dom-tab-btn-active{display:block}.com-dom-tab-img2{display:none;transition:all .3s ease-in-out}.com-dom-tab-btn-active .com-dom-tab-img2{display:block;transition:all .3s ease-in-out}.com-dom-tab-btn-active .com-dom-tab-img1{display:none;transition:all .3s ease-in-out}@media(max-width:1024px){.vps-pro-get-btn{font-size:14px;margin-top:4px}.vps-pro-col-1{width:28%}}@media(max-width:991px){.vps-pro-cost b{font-size:18px}.vps-pro-content td{padding:6px}.vps-pro-get-btn{font-size:13px}.vps-pro-col-1{width:26%}.vps-pro-mw-logo img{max-width:94px;height:auto;}.vps-pro-content td{height:62px}.com-dom-tab-btn img{object-fit:unset}}.vps-tbl-flag{width:26px;height:26px}@media(max-width:520px){.vps-pro-col-1 td{font-size:14px}.vps-pro-content td{height:90px}.vps-pro-get-btn{font-size:11px;border-radius:6px;font-weight:500;padding:12px 8px}}@media(max-width:480px){.vps-pro-col-1 td,.vps-pro-content td{font-size:13px}.vps-pro-cost b{font-size:18px}.vps-pro-price{font-size:18px}.vps-pro-content td{padding:12px}}@media(max-width:600px){.vps-pro-col-1{width:50%}.vps-pro-content{margin:0 auto}.vps-pro-col-highlight{overflow:unset}.vps-pro-col-highlight tr td{border-right:none;border-left:none}.vps-pro-col-2{flex:unset;width:50%}}.tab-container{max-width:1246px}.vps-pro-content table tbody{border-collapse:collapse;border:none}@media(max-width:410px){.vps-pro-content td{padding:8px}.vps-pro-content td{height:99px}}.vps-pro-col-middle tr td{border-right:none}.be-why-box{border-radius:20px;padding:52px 46px}@media(max-width:768px){.vps-pro-logos img{width:78%}.vps-pro-price{font-size:20px}.tab-container{max-width:100%}}@media(max-width:630px){.vps-pro-logos img{width:64%}.vps-pro-content td{padding:10px 8px}}.vps-pro-logos-sticky{position:-webkit-sticky;position:sticky;top:80px;z-index:60;background:#f0f2ff!important;border-radius:0!important}.vps-pro-bottom-td{height:90px!important}@media(max-width:991px){.vps-pro-logos-sticky{top:76px}}@media(max-width:1260px) and (min-width:1040px){.vps-pro-logos-sticky{top:74px}}@media(max-width:630px){.vps-pro-content td{height:74px}.vps-pro-content td.vps-pro-logos{height:72px}}@media(max-width:550px){.vps-pro-content td{height:56px;padding:4px 8px}.vps-pro-content td.vps-pro-logos{height:64px}}@media(max-width:380px){.vps-pro-logos img{width:80%}}
</style>