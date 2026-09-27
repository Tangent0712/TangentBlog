<template>
  <div class="content-area">
    <div class="page-header pink">૮₍◜ෆ◝.₎ა 最新文章 ૮₍◜ෆ◝.₎ა</div>
    <div class="post-list-wrapper">
      <div class="post-list-item" v-for="post in pagePosts" :key="post.slug">
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
    <div class="pagination" v-if="totalPages > 1">
      <a href="javascript:void(0)" @click="goPage(current-1)" v-if="current > 1">&lt;&lt;</a>
      <a href="javascript:void(0)" v-for="p in pages" :key="p" :class="{ active: p === current }" @click="goPage(p)">{{ p }}</a>
      <a href="javascript:void(0)" @click="goPage(current+1)" v-if="current < totalPages">&gt;&gt;</a>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { toExcerpt } from '../utils/text.js'
const props = defineProps({ posts: Array })
const perPage = ref(6)
const current = ref(1)

const ITEM_H = 80       // 卡片高度
const EXTRA = 200       // 标题栏 + 分页 + 内边距 + 顶栏

function calcPerPage() {
  perPage.value = Math.max(3, Math.floor((window.innerHeight - EXTRA) / ITEM_H))
}

const totalPages = computed(() => Math.ceil(props.posts.length / perPage.value))
const pagePosts = computed(() => {
  const start = (current.value - 1) * perPage.value
  return props.posts.slice(start, start + perPage.value)
})
const pages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

function goPage(n) { if (n >= 1 && n <= totalPages.value) current.value = n }

onMounted(async () => { await nextTick(); calcPerPage(); window.addEventListener('resize', calcPerPage) })
onBeforeUnmount(() => window.removeEventListener('resize', calcPerPage))
</script>
