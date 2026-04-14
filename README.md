# Blog 2.0

一个基于 Nuxt.js 4 构建的现代个人博客系统，采用内容驱动架构，专注于技术文章的展示和交互体验。

## 在线演示

[GitHub Pages](https://player32611.github.io/blog-2.0/)

## 核心特性

- **内容管理系统** - 基于 Nuxt Content 的 Markdown 文件内容管理
- **动态交互** - 使用 GSAP 实现流畅的页面过渡和动画效果
- **多媒体支持** - 集成音乐播放器和图片展示功能
- **物理引擎** - 使用 matter-js 实现物品展示交互
- **响应式设计** - 客户端渲染的单页应用（SPA）
- **分类导航** - 按技术领域组织的内容分类系统

## 技术栈

### 框架与核心

- [Nuxt.js 4](https://nuxt.com/) - Vue 3 全栈框架
- [Vue 3](https://vuejs.org/) - Composition API + TypeScript
- [Nuxt Content 3](https://content.nuxt.com/) - 内容管理系统

### 状态管理与数据

- [Pinia](https://pinia.vuejs.org/) - 状态管理
- [SQLite](https://www.sqlite.org/) - 数据持久化

### 动画与交互

- [GSAP](https://gsap.com/) - 专业级动画库
- [matter-js](https://brm.io/matter-js/) - 2D 物理引擎

### 样式

- [Sass](https://sass-lang.com/) - CSS 预处理器
- 自定义字体：Mars Needs Cunnilingus、方正基础像素体

## 快速开始

### 环境要求

- Node.js >= 20
- Yarn（推荐）、npm、pnpm 或 Bun

### 安装

```bash
yarn install
```

### 开发

启动开发服务器：

```bash
yarn dev
```

访问 http://localhost:3000

### 构建

```bash
yarn build          # 构建生产版本
yarn preview        # 预览生产构建
yarn generate       # 生成静态站点
```

### 代码格式化

```bash
yarn prettier --write .
```

## 项目结构

```
blog-2.0/
├── app/                    # 应用主目录
│   ├── components/         # Vue 组件
│   │   ├── content/       # Markdown 内容展示组件
│   │   ├── exhibit/       # 展览组件
│   │   └── ui/            # UI 组件库
│   │       ├── blogUI/    # 博客专用 UI
│   │       ├── imageUI/   # 图片相关 UI
│   │       ├── itemUI/    # 物品展示 UI（物理引擎）
│   │       ├── mainUI/    # 主界面 UI
│   │       └── musicUI/   # 音乐播放器 UI
│   ├── pages/             # 页面路由
│   ├── stores/            # Pinia 状态管理
│   ├── composables/       # 组合式函数
│   ├── types/             # TypeScript 类型定义
│   └── utils/             # 工具函数
├── content/               # Markdown 内容
│   ├── front_end/        # 前端技术文章
│   ├── back_end/         # 后端技术文章
│   ├── algorithm/        # 算法文章
│   ├── deep_learning/    # 深度学习文章
│   └── gms2/             # GameMaker Studio 2 文章
├── public/                # 公共静态资源
│   ├── fonts/            # 字体文件
│   ├── images/           # 图片资源
│   ├── sounds/           # 音频资源
│   └── icons/            # 图标字体
└── .github/workflows/     # GitHub Actions 配置
    └── deploy.yml        # 自动部署配置
```

## 内容管理

### 添加新文章

在 `content/` 目录下对应的分类文件夹中添加 Markdown 文件：

```
content/
├── front_end/
│   └── my-new-article.md
├── back_end/
├── algorithm/
├── deep_learning/
└── gms2/
```

文件名会自动成为路由路径的一部分。

### 支持的内容分类

| 分类          | 路径                    | 说明               |
| ------------- | ----------------------- | ------------------ |
| front_end     | `/blogs/front_end/`     | 前端技术           |
| back_end      | `/blogs/back_end/`      | 后端技术           |
| algorithm     | `/blogs/algorithm/`     | 算法               |
| deep_learning | `/blogs/deep_learning/` | 深度学习           |
| gms2          | `/blogs/gms2/`          | GameMaker Studio 2 |

### Markdown 代码高亮

支持的语言：C、C++、Java、Properties、Python、Vue、XML

## 部署

### GitHub Pages

项目配置了 GitHub Actions 自动部署：

1. 推送到 `nuxt` 分支
2. GitHub Actions 自动构建并部署到 GitHub Pages

```bash
git push origin nuxt
```

部署配置位于 `.github/workflows/deploy.yml`

### 静态部署

```bash
yarn generate
# 输出目录 .output/public
```

## 开发规范

### 组件命名

- 使用 PascalCase：`BlogMenu.vue`
- 遵循 Vue 3 Composition API 规范

### 代码风格

- 使用 TypeScript 进行类型检查
- 使用 Prettier 格式化代码（Tab 缩进）

### 状态管理

- Store 命名：`useXxxStore`
- 按业务功能分离 stores

## 相关文档

- [Nuxt.js 文档](https://nuxt.com)
- [Nuxt Content 文档](https://content.nuxt.com)
- [Pinia 文档](https://pinia.vuejs.org)
- [GSAP 文档](https://gsap.com)
- [matter-js 文档](https://brm.io/matter-js/)

## License

MIT
