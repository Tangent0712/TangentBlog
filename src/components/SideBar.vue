<template>
  <aside class="sidebar">
    <div class="sidebar-top">
      <div class="sidebar-logo">
        <div class="avatar">
          <img v-if="site.avatar" :src="site.avatar" :alt="site.author" />
          <span v-else>{{ site.author[0] }}</span>
        </div>
        <span class="blogger-name">{{ site.author }}</span>
      </div>
      <div class="sidebar-search">
        <span class="s-icon">⌕</span>
        <input type="text" v-model="query" placeholder="搜索文章..." @input="search" />
      </div>
      <div class="search-results" v-if="query && results.length">
        <router-link v-for="r in results" :key="r.slug" :to="'/post/'+r.slug" class="search-result-item" @click="query=''">
          <span class="sr-title">{{ r.title }}</span>
          <span class="sr-date">{{ r.date }}</span>
        </router-link>
      </div>
      <div class="search-results" v-if="query && !results.length">
        <div class="search-result-item" style="color:var(--c-text-dim)">未找到匹配文章</div>
      </div>
    </div>

    <hr class="sidebar-divider" />

    <nav class="sidebar-nav">
      <router-link to="/" :class="{ 'nav-active': isActive('/') }">
        <span class="nav-text">{{ isActive('/') ? '✦ 首页' : '首页' }}</span>
        <img class="nav-icon" src="/decorate_photos/1.png" alt="" />
      </router-link>
      <router-link to="/archives" :class="{ 'nav-active': isActive('/archives') }">
        <span class="nav-text">{{ isActive('/archives') ? '✦ 归档' : '归档' }}</span>
        <img class="nav-icon" src="/decorate_photos/2.png" alt="" />
      </router-link>
      <router-link to="/categories" :class="{ 'nav-active': isActive('/categories') || $route.path.startsWith('/categories/') }">
        <span class="nav-text">{{ isActive('/categories') || $route.path.startsWith('/categories/') ? '✦ 分类' : '分类' }}</span>
        <img class="nav-icon" src="/decorate_photos/3.png" alt="" />
      </router-link>
      <router-link to="/links" :class="{ 'nav-active': isActive('/links') }">
        <span class="nav-text">{{ isActive('/links') ? '✦ 友链' : '友链' }}</span>
        <img class="nav-icon" src="/decorate_photos/4.png" alt="" />
      </router-link>
      <router-link to="/about" :class="{ 'nav-active': isActive('/about') }">
        <span class="nav-text">{{ isActive('/about') ? '✦ 关于' : '关于' }}</span>
        <img class="nav-icon" src="/decorate_photos/5.png" alt="" />
      </router-link>
    </nav>

    <hr class="sidebar-divider" />

    <TabBar />
    <div class="sidebar-spacer"></div>

    <div class="sidebar-bottom">
      <div class="sidebar-stats" v-if="showStats">
        <span class="stats-title">ฅ^•ﻌ•^ฅ 博客统计</span>
        <span>文章: {{ stats.posts }} 篇</span>
        <span>标签: {{ stats.tags }} 个</span>
        <span>分类: {{ stats.cats }} 个</span>
        <img class="stats-decorate" src="/decorate_photos/8.png" alt="" />
      </div>
      <div class="sidebar-beian">
        <div v-for="line in site.beian" :key="line">{{ line }}</div>
        <div>&copy; {{ year }} {{ site.title }} ˶ˊᜊˋ˶</div>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './TabBar.vue'
import site from '../config/site.js'
const year = new Date().getFullYear()
const $route = useRoute()
const props = defineProps({ posts: Array, showStats: { type: Boolean, default: true } })
function isActive(path) { return $route.path === path }
const query = ref('')
const results = ref([])
function search() {
  const q = query.value.toLowerCase().trim()
  if (!q) { results.value = []; return }
  results.value = props.posts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)).slice(0, 6)
}
const stats = computed(() => ({
  posts: props.posts?.length || 0,
  tags: new Set(props.posts?.flatMap(p => p.tags) || []).size,
  cats: new Set(props.posts?.map(p => p.category) || []).size,
}))
</script>
