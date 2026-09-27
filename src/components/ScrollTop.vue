<template>
  <div
    class="scroll-top" :class="{ visible }"
    @click="scrollToTop"
    :style="{ '--pct': pct + '%' }"
  >
    <span class="scroll-top-icon">↑</span>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const pct = ref(0)
const visible = ref(false)
let el = null
let handler = null
let initRetries = 0

function bindScroll() {
  if (el && handler) {
    el.removeEventListener('scroll', handler)
  }
  el = document.querySelector('.content-area')
  handler = handler || (() => requestAnimationFrame(update))
  if (el) {
    el.addEventListener('scroll', handler, { passive: true })
    update()
    return true
  }
  return false
}

function update() {
  const target = el
  if (!target) return
  const scrollTop = target.scrollTop
  const h = target.scrollHeight - target.clientHeight
  if (h <= 0) { visible.value = false; return }
  pct.value = Math.min(100, Math.round((scrollTop / h) * 100))
  visible.value = scrollTop > 200
}

function scrollToTop() {
  if (el) el.scrollTo({ top: 0, behavior: 'smooth' })
}

function tryInit() {
  if (bindScroll()) return
  if (++initRetries < 20) {
    setTimeout(tryInit, 150)
  }
}

onMounted(() => {
  tryInit()
})

onBeforeUnmount(() => {
  if (handler && el) el.removeEventListener('scroll', handler)
})
</script>
