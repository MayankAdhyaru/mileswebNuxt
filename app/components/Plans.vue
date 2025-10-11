<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  plan: { type: Object, required: true },
  index: { type: Number, required: true },
  showHiddenAll: { type: Boolean, default: false },
})

// Equivalent of PHP class logic
const bestDealsMain = ref('')
const bestDeals = ref('')
const planMarginTop = ref('')
const freeDomainHidePlan = ref('')
const cheapHidePlan = ref('')

if (props.index === 1) freeDomainHidePlan.value = 'free_hide_plan'
if (props.index === 2 || props.index === 7) {
  bestDealsMain.value = 'plan-recom-offer-col'
  bestDeals.value = 'Most Popular'
}
if ([5, 6, 7, 8].includes(props.index))
  planMarginTop.value = 'mw-sm-mt-plan'
if (props.index === 5) cheapHidePlan.value = 'cheap_hide_plan'

const planClasses = computed(() =>
  [
    'plan-col hide_plan',
    bestDealsMain.value,
    freeDomainHidePlan.value,
    cheapHidePlan.value,
    planMarginTop.value,
  ].join(' ')
)
</script>

<template>
  <div :class="planClasses">
    <div class="mvh-plan-ttl-box">
      <div class="position-relative">
        <div v-if="bestDeals" class="plan-best-deal">
          <div class="plan-recom-h3">{{ bestDeals }}</div>
        </div>
        <div class="title-right">
          <img
            class="img-fluid"
            :src="plan.plan_ttl_img"
            :alt="plan.plan_ttl_img_alt"
            :title="plan.plan_ttl_img_alt"
          />
        </div>
      </div>

      <!-- Dual Labels -->
      <div
        v-if="plan.both_label1 && plan.both_label2"
        class="d-flex dh-plan-label-flex"
      >
        <div class="dh-plan-label dh-plan-label1">{{ plan.both_label1 }}</div>
        <div class="dh-plan-label">{{ plan.both_label2 }}</div>
      </div>

      <!-- Single Label -->
      <div v-else-if="plan.single_label" class="title-right">
        <div class="dh-plan-label">{{ plan.single_label }}</div>
      </div>

      <div class="plan-h4" v-html="plan.title"></div>
      <div v-if="plan.subtitle" class="plan-p" v-html="plan.subtitle"></div>

      <div class="plan-price-wrapper">
        <div class="strike" v-html="plan.strike_price"></div>
        <div class="price" v-html="plan.price"></div>
        <div class="save" v-html="plan.save"></div>
      </div>

      <div v-html="plan.free_months"></div>
      <a :href="plan.buy_link" class="plan-btn">Buy Now</a>
    </div>

    <!-- Plan Content -->
    <div class="plan-content">
      <!-- new_plan_list_node -->
      <template v-if="plan.new_plan_list_node">
        <template
          v-for="(features, sectionTitle) in plan.new_plan_list_node"
          :key="'node-'+sectionTitle"
        >
          <div class="plan-list-ttl">{{ sectionTitle }}</div>
          <ul class="plan-list plan-list-box nodejs-plans-line">
            <li
              v-for="(feature, i) in features"
              :key="i"
              :class="{ plan_cross: feature.cross }"
            >
              <div class="plan-txt">
                <span
                  class="plan-txt-b1"
                  v-html="feature.label"
                  :title="feature.tooltip || ''"
                  :class="{ 'plans-border': feature.tooltip }"
                ></span>
              </div>
            </li>
          </ul>
        </template>
      </template>

      <!-- plan.features -->
      <ul class="plan-list plan-list-box">
        <li
          v-for="(feature, i) in plan.features"
          :key="'feature-'+i"
          :class="{ plan_cross: feature.cross }"
        >
          <div class="plan-txt">
            <span
              class="plan-txt-b1"
              v-html="feature.label"
              :title="feature.tooltip || ''"
              :class="{ 'plans-border': feature.tooltip }"
            ></span>

            <span
              v-if="feature.newtag"
              style="color:#F15A05;border:1px solid #F15A05;border-radius:2px;background:#FFFAF6;padding:3px 10px;font-size:12px;margin-left:7px;font-weight:600;line-height:3;"
            >
              New
            </span>

            <span
              v-if="feature.freeDomain"
              class="hlt_prtn_2"
            >
              ({{ feature.freeDomainValue }}) value
            </span>
          </div>
        </li>
      </ul>

      <!-- new_plan_list -->
      <template v-if="plan.new_plan_list">
        <template
          v-for="(features, sectionTitle) in plan.new_plan_list"
          :key="'newlist-'+sectionTitle"
        >
          <div class="plan-list-ttl">{{ sectionTitle }}</div>
          <ul class="plan-list plan-list-box">
            <li
              v-for="(feature, i) in features"
              :key="'newlist-item-'+i"
              :class="{ plan_cross: feature.cross }"
            >
              <div class="plan-txt">
                <span
                  class="plan-txt-b1"
                  v-html="feature.label"
                  :title="feature.tooltip || ''"
                  :class="{ 'plans-border': feature.tooltip }"
                ></span>
              </div>
            </li>
          </ul>
        </template>
      </template>

      <!-- hidden_features (controlled by parent) -->
      <template v-if="plan.hidden_features">
        <transition name="fade">
          <div v-if="showHiddenAll" class="hidden-menu">
            <template
              v-for="(features, sectionTitle) in plan.hidden_features"
              :key="'hidden-'+sectionTitle"
            >
              <div class="plan-list-ttl">{{ sectionTitle }}</div>
              <ul class="plan-list plan-list-box">
                <li
                  v-for="(feature, i) in features"
                  :key="'hidden-item-'+i"
                  :class="{ plan_cross: feature.cross }"
                >
                  <div class="plan-txt">
                    <span
                      class="plan-txt-b1"
                      v-html="feature.label"
                      :title="feature.tooltip || ''"
                      :class="{ 'plans-border': feature.tooltip }"
                    ></span>
                  </div>
                </li>
              </ul>
            </template>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<style scoped>
.dh-plan-label-flex {
  justify-content: end;
}
.dh-plan-label1 {
  margin-right: 8px;
}
.dh-plan-label {
  color: #1B46BF;
  font-size: 12px;
  font-weight: 600;
  border-radius: 23px;
  background: #EAF1FF;
  display: inline-block;
  padding: 8px 11px;
  margin-bottom: 15px;
  position: relative;
  z-index: 99;
  letter-spacing: 0.4px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
