/*
    Converted PHP pricing data to a Nuxt 3 server API handler.
    This endpoint returns the full renewalPricing object plus several
    convenience arrays (Object.values of select categories) to preserve
    the original shape used elsewhere in the app.
*/

type PricingMap = Record<string, Record<string, Record<string, number>>>;

const renewalPricing: PricingMap = {
    "Shared Hosting": {
        "Ignite/Economy": {
            "1 month": 399,
            "12 months": 269,
            "24 months": 269,
            "36 months": 269,
            "48 months": 269,
        },
        "Elite/Premium": {
            "1 month": 599,
            "12 months": 429,
            "24 months": 429,
            "36 months": 429,
            "48 months": 429,
        },
        "Stellar/Business": {
            "1 month": 799,
            "12 months": 599,
            "24 months": 599,
            "36 months": 599,
            "48 months": 599,
        },
    },

    "Cloud Hosting": {
        "Alpha": {
            "1 month": 1499,
            "12 months": 1499,
            "24 months": 1499,
            "36 months": 1499,
            "48 months": 1499,
        },
        "Beta": {
            "1 month": 2799,
            "12 months": 2699,
            "24 months": 2699,
            "36 months": 2699,
            "48 months": 2699,
        },
        "Zeta": {
            "1 month": 4999,
            "12 months": 4999,
            "24 months": 4999,
            "36 months": 4999,
            "48 months": 4999,
        },
        "Standard": {
            "1 month": 2799,
            "12 months": 2699,
            "24 months": 2699,
            "36 months": 2699,
            "48 months": 2699,
        },
        "Advanced": {
            "1 month": 4999,
            "12 months": 4999,
            "24 months": 4999,
            "36 months": 4999,
            "48 months": 4999,
        },
    },

    "Reseller Hosting": {
        "Beginner": {
            "1 month": 799,
            "12 months": 799,
            "24 months": 799,
            "36 months": 799,
        },
        "Geek": {
            "1 month": 1599,
            "12 months": 1599,
            "24 months": 1599,
            "36 months": 1599,
        },
        "Expert": {
            "1 month": 3999,
            "12 months": 3999,
            "24 months": 3999,
            "36 months": 3999,
        },
        "Lite Reseller": {
            "1 month": 599,
            "12 months": 599,
            "24 months": 599,
            "36 months": 599,
        },
    },

    "Dedicated Servers": {
        "DS 6C": { "1 month": 5999, "3 months": 5499, "12 months": 5499 },
        "DS 1": { "1 month": 9999, "3 months": 8999, "12 months": 8999 },
        "DS 2": { "1 month": 18999, "3 months": 17999, "12 months": 17999 },
        "DS 3": { "1 month": 36999, "3 months": 33999, "12 months": 33999 },
    },

    "VDS Servers": {
        "VDS 1": { "1 month": 3999, "12 months": 3399, "24 months": 2999 },
        "VDS 2": { "1 month": 6999, "12 months": 5949, "24 months": 5249 },
        "VDS 3": { "1 month": 14999, "12 months": 12749, "24 months": 11249 },
        "VDS 4": { "1 month": 33999, "12 months": 28899, "24 months": 25499 },
    },

    "VPS Hosting": {
        "VM1": {
            "1 month": 1499,
            "3 months": 1235,
            "6 months": 1170,
            "12 months": 1040,
            "24 months": 975,
            "36 months": 910,
        },
        "VM2": {
            "1 month": 1699,
            "3 months": 1425,
            "6 months": 1350,
            "12 months": 1200,
            "24 months": 1125,
            "36 months": 1050,
        },
        "VM3": {
            "1 month": 2999,
            "3 months": 2612,
            "6 months": 2475,
            "12 months": 2200,
            "24 months": 2062,
            "36 months": 1925,
        },
        "VM4": {
            "1 month": 5499,
            "3 months": 4892,
            "6 months": 4635,
            "12 months": 4120,
            "24 months": 3862,
            "36 months": 3605,
        },
        "VM5": {
            "1 month": 9499,
            "3 months": 8550,
            "6 months": 8100,
            "12 months": 7200,
            "24 months": 6750,
            "36 months": 6300,
        },
        "VM6": {
            "1 month": 10499,
            "3 months": 9405,
            "6 months": 8910,
            "12 months": 7920,
            "24 months": 7425,
            "36 months": 6930,
        },
        "VM7": {
            "1 month": 12499,
            "3 months": 11305,
            "6 months": 10710,
            "12 months": 9520,
            "24 months": 8925,
            "36 months": 8330,
        },
        "VM8": {
            "1 month": 18499,
            "3 months": 17081,
            "6 months": 16182,
            "12 months": 14384,
            "24 months": 13485,
            "36 months": 12586,
        },
    },

    "Windows VPS Hosting": {
        "VMW1": { "1 month": 3499, "3 months": 2850, "6 months": 2700, "12 months": 2400, "24 months": 2250, "36 months": 2100 },
        "VMW2": { "1 month": 6499, "3 months": 5320, "6 months": 5040, "12 months": 4480, "24 months": 4200, "36 months": 3920 },
        "VMW3": { "1 month": 11999, "3 months": 10450, "6 months": 9900, "12 months": 8800, "24 months": 8250, "36 months": 7700 },
        "VMW4": { "1 month": 16499, "3 months": 14250, "6 months": 13500, "12 months": 12000, "24 months": 11250, "36 months": 10500 },
        "VMW5": { "1 month": 20499, "3 months": 18050, "6 months": 17100, "12 months": 15200, "24 months": 14250, "36 months": 13300 },
        "VMW6": { "1 month": 38999, "3 months": 34200, "6 months": 32400, "12 months": 28800, "24 months": 27000, "36 months": 25200 },
    },

    "Self-Managed VPS Hosting": {
        "SM-L1": { "1 month": 999, "12 months": 799, "24 months": 799 },
        "SM-L2": { "1 month": 1599, "12 months": 1199, "24 months": 1199 },
        "SM-L3": { "1 month": 2599, "12 months": 2199, "24 months": 2199 },
        "SM-L4": { "1 month": 4999, "12 months": 4399, "24 months": 4399 },
    },

    "Self-Managed Windows VPS Hosting": {
        "SM-W1": { "1 month": 3499, "12 months": 2999, "24 months": 2999 },
        "SM-W2": { "1 month": 4999, "12 months": 3999, "24 months": 3999 },
        "SM-W3": { "1 month": 8999, "12 months": 7999, "24 months": 7999 },
        "SM-W4": { "1 month": 14999, "12 months": 12999, "24 months": 12999 },
    },

    "Managed AWS Cloud Plans": {
        "AWS4GB": { "1 month": 4850, "3 months": 4850, "6 months": 4850, "12 months": 4607.5, "24 months": 4365, "36 months": 4122.5 },
        "AWS8GB": { "1 month": 8950, "3 months": 8950, "6 months": 8950, "12 months": 8502.5, "24 months": 8055, "36 months": 7607.5 },
        "AWS16GB": { "1 month": 16950, "3 months": 16950, "6 months": 16950, "12 months": 16102.5, "24 months": 15255, "36 months": 14407.5 },
        "AWS32GB": { "1 month": 32950, "3 months": 32950, "6 months": 32950, "12 months": 31302.5, "24 months": 29655, "36 months": 28007.5 },
    },

    "AI Site Builder": {
        "Premium": { "1 month": 599, "12 months": 419, "36 months": 229 },
        "Business": { "1 month": 799, "12 months": 559, "36 months": 449 },
    },

    "Business Email": {
        "Business Starter": { "1 month": 199, "12 months": 199, "24 months": 199, "36 months": 199, "48 months": 199 },
        "Business Premium": { "1 month": 299, "12 months": 299, "24 months": 299, "36 months": 299, "48 months": 299 },
    },

    "SSL": {
        "Single Domain DV SSL": { "12 months": 2999, "24 months": 2999, "36 months": 2999 },
        "Multi-domain SAN SSL": { "12 months": 12999, "24 months": 12999, "36 months": 12999 },
        "Wildcard DV SSL": { "12 months": 19999, "24 months": 19999, "36 months": 19999 },
        "True BusinessID with EV": { "12 months": 12999, "24 months": 12999, "36 months": 12999 },
    },
};

