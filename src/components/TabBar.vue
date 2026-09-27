<template>
  <div class="tab-area" v-if="tabs.length">
    <div class="tab-bar">
      <div
        v-for="tab in tabs" :key="tab.slug"
        :class="['tab-item', { active: tab.slug === activeSlug }]"
        @click="switchTab(tab.slug)"
      >
        <span class="tab-title">{{ tab.title }}</span>
        <span class="tab-close" @click.stop="close(tab.slug)">×</span>
      </div>
      <div class="tab-close-all" @click="closeAll">[关闭全部]</div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useTabs, closeTab, setActiveSlug } from '../composables/useTabs.js'
const { tabs, activeSlug } = useTabs()
const router = useRouter()
function switchTab(slug) { setActiveSlug(slug); router.push('/post/' + slug) }
function close(slug) { const next = closeTab(slug); if (next) router.push('/post/' + next); else router.push('/') }
function closeAll() {
  while (tabs.value.length) tabs.value.splice(0, 1)
  activeSlug.value = null
  sessionStorage.removeItem('blog-tabs')
  router.push('/')
}
</script>
