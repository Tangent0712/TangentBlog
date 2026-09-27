<template>
  <aside class="outline-sidebar" v-if="headings.length">
    <img class="outline-k-img" src="/decorate_photos/9.png" alt="" />
    <div class="outline-title">文章大纲</div>
    <hr class="outline-divider" />
    <nav class="outline-list">
      <span
        v-for="(h,i) in headings" :key="i"
        :class="['outline-item', 'lvl-h'+h.level, { active: activeIdx === i }]"
        @click="scrollTo(h.id)"
      >{{ h.text }}</span>
    </nav>
    <hr class="outline-divider" />
    <div class="outline-k-bottom">૮ ´͈ ᗜ `͈ ა♡</div>
  </aside>
</template>
<script setup>
defineProps({ headings: { type: Array, default: () => [] }, activeIdx: { type: Number, default: -1 } })
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
