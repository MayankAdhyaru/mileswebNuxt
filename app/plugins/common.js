import { reactive } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  const common = reactive({
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

    // Function to get discount: highest or by index
    getDiscount(category, index = null) {
      const arr = this.discounts[category] || [];
      const cleaned = arr.filter(d => d && d !== '');
      if (index !== null) return cleaned[index] || '';
      const numbers = cleaned.map(d => parseInt(d)).filter(n => !isNaN(n));
      return numbers.length ? Math.max(...numbers) + '%' : '';
    },

    // Function to get save text for a plan dynamically
    getSave(planKey, index = 0) {
      const discountArr = this.discounts.web_hosting || [];
      return discountArr[index] ? `Save ${discountArr[index]}` : '';
    }
  });

  // Optional: If you want to initialize 'save' object like before
  common.save = {
    web_1: ['', common.getSave('web_1', 0)],
    web_2: ['', common.getSave('web_2', 1)],
    web_3: ['', common.getSave('web_3', 2)],
  };

  nuxtApp.provide('common', common);
});
