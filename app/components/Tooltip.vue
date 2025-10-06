<template>
  <span 
    class="mw-hov-tooltip-btn relative inline-block"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    ref="trigger"
  >
    <slot></slot>

    <transition name="fade">
      <span
        v-if="visible"
        ref="tooltip"
        class="mw-tooltip-text"
        :class="`${actualPosition}`"
        v-html="tip"
        :style="tooltipStyle"
      ></span>
    </transition>
  </span>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  tip: { type: String, required: true },         // HTML allowed
  position: { type: String, default: 'top' }     // preferred position
})

const visible = ref(false)
const trigger = ref(null)
const tooltip = ref(null)
const tooltipStyle = ref({})
const actualPosition = ref(props.position) // dynamic — will change if needed

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
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // Determine available space
  const spaceTop = tRect.top
  const spaceBottom = viewportHeight - (tRect.top + tRect.height)
  const spaceLeft = tRect.left
  const spaceRight = viewportWidth - (tRect.left + tRect.width)

  // pick best position
  let chosen = props.position
  if (chosen === 'bottom' && spaceBottom < ttRect.height + 10) {
    if (spaceTop > ttRect.height + 10) chosen = 'top'
    else if (spaceRight > ttRect.width + 10) chosen = 'right'
    else if (spaceLeft > ttRect.width + 10) chosen = 'left'
  } 
  else if (chosen === 'top' && spaceTop < ttRect.height + 10) {
    if (spaceBottom > ttRect.height + 10) chosen = 'bottom'
    else if (spaceRight > ttRect.width + 10) chosen = 'right'
    else if (spaceLeft > ttRect.width + 10) chosen = 'left'
  } 
  else if (chosen === 'left' && spaceLeft < ttRect.width + 10) {
    if (spaceRight > ttRect.width + 10) chosen = 'right'
    else if (spaceTop > ttRect.height + 10) chosen = 'top'
    else if (spaceBottom > ttRect.height + 10) chosen = 'bottom'
  } 
  else if (chosen === 'right' && spaceRight < ttRect.width + 10) {
    if (spaceLeft > ttRect.width + 10) chosen = 'left'
    else if (spaceTop > ttRect.height + 10) chosen = 'top'
    else if (spaceBottom > ttRect.height + 10) chosen = 'bottom'
  }

  actualPosition.value = chosen

  // compute tooltip offset
  let style = {}
  switch (chosen) {
    case 'top':
      style = {
        opacity:1,
        left: `${tRect.width / 2 - ttRect.width / 2}px`,
        top: `-${ttRect.height + 10}px`
      }
      break
    case 'bottom':
      style = {
        opacity:1,
        left: `${tRect.width / 2 - ttRect.width / 2}px`,
        top: `${tRect.height + 10}px`
      }
      break
    case 'left':
      style = {
        opacity:1,
        left: `-${ttRect.width + 10}px`,
        top: `${tRect.height / 2 - ttRect.height / 2}px`
      }
      break
    case 'right':
      style = {
        opacity:1,
        left: `${tRect.width + 10}px`,
        top: `${tRect.height / 2 - ttRect.height / 2}px`
      }
      break
  }

  tooltipStyle.value = style
}
</script>
