// Example of a local override file. Copy this file to `site.local.js` (which is
// git-ignored) and fill in your own values.

export default {
  title: 'My Blog',
  author: 'Your Name',
  favicon: '/favicon.local.png',
  avatar: 'https://img.example.com/avatar.jpg',
  beian: ['ICP备00000000号'],
  about: {
    heading: 'About Me',
    cardTitle: 'About Me',
    contactsTitle: 'Contact',
    intro: ['✦ Based in Your City', '✦ A short introduction'],
    contacts: [
      { label: 'GitHub', values: ['github.com/yourname'] },
      { label: 'Email', values: ['you@example.com'] },
    ],
    sections: [
      {
        title: 'Tech Stack',
        // `text` is optional: a paragraph shown above the rows.
        text: 'A sentence introducing the rows below.',
        rows: [{ name: 'Frontend', value: 'Vue3 / TypeScript' }],
      },
    ],
  },
  links: [
    {
      name: 'Friend Blog',
      url: 'https://example.com',
      avatar: 'https://example.com/avatar.png',
      desc: 'A short description',
    },
  ],
}
