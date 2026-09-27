import { Marked } from 'marked'
import hljs from 'highlight.js'

const marked = new Marked()

marked.use({
  renderer: {
    code({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : null
      let highlighted
      if (language) {
        highlighted = hljs.highlight(text, { language, ignoreIllegals: true }).value
      } else {
        highlighted = hljs.highlightAuto(text).value
      }
      const langClass = language ? ` language-${language}` : ''
      return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>`
    },
  },
})

export function renderMarkdown(content) {
  return marked.parse(content)
}

export default marked