const Shared_Plans = Object.values(renewalPricing['Shared Hosting'] ?? {});
const Cloud_Plans = Object.values(renewalPricing['Cloud Hosting'] ?? {});
const Reseller_Plans = Object.values(renewalPricing['Reseller Hosting'] ?? {});
const Dedicated_Plans = Object.values(renewalPricing['Dedicated Servers'] ?? {});
const VDS_Plans = Object.values(renewalPricing['VDS Servers'] ?? {});
const VPS_Plans = Object.values(renewalPricing['VPS Hosting'] ?? {});
const WV_Plans = Object.values(renewalPricing['Windows VPS Hosting'] ?? {});
const SMV_Plans = Object.values(renewalPricing['Self-Managed VPS Hosting'] ?? {});
const SMWV_Plans = Object.values(renewalPricing['Self-Managed Windows VPS Hosting'] ?? {});
const MAWS_Cloud_Plans = Object.values(renewalPricing['Managed AWS Cloud Plans'] ?? {});
const AI_Builder_Plans = Object.values(renewalPricing['AI Site Builder'] ?? {});
const Business_Email_Plans = Object.values(renewalPricing['Business Email'] ?? {});
const SSL = Object.values(renewalPricing['SSL'] ?? {});

export default defineEventHandler(() => {
    return {
        renewalPricing,
        Shared_Plans,
        Cloud_Plans,
        Reseller_Plans,
        Dedicated_Plans,
        VDS_Plans,
        VPS_Plans,
        WV_Plans,
        SMV_Plans,
        SMWV_Plans,
        MAWS_Cloud_Plans,
        AI_Builder_Plans,
        Business_Email_Plans,
        SSL
    };
});
