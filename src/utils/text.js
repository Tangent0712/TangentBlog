export function toExcerpt(post, max) {
  if (post.desc) return post.desc
  const text = post.content.replace(/[#*`\n]/g, ' ').replace(/\s+/g, ' ').trim()
  if (max && text.length > max) return text.slice(0, max) + '...'
  return text
}
