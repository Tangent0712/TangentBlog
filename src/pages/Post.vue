<template>
  <div class="content-area" v-if="post">
    <div class="article-wrap">
      <div class="article-main">
        <div class="article-card">
          <div class="article-card-header"><h1>■ {{ post.title }} ■</h1></div>
          <div class="article-card-meta">
            <div class="meta-left">
              <span>作者: {{ post.author }}</span>
              <span>发布于: {{ post.date }}</span>
            </div>
            <div class="meta-right">
              <span class="article-cat-badge">{{ post.category }}</span>
            </div>
          </div>
          <div class="article-body" v-html="renderedContent" ref="contentEl"></div>
          <div class="article-tags" v-if="post.tags.length">
            <span class="tags-label">标签:</span>
            <span class="tag" v-for="t in post.tags" :key="t">{{ t }}</span>
          </div>
        </div>
        <div class="article-nav">
          <router-link v-if="prev" :to="'/post/'+prev.slug">
            <span class="nv-label">&lt;&lt; 上一篇</span>
            <span class="nv-title">&gt; {{ prev.title }}</span>
          </router-link>
          <router-link v-if="next" :to="'/post/'+next.slug" class="next">
            <span class="nv-label">下一篇 &gt;&gt;</span>
            <span class="nv-title">&gt; {{ next.title }}</span>
          </router-link>
        </div>
      </div>
      <OutlineSidebar :headings="headings" :activeIdx="activeIdx" />
    </div>
  </div>
  <div class="content-area" v-else><div class="page-header pink">文章未找到</div></div>
</template>
<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { posts, allPosts } from '../data/loader.js'
import { renderMarkdown } from '../data/markdown.js'
import OutlineSidebar from '../components/OutlineSidebar.vue'
import { updateScroll, getScroll } from '../composables/useTabs.js'

const props = defineProps({ slug: String })
const contentEl = ref(null)
const post = computed(() => allPosts.find(p => p.slug === props.slug))
const idx = computed(() => posts.findIndex(p => p.slug === props.slug))
const prev = computed(() => idx.value > 0 ? posts[idx.value-1] : null)
const next = computed(() => idx.value < posts.length-1 ? posts[idx.value+1] : null)
const renderedContent = computed(() => post.value ? renderMarkdown(post.value.content) : '')
const headings = ref([])
const activeIdx = ref(-1)

function updateHeadings() {
  if (!contentEl.value) return
  const hs = contentEl.value.querySelectorAll('h2,h3,h4')
  headings.value = Array.from(hs).map((h,i) => {
    if(!h.id) h.id = 'h-'+i
    return { id: h.id, text: h.textContent, level: parseInt(h.tagName[1]) }
  })
}

let scrollHandler = null

function onScroll() {
  if (!contentEl.value) return
  const hs = contentEl.value.querySelectorAll('h2,h3,h4')
  if (!hs.length) return
  let active = -1
  const scrollTop = window.scrollY + 120
  hs.forEach((h, i) => {
    if (h.getBoundingClientRect().top + window.scrollY <= scrollTop) active = i
  })
  activeIdx.value = active
}

onMounted(async () => {
  await nextTick()
  updateHeadings()
  scrollHandler = () => requestAnimationFrame(onScroll)
  window.addEventListener('scroll', scrollHandler, { passive: true })
  const s = getScroll(props.slug)
  if (s) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, s)
      })
    })
  }
})

onBeforeUnmount(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  updateScroll(props.slug, window.scrollY)
})
</script>
