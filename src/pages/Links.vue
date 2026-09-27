<template>
  <div class="content-area">
    <div class="page-header pink">૮ ´͈ ᗜ `͈ ა 友情链接 ૮ ´͈ ᗜ `͈ ა</div>
    <div class="links-grid">
      <div class="links-row" v-for="(row,i) in linkRows" :key="i">
        <a v-for="link in row" :key="link.url" :href="link.url" target="_blank" class="link-card">
          <div class="link-top">
            <div class="link-avatar-circle" :style="{background: i%2===0?'var(--c-pink)':'var(--c-green)'}">
              <img v-if="link.avatar" :src="link.avatar" :alt="link.name" class="link-avatar-img" />
              <span v-else>{{ link.name[0] }}</span>
            </div>
            <div class="link-info">
              <div class="link-name">✦ {{ link.name }}</div>
              <div class="link-desc">{{ link.desc }}</div>
            </div>
          </div>
          <div class="link-bottom">
            <span class="link-url">{{ hostname(link.url) }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import site from '../config/site.js'
function hostname(url) { try { return new URL(url).hostname } catch { return url } }
const linkRows = computed(() => {
  const rows = []
  const links = site.links
  for (let i=0; i<links.length; i+=2) rows.push(links.slice(i,i+2))
  return rows
})
</script>
