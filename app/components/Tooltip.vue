<template>
  <span 
    class="mw-hov-tooltip-btn ml0 relative inline-block"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    ref="trigger"
  >
    <slot></slot>

    <transition name="fade">
      <span
        v-if="visible"
        ref="tooltip"
        class="mw-tooltip-text absolute z-50"
        :class="positionClass"
        v-html="tip"
        :style="tooltipStyle"
      ></span>
    </transition>
  </span>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  tip: { type: String, required: true },         // HTML content allowed
  position: { type: String, default: 'top' }     // top, bottom, left, right
})

const visible = ref(false)
const trigger = ref(null)
const tooltip = ref(null)
const tooltipStyle = ref({})

const positionClass = computed(() => `mw-tooltip-${props.position}`)

function showTooltip() {
  visible.value = true
  nextTick(() => positionTooltip())
}

function hideTooltip() {
  visible.value = false
}

function positionTooltip() {
  const t = trigger.value
  const tt = tooltip.value
  if (!t || !tt) return

  const tRect = t.getBoundingClientRect()
  const ttRect = tt.getBoundingClientRect()
  let style = {}

  switch (props.position) {
    case 'top':
      style = {
        left: `${tRect.width / 2 - ttRect.width / 2}px`,
        top: `-${ttRect.height + 10}px`
      }
      break
    case 'bottom':
      style = {
        left: `${tRect.width / 2 - ttRect.width / 2}px`,
        top: `${tRect.height + 10}px`
      }
      break
    case 'left':
      style = {
        left: `-${ttRect.width + 10}px`,
        top: `${tRect.height / 2 - ttRect.height / 2}px`
      }
      break
    case 'right':
      style = {
        left: `${tRect.width + 10}px`,
        top: `${tRect.height / 2 - ttRect.height / 2}px`
      }
      break
  }
  tooltipStyle.value = style
}
</script>

