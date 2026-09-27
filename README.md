# TangentBlog

一个使用 **Vue 3 + Vite** 搭建的个人博客骨架。文章是带 YAML frontmatter 的纯 Markdown 文件，在构建时加载。整体是紧凑的二次元风格、等宽字体布局，支持明暗主题。

## 功能特性

- **Markdown 文章** — `src/posts/*.md`，兼容 Obsidian 的 frontmatter
- **代码高亮** — 基于 highlight.js，覆盖全部语言
- **明暗主题**，并记忆用户选择
- **文章选项卡** — 可同时打开多篇文章
- **文章大纲** — 根据标题自动生成
- **搜索** — 同时检索标题与正文
- **归档** 与 **分类** 页面
- **友情链接** 页面
- **配置驱动** — 站点名称、作者、关于页、友链集中在一个配置文件；真实信息放在被 git 忽略的本地覆盖文件中
- **一键部署** — 通过环境变量配置

## 快速开始

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # 输出到 dist/
pnpm deploy   # 构建 + 上传（见「部署」）
```

## 目录结构

```
TangentBlog/
├── index.html
├── package.json
├── vite.config.js
├── .env.example            # 部署配置模板
├── scripts/deploy.mjs      # 部署脚本
├── docs/
│   ├── MANUAL.md           # 完整使用手册
│   ├── POSTMORTEM.md       # 建站错误复盘
│   └── example-post.md     # 文章模板
├── public/
│   ├── favicon.svg
│   └── decorate_photos/    # 装饰图
└── src/
    ├── main.js             # 应用入口
    ├── App.vue             # 布局外壳
    ├── router.js           # 路由
    ├── config/
    │   ├── site.js         # 站点配置 + 本地覆盖加载
    │   ├── site.local.example.js
    │   └── site.local.js   # 本地私有（被 git 忽略）
    ├── data/
    │   ├── loader.js       # 扫描并解析文章
    │   └── markdown.js     # marked + highlight.js 渲染
    ├── components/         # TopBar、SideBar、TabBar、OutlineSidebar、ScrollTop
    ├── composables/useTabs.js
    ├── pages/              # Home、Post、About、Links、Archives、Categories、NotFound
    ├── styles/main.css
    ├── utils/text.js
    └── posts/              # 你的文章（被 git 忽略）+ .gitkeep
```

## 配置

站点身份与内容来自 `src/config/site.js`，其中是通用占位值。想使用自己的信息又**不改动已提交的文件**，请新建 `src/config/site.local.js`（被 git 忽略）并导出要覆盖的字段，参考 `src/config/site.local.example.js`：

```js
export default {
  title: '我的博客',
  author: '你的名字',
  avatar: 'https://img.example.com/avatar.jpg',
  beian: ['ICP备00000000号'],
  about: { /* ... */ },
  links: [ /* ... */ ],
}
```

## 写文章

在 `src/posts/` 下新增 `.md` 文件，文件名即 URL slug。模板见
[`docs/example-post.md`](docs/example-post.md)。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | `YYYY-MM-DD` |
| `category` | 是 | 分类名 |
| `tags` | 是 | 标签列表 |
| `desc` | 否 | 简短简介（不填则截取正文） |
| `hidden` | 否 | `true` 时正常构建，但不出现在列表中 |

## 部署

部署脚本从环境文件读取服务器信息。复制模板并填写自己的值（`.env.local` 被 git 忽略）：

```bash
cp .env.example .env.local
# 编辑 .env.local 后执行
pnpm deploy
```

| 变量 | 说明 |
|------|------|
| `DEPLOY_HOST` | 服务器 IP 或域名 |
| `DEPLOY_USER` | SSH 用户 |
| `DEPLOY_PATH` | 服务器网站根目录 |
| `DEPLOY_OWNER` | chown 归属（默认 `www:www`） |
| `DEPLOY_MODE` | chmod 权限（默认 `755`） |
| `DEPLOY_TMP_DIR` | 临时目录（默认 `/tmp`） |

## 许可

暂未包含许可证文件。如需让他人复用本项目，请先自行添加。
