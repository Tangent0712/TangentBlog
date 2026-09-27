# TangentBlog 用户手册

## 快速开始

```bash
pnpm install    # 首次安装依赖
pnpm dev        # 本地开发（浏览器访问 http://localhost:5173）
pnpm build      # 构建（输出到 dist/）
pnpm deploy     # 构建并部署（服务器信息见第六节）
```

---

## 一、写文章

文章存放在 `src/posts/` 目录，每篇一个 `.md` 文件，格式兼容 Obsidian（YAML frontmatter + Markdown 正文）。文件名即 URL：`my-post.md` → `/#/post/my-post`。

> 该目录下的 `.md` 已被 `.gitignore` 忽略：仓库只包含骨架，你的文章不会被推送到开源仓库，但本地开发/构建仍会正常加载。

模板见 [`docs/example-post.md`](example-post.md)。示例：

```md
---
title: 我的文章标题
date: 2026-07-04
category: 前端开发
tags:
  - Vue3
  - JavaScript
desc: 这篇文讲了关于 Vue3 响应式系统的一些事。
---

## 一级章节

正文内容...

### 二级章节

```js
console.log('代码块')
```
```

**字段说明**：

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 日期 YYYY-MM-DD |
| `category` | 是 | 分类名（自由填写，自动归类） |
| `tags` | 是 | 标签列表 |
| `desc` | 否 | 首页显示的简介（不填则截取正文） |
| `hidden` | 否 | `true` 时正常参与构建，但不出现在列表/搜索中 |

**标题层级**：`##`=大标题、`###`=中标题、`####`=小标题，自动生成文章大纲。

---

## 二、站点配置（脱敏）

站点名称、作者、头像、备案号、关于页内容、友情链接等统一由配置文件提供：

- `src/config/site.js`：**已提交**，使用通用占位值。
- `src/config/site.local.js`：**本地私有**（已 gitignore），填写你自己的真实信息。参考 `src/config/site.local.example.js`。

```js
// src/config/site.local.js
export default {
  title: '我的博客',
  author: 'Your Name',
  avatar: 'https://img.example.com/avatar.jpg',
  beian: ['ICP备00000000号'],
  about: {
    heading: '个人介绍',
    cardTitle: '关于我',
    contactsTitle: '联系方式',
    intro: ['✦ 一句话介绍自己'],
    contacts: [{ label: 'GitHub', values: ['github.com/yourname'] }],
    sections: [{ title: '技术栈', rows: [{ name: '前端', value: 'Vue3' }] }],
  },
  links: [
    { name: '友链名称', url: 'https://example.com', avatar: '', desc: '简短描述' },
  ],
}
```

> 只写你想覆盖的字段即可，未提供的字段使用 `site.js` 的默认值。

---

## 三、上传图片

若使用自建图床，请把地址记录在本地私有配置中（不要写进提交的代码）。示例命令：

```bash
scp photo.png "$DEPLOY_USER@$DEPLOY_HOST:/tmp/"
ssh "$DEPLOY_USER@$DEPLOY_HOST" "sudo mv /tmp/photo.png /path/to/image-host/"
```

外链使用 `https://img.example.com/photo.png`。

---

## 四、修改样式

### 颜色

编辑 `src/styles/main.css` 开头的 CSS 变量：

```css
:root {
  --c-bg: #f5f0eb;         /* 页面背景 */
  --c-pink: #f8c3cd;       /* 粉色强调 */
  --c-green: #a8e6cf;      /* 绿色强调 */
}

.app.dark {
  --c-bg: #1a1a1a;         /* 暗色背景 */
  --c-pink: #c9b1e8;       /* 暗色粉色 */
  --c-green: #6ee7f0;      /* 暗色绿色 */
}
```

### 代码高亮

`src/data/markdown.js` 使用 highlight.js（全语言）。高亮配色在 `src/styles/main.css` 的 `.hljs-*` 规则中，随明暗主题自动适配。

### 首页每页文章数

编辑 `src/pages/Home.vue` 顶部的常量：

```js
const ITEM_H = 80    // 每张卡片高度，越大越保守
const EXTRA = 200    // 顶部占用（顶栏+标题+分页），越大越保守
```

---

## 五、构建与部署

部署参数通过环境文件读取：

```bash
cp .env.example .env.local   # 首次：复制模板并填写
pnpm deploy                  # 构建 + 上传
```

`.env.local`（已 gitignore）字段：

| 变量 | 说明 |
|------|------|
| `DEPLOY_HOST` | 服务器 IP / 域名 |
| `DEPLOY_USER` | SSH 用户 |
| `DEPLOY_PATH` | 服务器网站根目录 |
| `DEPLOY_OWNER` | chown 归属，默认 `www:www` |
| `DEPLOY_MODE` | chmod 权限，默认 `755` |
| `DEPLOY_TMP_DIR` | 临时目录，默认 `/tmp` |

部署脚本：`scripts/deploy.mjs`（构建 → 打包 → scp → 远端解压并设置权限）。

---

## 六、文件结构

```
TangentBlog/
├── index.html
├── package.json
├── vite.config.js
├── .env.example            # 部署配置模板
├── scripts/deploy.mjs      # 部署脚本
├── docs/
│   ├── MANUAL.md           # 本手册
│   ├── POSTMORTEM.md       # 错误复盘
│   └── example-post.md     # 文章模板
├── public/
│   ├── favicon.svg
│   └── decorate_photos/    # 装饰图
└── src/
    ├── main.js             # 应用入口
    ├── App.vue             # 根组件（布局框架）
    ├── router.js           # 路由
    ├── config/
    │   ├── site.js         # 站点配置 + 本地覆盖加载
    │   ├── site.local.example.js
    │   └── site.local.js   # 本地私有（gitignore）
    ├── data/
    │   ├── loader.js       # 文章加载器（自动扫描 .md）
    │   └── markdown.js     # marked + highlight.js 渲染
    ├── utils/
    │   └── text.js         # 文本摘要工具
    ├── composables/
    │   └── useTabs.js      # 选项卡状态管理
    ├── components/
    │   ├── TopBar.vue      # 顶栏
    │   ├── SideBar.vue     # 侧栏
    │   ├── TabBar.vue      # 选项卡栏
    │   └── OutlineSidebar.vue  # 文章大纲
    ├── pages/
    │   ├── Home.vue        # 首页
    │   ├── Post.vue        # 文章页（三栏+大纲）
    │   ├── About.vue       # 关于页
    │   ├── Links.vue       # 友链页
    │   ├── Archives.vue    # 归档页
    │   ├── Categories.vue  # 分类页
    │   └── NotFound.vue    # 404页
    ├── styles/main.css     # 全部样式
    └── posts/              # 文章目录（.md 已 gitignore，保留 .gitkeep）
```
