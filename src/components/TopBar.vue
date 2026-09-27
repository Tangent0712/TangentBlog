<template>
  <header class="topbar">
    <button class="hamburger-btn" @click="$emit('toggleSidebar')" :title="sidebarOpen ? '关闭菜单' : '菜单'">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    <span class="topbar-title">{{ site.title }}</span>
    <div class="topbar-actions">
      <button class="icon-btn theme-btn" @click="$emit('toggleTheme')" :title="isDark?'亮色':'暗色'">
        {{ isDark ? '☾' : '☀' }}
      </button>
    </div>
  </header>
</template>
<script setup>
import site from '../config/site.js'
defineProps({ isDark: Boolean, sidebarOpen: Boolean })
defineEmits(['toggleTheme', 'toggleSidebar'])
</script>
