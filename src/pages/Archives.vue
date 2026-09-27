<template>
  <div class="content-area">
    <div class="page-header pink">ฅ^•ﻌ•^ฅ 文章归档 ฅ^•ﻌ•^ฅ</div>
    <div class="archive-card" v-for="group in archives" :key="group.year">
      <div class="archive-year-header">˶ᵔ ᵕ ᵔ˶ {{ group.year }} 年 ˶ᵔ ᵕ ᵔ˶</div>
      <div v-for="month in group.months" :key="month.month">
        <div class="archive-month">
          <div class="archive-month-label">{{ month.month }} 月</div>
          <div class="archive-month-posts">
            <div class="archive-post-row" v-for="p in month.posts" :key="p.slug">
              <router-link :to="'/post/'+p.slug" class="archive-post-title">&gt; {{ p.title }}</router-link>
              <span class="archive-post-date">{{ p.date.slice(5) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { posts } from '../data/loader.js'
const archives = computed(() => {
  const map = {}
  for (const p of posts) {
    const [y, m] = p.date.split('-')
    if (!map[y]) map[y] = {}
    if (!map[y][m]) map[y][m] = []
    map[y][m].push(p)
  }
  return Object.entries(map).sort((a,b)=>b[0]-a[0]).map(([year, months]) => ({
    year,
    months: Object.entries(months).sort((a,b)=>b[0]-a[0]).map(([month, posts]) => ({ month, posts }))
  }))
})
</script>
