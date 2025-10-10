<script setup>
import { ref } from "vue";

defineProps({
    title: String,
    description: String,
    faqlist: { type: Array, default: () => [] },
});

const activeIndex = ref(null);
const toggleFaq = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
    <section class="sections-space">
        <div class="mw_faqs_bg">
            <div class="mw-container">
                <div class="mw-row">
                    <div class="mw-col-md-5">
                        <h2 class="mw-h2" v-html="title"></h2>
                        <p class="mw-p pb-45" v-html="description"></p>

                        <div class="mw_faq_ans_box">
                            <div>
                                <img class="img-fluid" src="/assets/images/mw/superior-support.png" loading="lazy"
                                    alt="Have more questions | MilesWeb India"
                                    title="Have more questions | MilesWeb India" />
                            </div>
                            <div class="mw-h3 mw_faq_ans_box_h3 fff pt-10 pb-10">
                                Have more questions?
                            </div>
                            <p class="mw-h3-p mw_faq_ans_box_h3_p">
                                Get instant, personalized answers about our web hosting plans,
                                features, or anything else you need to know to get your site
                                online.
                            </p>
                            <a href="javascript:void(Tawk_API.toggle())" class="mw-btn">Live chat</a>
                        </div>
                    </div>

                    <div class="mw-col-md-7">
                        <div v-for="(faq, index) in faqlist" :key="index" class="mw_faq_box mw_faq_acc-item"
                            :class="{ 'mw_faq_acc-open': activeIndex === index }">
                            <h3 class="mw-h4 mw_faq_h4 mw_faq_acc_trigger" @click="toggleFaq(index)"
                                v-html="faq.question"></h3>

                            <div class="mw_faq_acc-content" v-show="activeIndex === index" v-html="faq.answer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
