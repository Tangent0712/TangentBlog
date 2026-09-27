# TangentBlog

A personal blog skeleton built with **Vue 3 + Vite**. Posts are plain Markdown
files with YAML frontmatter, loaded at build time. The design is a compact,
retro-terminal inspired, monospace layout with light/dark themes.

## Features

- **Markdown posts** — `src/posts/*.md`, Obsidian-compatible frontmatter
- **Syntax highlighting** — every language via highlight.js
- **Light / dark theme** with persistence
- **Article tabs** — open multiple posts in tabs
- **Outline sidebar** — auto-generated from headings
- **Search** across titles and content
- **Archive** and **category** pages
- **Friend links** page
- **Config-driven** — site name, author, about page and links come from one
  config file; your real values live in a git-ignored override
- **One-command deploy** — configurable via environment variables

## Quick start

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # output to dist/
pnpm deploy   # build + upload (see Deployment)
```

## Project structure

```
TangentBlog/
├── index.html
├── package.json
├── vite.config.js
├── .env.example            # deploy config template
├── scripts/deploy.mjs      # deploy script
├── docs/
│   ├── MANUAL.md           # full manual (Chinese)
│   ├── POSTMORTEM.md       # build postmortem
│   └── example-post.md     # post template
├── public/
│   ├── favicon.svg
│   └── decorate_photos/    # decorative images
└── src/
    ├── main.js             # app entry
    ├── App.vue             # layout shell
    ├── router.js           # routes
    ├── config/
    │   ├── site.js         # site config + local override loader
    │   ├── site.local.example.js
    │   └── site.local.js   # git-ignored, your real values
    ├── data/
    │   ├── loader.js       # scans and parses posts
    │   └── markdown.js     # marked + highlight.js renderer
    ├── components/         # TopBar, SideBar, TabBar, OutlineSidebar, ScrollTop
    ├── composables/useTabs.js
    ├── pages/              # Home, Post, About, Links, Archives, Categories, NotFound
    ├── styles/main.css
    └── posts/              # your posts (git-ignored) + .gitkeep
```

## Configuration

Site identity and content are read from `src/config/site.js`, which ships with
generic placeholders. To use your own values **without modifying tracked
files**, create `src/config/site.local.js` (git-ignored) and export the fields
you want to override. See `src/config/site.local.example.js`:

```js
export default {
  title: 'My Blog',
  author: 'Your Name',
  avatar: 'https://img.example.com/avatar.jpg',
  beian: ['ICP备00000000号'],
  about: { /* ... */ },
  links: [ /* ... */ ],
}
```

## Writing posts

Add `.md` files to `src/posts/`. The filename becomes the URL slug. See
[`docs/example-post.md`](docs/example-post.md) for a template.

| Field | Required | Description |
|-------|----------|-------------|
| `title` | yes | Post title |
| `date` | yes | `YYYY-MM-DD` |
| `category` | yes | Category name |
| `tags` | yes | List of tags |
| `desc` | no | Short summary (falls back to the body) |
| `hidden` | no | `true` to build the post but hide it from listings |

## Deployment

The deploy script reads server details from environment files. Copy the example
and fill in your own values (`.env.local` is git-ignored):

```bash
cp .env.example .env.local
# edit .env.local, then
pnpm deploy
```

| Variable | Description |
|----------|-------------|
| `DEPLOY_HOST` | Server IP or hostname |
| `DEPLOY_USER` | SSH user |
| `DEPLOY_PATH` | Web root directory on the server |
| `DEPLOY_OWNER` | Owner for `chown` (default `www:www`) |
| `DEPLOY_MODE` | Permissions for `chmod` (default `755`) |
| `DEPLOY_TMP_DIR` | Temporary directory (default `/tmp`) |

## License

No license file is included yet. Add one before publishing if you intend others
to reuse this project.
