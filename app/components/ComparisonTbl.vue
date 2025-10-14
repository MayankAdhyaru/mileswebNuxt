<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ComparisonMobTbl from './ComparisonMobTbl.vue'

// Use server-side fetch for stable initial HTML to avoid hydration mismatch
const { data: commonData } = await useAsyncData('comparison-common', () => $fetch('/api/common'))
const { data: renewalData } = await useAsyncData('comparison-renewal', () => $fetch('/api/renewalPrice'))

// --- Reactive State (client-only mutations still allowed) ---
const isMobile = ref(false) // used purely for client-side UX, do not branch template on it
const milesPrice = ref<{ price: Record<string, any>; currency: string }>({
  price: { web_2: 0 },
  currency: '₹'
})
const milesRenewal = ref<string | number>('')
const competitorCols = ref<Array<any>>([])

const features = [
'Company origin: India',
  'NVMe storage',
  'Website hosting limit',
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

// Initialize from server-fetched payloads so SSR and client initial render match
if (commonData?.value) {
  const payload: any = commonData.value
  milesPrice.value.price = payload.price ?? milesPrice.value.price
  milesPrice.value.currency = payload.currencySymbol ?? '₹'
}

if (renewalData?.value) {
  const payload: any = renewalData.value
  // Provide a stable default competitor list (server-side) so number of columns is deterministic
  competitorCols.value = payload?.competitors ?? [
    {
      name: 'GoDaddy',
      logo: '/assets/images/mw/godaddy.svg',
      price: '329.00',
      renewal: '699.00',
      features: [false, true, 10, false, true, false, false, false, false, false, false, false]
    },
    {
      name: 'Hostinger',
      logo: '/assets/images/mw/hostinger.svg',
      price: '149.00',
      renewal: '449.00',
      features: [false, false, 25, false, false, true, true, true, false, false, false, false]
    },
    {
      name: 'Bluehost',
      logo: '/assets/images/mw/bluehost.svg',
      price: '279.00',
      renewal: '499.00',
      features: [false, false, 'Unlimited', false, true, false, true, false, false, false, false, false]
    }
  ]

  const rp = payload?.renewalPricing ?? payload
  if (rp?.['Shared Hosting']?.['Elite/Premium']) {
    const renewal = rp?.['Shared Hosting']?.['Elite/Premium']?.['36 months']
    milesRenewal.value = renewal ? `${renewal}.00` : ''
  }
}

// --- Client-only behavior: resize & sticky scroll ---
let handleStickyScroll: (() => void) | null = null
const handleResize = () => {
  isMobile.value = window.innerWidth <= 630
}

onMounted(() => {
  // run client-only listeners
  handleResize()
  window.addEventListener('resize', handleResize)

  // Keep sticky behavior client-only and idempotent
  handleStickyScroll = () => {
    const activeParent = document.querySelector('.tab-container') as HTMLElement | null
    if (!activeParent) return
    const targets = activeParent.querySelectorAll('td.vps-pro-logos')
    if (!targets.length) return

    const rect = activeParent.getBoundingClientRect()
    const isSticky = rect.top <= 0
    targets.forEach(td => td.classList.toggle('vps-pro-logos-sticky', isSticky))
  }
  window.addEventListener('scroll', handleStickyScroll)
})

onBeforeUnmount(() => {
  if (handleStickyScroll) window.removeEventListener('scroll', handleStickyScroll)
  window.removeEventListener('resize', handleResize)
})
</script>


<template>
    <div>
        <section class="inc-offers-com" v-if="!isMobile">
            <div class="pb-45 pt-45">
                <div class="mw-container">
                    <div class="title-center pb-45">
                        <h2 class="mw-h2">MilesWeb vs Others: Who delivers more value?</h2>
                        <p class="mw-p">We’ve compared MilesWeb with leading hosts to help you make the smarter choice.</p>
                    </div>
                </div>

                <div class="tab_container_gb">
                    <div class="tab-container mw-container">
                        <div class="vps-pro-content">

                            <!-- Left column: features list -->
                            <div class="vps-pro-col-1">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td class="vps-pro-logos mw-h3-lg" style="border-radius: 20px 0 0 0;border-right:none;"></td>
                                        </tr>
                                        <!-- <tr>
                                            <td class="vps-pro-cost vps-pro-br-none"><b>Features</b></td>
                                        </tr> -->
                                        <tr v-for="(feat, idx) in features" :key="idx"><td>{{ feat }}</td></tr>
                                        <tr><td class="vps-pro-cost vps-pro-br-none"><b>Price</b></td></tr>
                                        <tr><td>Price per month</td></tr>
                                        <tr><td style="border-radius: 0 0 0 20px;">Renewal price</td></tr>
                                        <tr><td class="vps-pro-bottom-td" style="border-left:none;border-bottom:none;border-right:none;"></td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- MilesWeb Column -->
                            <div class="vps-pro-col-2 vps-pro-col-highlight">
                                <table class="vps-tbl">
                                    <tbody>
                                        <tr>
                                            <td class="vps-pro-logos vps-pro-mw-logo">
                                                <img loading="lazy" src="/assets/images/mw/milesweb.svg" alt="MilesWeb" title="MilesWeb" />
                                            </td>
                                        </tr>

                                        <!-- <tr><td class="vps-pro-br-none"></td></tr> -->
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td>25</td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td><i class="vps-pro-ys"></i></td></tr>
                                        <tr><td class="vps-pro-cost vps-pro-br-none"></td></tr>
                                        <tr><td><b class="vps-pro-price">{{ milesPrice.currency }}{{ milesPrice.price.web_2[1] }}</b></td></tr>
                                        <tr><td><b>{{ milesPrice.currency }}{{ milesRenewal }}</b></td></tr>
                                        <tr>
                                            <td class="vps-pro-bottom-td" style="border-bottom:none;border:none;">
                                                <div class="vps-pro-get-btn jump-to-plans">Get Started</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Competitor Columns -->
                            <div v-for="(col, i) in competitorCols" :key="i" class="vps-pro-col-2">
                                <table class="vps-tbl vps-pro-mw-col">
                                    <tbody>
                                        <tr>
                                            <td class="vps-pro-logos vps-pro-logos-hostinger">
                                                <img class="no-hw-attribute" loading="lazy" :src="col.logo" :alt="col.name" :title="col.name" />
                                            </td>
                                        </tr>
                                        <!-- <tr><td class="vps-pro-br-none"></td></tr> -->

                                        <tr><td><i :class="col.features[0] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[1] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[2] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[3] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[4] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[5] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[6] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[7] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[8] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[9] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[10] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td><i :class="col.features[11] ? 'vps-pro-ys' : 'vps-pro-no'"></i></td></tr>
                                        <tr><td class="vps-pro-cost vps-pro-br-none"></td></tr>
                                        <tr><td><b class="vps-pro-price">{{ milesPrice.currency }}{{ col.price }}</b></td></tr>
                                        <tr><td><b>{{ milesPrice.currency }}{{ col.renewal }}</b></td></tr>
                                        <tr><td class="vps-pro-bottom-td" style="border-right:none;border-bottom:none;border-left: none;"></td></tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Mobile fallback -->
        <div v-else>
            <ComparisonMobTbl/>
        </div>
    </div>
</template>

<style scoped>
.vps-pro-col-highlight{background:#f0f2ff;border-radius:0 0 20px 20px}.vps-pro-col-highlight .vps-tbl{border:2px solid var(--azure_clr)!important;border-radius:20px;background:#f5f7ff;position:relative}.vps-pro-get-btn{cursor:pointer;font-size:16px;border-radius:36px;display:inline-block;padding:12px 8px;background:var(--azure_clr);color:#fff;transition:all .3s ease-in-out;text-align:center;letter-spacing:.6px;font-weight:600;width:100%;max-width:170px;margin:10px 0 2px}.vps-pro-get-btn:hover{background:#4b43dd;color:#fff;border-color:transparent}.vps-pro-col-highlight .vps-tbl{margin-top:-2px}.vps-pro-mw-logo{border-right:none!important}.vps-pro-content{color:#123455;display:flex;background:#fff;border-radius:20px}.vps-pro-content table{border-collapse:separate;border-spacing:0;border:none}.vps-pro-mw-col .vps-pro-logos{background:0 0}.vps-tbl-flag{vertical-align:bottom}.vps-pro-col-1{width:32%;margin:0;z-index:2}.vps-pro-col-2{flex:1}.vps-pro-content td{border-bottom:1px solid #e9e9e9;border-right:1px solid #e9e9e9;height:70px;margin:0 auto;max-width:188px;padding:10px;font-size:16px;line-height:1.4}.vps-pro-content .vps-pro-col-1 td{border-left:1px solid #e9e9e9}.vps-pro-col-1 table{width:100%;border-collapse:separate;border-spacing:0}.vps-tbl{border-left:1px solid #dcdce4;text-align:center}.vps-pro-content>.vps-pro-col-2:nth-child(2) table{width:100%}.vps-pro-content>.vps-pro-col-2:last-child table{width:100%}.vps-pro-content td.vps-pro-logos{height:84px;border-top:none;vertical-align:middle;background:#f0f2ff}.vps-pro-col-highlight td.vps-pro-logos{border-radius:20px 20px 0 0}.vps-pro-col-2 table{width:100%}.vps-pro-content-2{flex:1}.vps-pro-content td,.vps-pro-content th{vertical-align:middle}.vps-pro-content td.vps-pro-cost{font-weight:700;font-size:21px;line-height:29px;color:var(--ttl_clr)}.vps-pro-col-1 td{font-weight:400;font-size:16px;line-height:1.2;padding-left:30px}.vps-pro-col-1 td.vps-pro-cost{font-size:16px;color:var(--ttl_clr);font-weight:400}.vps-pro-col-1 td,.vps-pro-content .vps-pro-mw-col td.vps-pro-cost{color:var(--ttl_clr)}.vps-pro-cost b{font-size:20px;font-weight:600;color:var(--azure_clr)}@media (max-width:1045px){.vps-pro-content td{height:80px}}.vps-pro-col-1 .mw-h3-lg{padding:25px 10px;font-weight:500!important;font-size:var(--head_three_lg)!important;color:var(--ttl_clr)!important;margin:0}.vps-pro-content td span{font-size:22px;font-weight:700}@media(max-width:768px){.vps-pro-get-btn{font-size:14px;padding:12px 6px;margin:8px 0}.vps-pro-col-1{position:sticky;left:0;background:#fff}.vps-pro-col-1 td{padding-left:10px}}.rh-license-box{padding:42px 30px;flex:1}.vps-pro-ys{color:#2bd537;position:relative;display:inline-block}.vps-pro-ys:before{content:'';position:absolute;background:url('/assets/images/common-icons/check-mark.svg') center center no-repeat;left:-2px;top:-8px;background-size:contain;width:14px;height:14px}.vps-pro-no{color:red;position:relative;display:inline-block}.vps-pro-no:before{content:'';position:absolute;background:url('/assets/images/common-icons/cross2.svg') center center no-repeat;left:-2px;top:-8px;background-size:contain;width:15px;height:14px}.vps-pro-price{font-size:26px}.com-dom-tab-btns{display:flex;align-items:center;max-width:812px;margin:0 auto 40px;background:#f2f8ff;border-radius:15px;justify-content:space-between;padding:12px 12px 12px 30px}.com-dom-tab-btn{padding:19px 25px;position:relative;border-radius:10px;cursor:pointer;background:#fff;transition:all .3s ease-in-out;margin:0 6px}.com-dom-tab-btn:hover{background:#e3f1ff}.com-dom-tab-btn img{vertical-align:middle;width:125px;object-fit:cover;height:31px}.ai-dom-default-img img{vertical-align:middle}.ai-dom-default-img{padding-right:10px}.com-dom-tab-btn.com-dom-tab-btn-active{background:var(--azure_clr)}.com-dom-tab-cont{display:none}.com-dom-tab-cont.com-dom-tab-btn-active{display:block}.domain-input2{padding-left:16px}@media(max-width:1200px){.vps-pro-content td{height:80px}.vps-pro-col-1 td{padding-left:12px}}@media(max-width:768px){.mhg-popular-btn{margin-right:0}.vps-pro-col-1 td{font-size:14px}.com-dom-tab-btn{padding:6px 8px}.com-dom-tab-btns{padding:12px 8px 12px 20px}}@media(max-width:500px){.do-domains-box .mw-col-md-2.mw-col-sm-4{width:50%}.com-dom-tab-btns{display:flex;max-width:362px;border-radius:10px;padding:10px 5px;text-align:center}.com-dom-tab-btn{padding:4px;margin:0 4px 0;text-align:center;justify-content:center;display:flex}}.com-dom-tab-cont{display:none}.com-dom-tab-cont.com-dom-tab-btn-active{display:block}.com-dom-tab-img2{display:none;transition:all .3s ease-in-out}.com-dom-tab-btn-active .com-dom-tab-img2{display:block;transition:all .3s ease-in-out}.com-dom-tab-btn-active .com-dom-tab-img1{display:none;transition:all .3s ease-in-out}@media(max-width:1024px){.vps-pro-get-btn{font-size:14px;margin-top:4px}.vps-pro-col-1{width:28%}}@media(max-width:991px){.vps-pro-cost b{font-size:18px}.vps-pro-content td{padding:6px}.vps-pro-get-btn{font-size:13px}.vps-pro-col-1{width:26%}.vps-pro-mw-logo img{max-width:94px;height:auto;}.vps-pro-content td{height:62px}.com-dom-tab-btn img{object-fit:unset}}.vps-tbl-flag{width:26px;height:26px}@media(max-width:520px){.vps-pro-col-1 td{font-size:14px}.vps-pro-content td{height:90px}.vps-pro-get-btn{font-size:11px;border-radius:6px;font-weight:500;padding:12px 8px}}@media(max-width:480px){.vps-pro-col-1 td,.vps-pro-content td{font-size:13px}.vps-pro-cost b{font-size:18px}.vps-pro-price{font-size:18px}.vps-pro-content td{padding:12px}}@media(max-width:600px){.vps-pro-col-1{width:50%}.vps-pro-content{margin:0 auto}.vps-pro-col-highlight{overflow:unset}.vps-pro-col-highlight tr td{border-right:none;border-left:none}.vps-pro-col-2{flex:unset;width:50%}}.tab-container{max-width:1246px}.vps-pro-content table tbody{border-collapse:collapse;border:none}@media(max-width:410px){.vps-pro-content td{padding:8px}.vps-pro-content td{height:99px}}.vps-pro-col-middle tr td{border-right:none}.be-why-box{border-radius:20px;padding:52px 46px}@media(max-width:768px){.vps-pro-logos img{width:78%}.vps-pro-price{font-size:20px}.tab-container{max-width:100%}}@media(max-width:630px){.vps-pro-logos img{width:64%}.vps-pro-content td{padding:10px 8px}}.vps-pro-logos-sticky{position:-webkit-sticky;position:sticky;top:80px;z-index:60;background:#f0f2ff!important;border-radius:0!important}.vps-pro-bottom-td{height:90px!important}@media(max-width:991px){.vps-pro-logos-sticky{top:76px}}@media(max-width:1260px) and (min-width:1040px){.vps-pro-logos-sticky{top:74px}}@media(max-width:630px){.vps-pro-content td{height:74px}.vps-pro-content td.vps-pro-logos{height:72px}}@media(max-width:550px){.vps-pro-content td{height:56px;padding:4px 8px}.vps-pro-content td.vps-pro-logos{height:64px}}@media(max-width:380px){.vps-pro-logos img{width:80%}}
</style>