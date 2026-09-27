<template>
  <div class="content-area">
    <!-- Category detail: show articles in this category -->
    <div v-if="props.name">
      <div class="page-header green" style="display:flex;justify-content:space-between;align-items:center">
        <span>{{ props.name }}</span>
        <router-link to="/categories" style="font-size:12px;color:#2d2d2d">[ 返回 ]</router-link>
      </div>
      <div class="post-list-wrapper">
        <div class="post-list-item" v-for="post in catPosts" :key="post.slug">
          <div class="post-list-top">
            <router-link :to="'/post/'+post.slug" class="post-list-title">&gt; {{ post.title }}</router-link>
            <span class="post-list-date">{{ post.date }}</span>
          </div>
          <div class="post-list-meta">
            <span class="post-list-cat">{{ post.category }}</span>
            <span class="post-list-tags">{{ post.tags.join(', ') }}</span>
          </div>
          <div class="post-list-desc">{{ toExcerpt(post) }}</div>
        </div>
      </div>
      <p v-if="!catPosts.length" style="padding:20px;color:var(--c-text-dim)">该分类下暂无文章。</p>
    </div>

    <!-- Category overview: list all categories -->
    <div v-else>
      <div class="page-header green">(=^･ｪ･^=) 文章分类 (=^･ｪ･^=)</div>
      <div class="cat-grid">
        <div class="cat-row" v-for="(row,i) in catRows" :key="i">
          <router-link v-for="cat in row" :key="cat.name" :to="'/categories/'+encodeURIComponent(cat.name)" class="cat-card">
            <div class="cat-card-title">✦ {{ cat.name }}</div>
            <div class="cat-card-info">
              <span class="cat-card-count">文章: {{ cat.count }} 篇</span>
              <span class="cat-card-link">[ 浏览 ]</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { posts } from '../data/loader.js'
import { toExcerpt } from '../utils/text.js'
const props = defineProps({ name: String })

const catPosts = computed(() => {
  if (!props.name) return []
  return posts.filter(p => p.category === props.name)
})

const cats = computed(() => {
  const m = {}; for (const p of posts) { if(!m[p.category]) m[p.category]=0; m[p.category]++ }
  return Object.entries(m).map(([name,count])=>({name,count}))
})
const catRows = computed(() => {
  const rows = []; const list = cats.value
  for (let i=0; i<list.length; i+=2) rows.push(list.slice(i,i+2))
  return rows
})
</script>
