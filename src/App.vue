<template>
  <div class="app" :class="{ dark: isDark, 'sidebar-open': sidebarOpen }">
    <TopBar :isDark="isDark" :sidebarOpen="sidebarOpen" @toggle-theme="toggleTheme" @toggleSidebar="sidebarOpen=!sidebarOpen" />
    <div class="sidebar-overlay" v-if="sidebarOpen" @click="sidebarOpen=false"></div>
    <SideBar :posts="posts" :class="{ open: sidebarOpen }" />
    <router-view :posts="posts" :key="$route.fullPath" />
    <ScrollTop />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import TopBar from './components/TopBar.vue'
import SideBar from './components/SideBar.vue'
import ScrollTop from './components/ScrollTop.vue'
import { posts, allPosts } from './data/loader.js'
import { openTab, setActiveSlug } from './composables/useTabs.js'

const route = useRoute()
const isDark = ref(false)
const sidebarOpen = ref(false)

watch(() => route.path, (path) => {
  sidebarOpen.value = false
  if (path.startsWith('/post/')) {
    const slug = path.replace('/post/', '')
    const post = allPosts.find(p => p.slug === slug)
    openTab(slug, post ? post.title : slug)
  } else {
    setActiveSlug(null)
  }
}, { immediate: true })

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
