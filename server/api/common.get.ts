export default defineEventHandler(() => {
  const common = {
    customerCount: "60,000",
    currencySymbol: "₹",
    discounts: {
      web_hosting: ['75%', '76%', '69%'],
      cloud_hosting: ['60%', '70%', '62%'],
      smvps: ['49%', '56%', '64%', '62%'],
      smwinvps: ['50%', '46%', '50%', '47%'],
      linvps: ['47%', '47%', '50%', '49%', '48%', '47%', '48%', '50%'],
      winvps: ['43%', '46%', '46%', '50%', '50%', '50%'],
      pleskvps: ['4%', '6%', '7%', '8%'],
      dsind: ['', '20%', '20%', '20%', '20%', '20%', '50%', '50%', '10%', '10%'],
      ds: ['40%', '45%', '45%', '50%'],
      dsus: ['15%', '15%', '15%'],
      gpuds: ['15%', '15%', '15%', '15%', '15%', '15%', '15%', '15%'],
      reseller: ['60%', '60%', '60%'],
    },
    plansName: {
      web_1: "Ignite",
      web_2: "Elite",
      web_3: "Stellar",
    },
    strikePrice: {
      web_1: ['', '399.00', '399.00', ''],
      web_2: ['', '599.00', '599.00', ''],
      web_3: ['', '799.00', '799.00', ''],
    },
    price: {
      web_1: ['', '79.00', '159.00', '399.00'],
      web_2: ['', '149.00', '219.00', '599.00'],
      web_3: ['', '249.00', '349.00', '799.00'],
    },
    ratingSection : {
    showCode: true,
    trustpilot: { rating: 4.9, count: "13,017", url: "https://www.trustpilot.com/review/milesweb.com", logo: "/assets/images/hosting/trustpilot.svg", newlogo: "/assets/images/mw/trustpilot.svg"},
    hostadvice: { rating: 4.6, count: "1,603", logo: "/assets/images/hosting/hostadvice.svg", newlogo: "/assets/images/mw/hostadvice.svg" },
    google: { rating: 4.5, count: "5,637", logo: "/assets/images/hosting/google.svg", newlogo: "/assets/images/mw/google.svg" },
    wordpressHighlight: { title: "Users' First Choice!", icon: "/assets/images/home/wordpress-websites.svg", show: true }
  }
  }

  // Helper functions
  function getDiscount(category: string, index: number | null = null) {
    const arr = (common.discounts as Record<string, string[]>)[category] || []
    const cleaned = arr.filter(d => d && d !== '')
    if (index !== null) return cleaned[index] || ''
    const numbers = cleaned.map(d => parseInt(d)).filter(n => !isNaN(n))
    return numbers.length ? Math.max(...numbers) + '%' : ''
  }

  function getSave(category: string, index = 0) {
    const arr = (common.discounts as Record<string, string[]>)[category] || []
    return arr[index] ? `Save ${arr[index]}` : ''
  }

  const save = {
    web_1: ['', getSave('web_hosting', 0)],
    web_2: ['', getSave('web_hosting', 1)],
    web_3: ['', getSave('web_hosting', 2)],
  }

  // ✅ Return everything + the functions themselves
  return {
    common: {
      ...common,
      save,
      getDiscount,
      getSave
    }
  }
})
