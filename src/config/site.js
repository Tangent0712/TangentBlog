// Site configuration.
//
// This file ships with generic placeholder values so the project can be open
// sourced. To use your own branding and content without changing tracked
// files, create `src/config/site.local.js` next to this file (it is
// git-ignored) and export the fields you want to override. See
// `site.local.example.js` for the full shape.

const localModules = import.meta.glob('./site.local.js', { eager: true })
const local = localModules['./site.local.js']?.default ?? {}

const defaults = {
  title: 'My Blog',
  author: 'Your Name',
  // Favicon path (see public/). Default is the bundled generic icon.
  favicon: '/favicon.svg',
  // Avatar image URL. Leave empty to show the first letter of the author name.
  avatar: '',
  // ICP / public security filing lines shown in the sidebar. Leave empty to hide.
  beian: [],
  about: {
    heading: 'About Me',
    cardTitle: 'About Me',
    contactsTitle: 'Contact',
    intro: [
      '✦ Based in Your City',
      '✦ A software engineering student passionate about technology',
      '✦ Focused on frontend development and artificial intelligence',
    ],
    contacts: [
      { label: 'GitHub', values: ['github.com/yourname'] },
      { label: 'Email', values: ['you@example.com'] },
    ],
    sections: [
      {
        title: 'Tech Stack',
        rows: [
          { name: 'Frontend', value: 'Vue3 / React / TypeScript / TailwindCSS' },
          { name: 'Backend', value: 'Node.js / Java / MySQL / Nginx' },
        ],
      },
    ],
  },
  links: [],
}

export default {
  ...defaults,
  ...local,
  about: { ...defaults.about, ...(local.about || {}) },
}
