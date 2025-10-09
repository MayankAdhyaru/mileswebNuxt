<script setup>
defineProps({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    btn: {
        text: { type: String, required: true },
        link: { type: String, required: true },
    },

})
</script>
<template>
    <section class="pt-45 pb-45 px-md-6">
        <div class="mw-container">
            <div class="mw-row mw-container mw_migration_box">
                <div class="mw-row mw-align-center">
                    <div class="mw-col-lg-6 pr-16">
                        <div class="mw_migration_content">
                            <h2 class="fff mw-h2" v-html="title"></h2>
                        <p class="mw-p" v-html="description"></p>
                        <a v-if="btn.link" :href="btn.link" class="mw-btn" v-html="btn.text"></a>
                        <span v-else class="mw-btn jump-to-plans" v-html="btn.text"></span>
                        </div>
                    </div>
                    <div class="mw-col-lg-6 pt-lg-30 mw_migration_img">
                        <div><img class="img-fluid" :src="image" loading="lazy" :alt="alt" :title="alt"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
.mw_migration_box{background: linear-gradient(165deg, #000 74.17%, #22145f 98%);border-radius:24px;padding:0px 0px 0 52px;position:relative;overflow:hidden;z-index:1}.mw_migration_box:before{display:none;position:absolute;content:'';right:0;bottom:0;width:571px;height:471px;background:url('/assets/images/mw/grid-box.png') center center no-repeat;z-index:-1}.mw_migration_box .mw-p{color:#d6d6d6;padding-bottom:40px}@media(max-width:1200px){.mw_migration_box .mw-p{padding-bottom:24px}}@media(max-width:991px){.mw_migration_box{padding:46px 34px 16px}.mw_migration_box:before{display:none}}@media(max-width:600px){.mw_migration_img{display:none;}.mw_migration_box {padding: 40px 0px 40px;justify-content:center;}.mw_migration_content{padding:0 15px;}}
</style>