// Loads all .md posts synchronously at build time
// Compatible with Obsidian (YAML frontmatter + markdown body)

import site from '../config/site.js'

const mdFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }
  const yaml = match[1], content = match[2]
  const meta = {}
  let currentKey = null, inList = false
  for (let line of yaml.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    if (t.match(/^\s*-\s+(.+)/)) {
      if (currentKey && inList) {
        if (!Array.isArray(meta[currentKey])) meta[currentKey] = []
        meta[currentKey].push(t.replace(/^\s*-\s+/, ''))
      }
      continue
    }
    const m = t.match(/^(\w[\w_-]*)\s*:\s*(.*)/)
    if (m) { currentKey = m[1]; inList = m[2] === ''; if (!inList) meta[currentKey] = m[2].replace(/^['"]|['"]$/g, '') }
  }
  return { meta, content }
}

const _allPosts = Object.entries(mdFiles).map(([path, raw]) => {
  const { meta, content } = parseFrontmatter(raw)
  const slug = path.replace('../posts/', '').replace('.md', '')
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '1970-01-01',
    desc: meta.desc || meta.description || '',
    category: meta.category || '未分类',
    tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : []),
    hidden: meta.hidden === 'true' || meta.hidden === true,
    author: site.author,
    content,
  }
}).sort((a, b) => b.date.localeCompare(a.date) || b.title.localeCompare(a.title))

export const posts = _allPosts.filter(p => !p.hidden)
export const allPosts = _allPosts
