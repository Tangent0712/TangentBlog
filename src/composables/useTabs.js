import { ref } from 'vue'

const tabs = ref([])
const activeSlug = ref(null)

function _load() {
  try { const s = sessionStorage.getItem('blog-tabs'); if (s) tabs.value = JSON.parse(s) } catch {}
}
function _save() { sessionStorage.setItem('blog-tabs', JSON.stringify(tabs.value)) }

_load()

export function useTabs() {
  return { tabs, activeSlug }
}

export function openTab(slug, title, scrollY = 0) {
  const existing = tabs.value.find(t => t.slug === slug)
  if (existing) {
    existing.scrollY = scrollY
    activeSlug.value = slug
  } else {
    tabs.value.push({ slug, title, scrollY })
    activeSlug.value = slug
  }
  _save()
}

export function closeTab(slug) {
  const idx = tabs.value.findIndex(t => t.slug === slug)
  if (idx === -1) return
  tabs.value.splice(idx, 1)
  if (activeSlug.value === slug) {
    if (tabs.value.length) {
      const next = tabs.value[Math.min(idx, tabs.value.length - 1)]
      activeSlug.value = next.slug
      return next.slug
    } else {
      activeSlug.value = null
      return null
    }
  }
  _save()
}

export function updateScroll(slug, scrollY) {
  const t = tabs.value.find(t => t.slug === slug)
  if (t) { t.scrollY = scrollY; _save() }
}

export function getScroll(slug) {
  const t = tabs.value.find(t => t.slug === slug)
  return t ? t.scrollY : 0
}

export function setActiveSlug(slug) { activeSlug.value = slug }
