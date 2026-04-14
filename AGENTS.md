# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

# Blog 2.0 - 项目概述与开发指南

## 项目概述

Blog 2.0 是一个基于 Nuxt.js 4 构建的现代个人博客系统，采用内容驱动的架构，专注于技术文章的展示和交互体验。该项目集成了丰富的视觉效果、动画交互和多媒体内容，为用户提供沉浸式的阅读体验。

### 核心特性

- **内容管理系统**: 基于 Nuxt Content 的 Markdown 文件内容管理
- **动态交互**: 使用 GSAP 实现流畅的页面过渡和动画效果
- **多媒体支持**: 集成音乐播放器和图片展示功能
- **物理引擎**: 使用 matter-js 实现物品展示交互
- **响应式设计**: 客户端渲染的单页应用，提供流畅的用户体验
- **分类导航**: 按技术领域组织的内容分类系统

## 技术栈

### 核心框架

- **Nuxt.js 4.3.1**: 基于 Vue 3 的全栈框架
- **Vue 3**: 采用 Composition API 和 TypeScript
- **TypeScript**: 全面的类型安全支持

### 状态管理与数据

- **Pinia 3.0.4**: 现代化的状态管理库
- **Nuxt Content 3.11.2**: 内容驱动架构
- **SQLite**: 数据持久化（better-sqlite3 12.8.0）

### 样式与动画

- **Sass 1.97.3**: CSS 预处理器
- **GSAP 3.14.2**: 专业级动画库
- **matter-js 0.20.0**: 2D 物理引擎
- **自定义字体**: Mars Needs Cunnilingus、方正基础像素体
- **图标字体**: iconfont 自定义图标库

### 开发工具

- **@nuxt/fonts 0.14.0**: 字体管理模块
- **@pinia/nuxt 0.11.3**: Pinia 与 Nuxt 集成
- **Prettier 3.8.1**: 代码格式化（使用 Tab 缩进）

## 项目架构

### 目录结构

```
blog-2.0/
├── app/                          # 应用主目录
│   ├── app.vue                   # 根组件，包含全局加载逻辑
│   ├── assets/                   # 静态资源
│   │   ├── icons/               # iconfont 图标库
│   │   └── images/              # 图片资源（background、normal、sprites）
│   ├── components/               # Vue 组件
│   │   ├── content/             # 内容展示组件（Prose 组件）
│   │   │   ├── CodeGroup.vue
│   │   │   ├── Danger.vue
│   │   │   ├── Detail.vue
│   │   │   ├── ProseBlockquote.vue
│   │   │   ├── ProseCode.vue
│   │   │   ├── ProseH1.vue
│   │   │   ├── ProseH2.vue
│   │   │   ├── ProseH3.vue
│   │   │   ├── ProsePre.vue
│   │   │   ├── ProseTable.vue
│   │   │   ├── Tip.vue
│   │   │   └── Warning.vue
│   │   ├── exhibit/             # 展览组件
│   │   │   └── Astronaut.vue
│   │   └── ui/                  # UI 组件库
│   │       ├── Button.vue
│   │       ├── Image.vue
│   │       ├── Loading.vue
│   │       ├── blogUI/          # 博客专用 UI 组件
│   │       │   ├── BlogBackGround.vue
│   │       │   ├── BlogMask.vue
│   │       │   ├── BlogMenu.vue
│   │       │   ├── BlogMenuBackGround.vue
│   │       │   ├── BlogNavigation.vue
│   │       │   ├── BlogScrollBar.vue
│   │       │   ├── MenuSelecter.vue
│   │       │   └── MenuSelection.vue
│   │       ├── imageUI/         # 图片相关 UI 组件
│   │       │   ├── ImageBackground.vue
│   │       │   └── ImageContainer.vue
│   │       ├── itemUI/          # 物品展示 UI 组件（物理引擎）
│   │       │   ├── ItemContainer.vue
│   │       │   ├── ItemPhoneCard.vue
│   │       │   └── ItemSwitchCard.vue
│   │       ├── mainUI/          # 主界面 UI 组件
│   │       │   ├── MainBackGround.vue
│   │       │   └── UiBox.vue
│   │       └── musicUI/         # 音乐播放器 UI 组件
│   │           ├── MusicBackground.vue
│   │           ├── MusicController.vue
│   │           ├── MusicFolder.vue
│   │           ├── MusicItem.vue
│   │           ├── MusicList.vue
│   │           └── MusicRecord.vue
│   ├── composables/             # 组合式函数
│   │   └── useSoundEffect.ts   # 音效处理
│   ├── pages/                   # 页面路由
│   │   ├── [...slug].vue        # 动态路由（内容页面）
│   │   ├── blogs.vue            # 博客列表页
│   │   ├── images.vue           # 图片展示页
│   │   ├── index.vue            # 首页
│   │   ├── items.vue            # 物品展示页（物理引擎）
│   │   └── musics.vue           # 音乐页面
│   ├── stores/                  # Pinia 状态管理
│   │   ├── blogStore.ts        # 博客状态管理
│   │   ├── soundStore.ts       # 音效状态管理
│   │   └── themeStore.ts       # 主题状态管理
│   ├── types/                   # TypeScript 类型定义
│   │   ├── components.ts
│   │   ├── composables.ts
│   │   ├── config.ts
│   │   ├── store.ts
│   │   └── utils.ts
│   └── utils/                   # 工具函数
│       ├── blogs.ts            # 博客相关工具
│       ├── common.ts           # 通用工具函数
│       ├── images.ts           # 图片处理工具
│       └── musics.ts           # 音乐工具函数
├── content/                     # Markdown 内容目录
│   ├── algorithm/              # 算法相关文章
│   ├── back_end/               # 后端技术文章
│   ├── deep_learning/          # 深度学习文章
│   ├── front_end/              # 前端技术文章
│   └── gms2/                   # GameMaker Studio 2 相关文章
├── public/                      # 公共静态资源
│   ├── favicon.ico
│   ├── fonts/                   # 字体文件
│   ├── icons/                   # 图标字体文件
│   ├── images/                  # 图片资源
│   │   ├── background/
│   │   ├── cover/
│   │   └── ui/
│   └── sounds/                  # 音频资源
│       ├── effects/
│       └── musics/
├── .github/                     # GitHub 配置
│   └── workflows/
│       └── deploy.yml          # 自动部署配置
├── .vscode/                     # VSCode 配置
│   └── settings.json           # Prettier 配置（使用 Tab 缩进）
├── content.config.ts           # Nuxt Content 配置
├── nuxt.config.ts              # Nuxt 主配置文件
├── package.json                # 项目依赖配置
├── tsconfig.json               # TypeScript 配置
└── yarn.lock                   # Yarn 锁定文件
```

### 核心架构模式

1. **内容驱动架构**: 使用 Nuxt Content 管理 Markdown 文件，支持实时内容更新
2. **组件化设计**: 按功能域划分的组件结构（blogUI、imageUI、musicUI、mainUI）
3. **状态管理模式**: 使用 Pinia 进行集中式状态管理，按业务逻辑分离 stores
4. **客户端渲染**: 配置为 SPA 模式（`ssr: false`），优化首屏加载和交互体验
5. **模块化设计**: 通过 Nuxt 模块系统集成第三方库和功能

## 构建与运行

### 环境要求

- **Node.js**: 版本 20+
- **包管理器**: Yarn（推荐）、npm、pnpm 或 Bun

### 安装依赖

```bash
yarn install
```

### 开发模式

启动开发服务器，运行在 `http://localhost:3000`:

```bash
yarn dev
```

### 生产构建

构建生产版本:

```bash
yarn build
```

### 预览生产版本

本地预览生产构建:

```bash
yarn preview
```

### 静态生成

生成静态站点:

```bash
yarn generate
```

## 开发规范

### 组件开发

- **组件命名**: 使用 PascalCase，如 `BlogMenu.vue`
- **组件结构**: 遵循 Vue 3 Composition API 规范
- **类型定义**: 为所有 props、emits、refs 定义明确的 TypeScript 类型
- **样式作用域**: 使用 `scoped` 样式避免全局污染
- **响应式数据**: 优先使用 `ref` 和 `computed` 管理响应式状态

### 内容管理

- **Markdown 文件**: 放置在 `content/` 目录下的对应分类文件夹中
- **内容分类**: 支持的分类包括 `front_end`、`back_end`、`algorithm`、`deep_learning`、`gms2`
- **文件命名**: 使用小写字母和下划线，如 `javascript.md`

### 状态管理

- **Store 命名**: 使用 `use` 前缀，如 `useBlogStore`
- **状态组织**: 按业务功能分离 stores（blog、sound、theme）
- **类型定义**: 在 `app/types/store.ts` 中定义状态相关的类型

### 样式规范

- **样式语言**: 使用 SCSS 进行样式开发
- **样式隔离**: 组件样式使用 `scoped` 属性
- **响应式设计**: 使用 `dvh`、`vw`、`rem` 等相对单位
- **滚动条处理**: 全局隐藏滚动条（`::-webkit-scrollbar { display: none }`）

### 动画与交互

- **动画库**: 使用 GSAP 实现复杂动画效果
- **过渡效果**: 在路由切换和页面加载时使用 Loading 组件
- **性能优化**: 合理使用动画时长，避免过度动画影响性能

## 核心功能模块

### 1. 博客内容系统

**状态管理**: `blogStore.ts`

- 管理当前激活的博客分类和内容
- 提供内容查询和路由路径计算
- 支持动态内容加载

**内容展示**: `Prose` 组件系列

- `ProseCode.vue`: 代码块样式
- `ProseH1.vue`, `ProseH2.vue`, `ProseH3.vue`: 标题样式
- `ProseTable.vue`: 表格样式

**导航系统**:

- `BlogMenu.vue`: 博客菜单导航
- `BlogNavigation.vue`: 内容导航
- `MenuSelecter.vue`: 分类选择器

### 2. 加载系统

**全局加载**: `Loading.vue`

- 页面初始化加载动画
- 路由切换过渡效果
- 基于 `document.readyState` 检测加载状态

### 3. 多媒体功能

**音乐播放器**: `MusicController.vue`, `MusicBackground.vue`, `MusicFolder.vue`, `MusicItem.vue`, `MusicList.vue`, `MusicRecord.vue`

- 支持背景音乐播放
- 音乐文件夹和唱片展示
- 音效状态管理: `soundStore.ts`
- 音乐工具函数: `musics.ts`

**物品展示**: `ItemContainer.vue`, `ItemPhoneCard.vue`, `ItemSwitchCard.vue`

- 基于 matter-js 物理引擎的交互展示
- 物品卡片物理效果模拟

**图片展示**: `ImageBackground.vue`, `ImageContainer.vue`

- 图片背景处理
- 响应式图片容器
- 图片管理工具: `images.ts`

### 4. 用户界面

**主界面组件**:

- `MainBackGround.vue`: 主界面背景
- `UiBox.vue`: 主界面容器
- `BlogBackGround.vue`: 博客背景
- `BlogMask.vue`: 博客遮罩层

**自定义字体**:

- Mars Needs Cunnilingus: 英文字体
- 方正基础像素体: 中文字体

## 部署配置

### GitHub Pages 自动部署

项目配置了 GitHub Actions 工作流，支持自动部署到 GitHub Pages:

**部署配置文件**: `.github/workflows/deploy.yml`

**触发条件**:

- 推送到 `nuxt` 分支
- 手动触发工作流

**部署流程**:

1. 在 Ubuntu 环境中构建项目
2. 使用 Node.js 20 运行环境
3. 执行 `npx nuxt build --preset github_pages`
4. 部署到 GitHub Pages

**部署命令**:

```bash
# 构建并部署
git push origin nuxt
```

### Nuxt 配置要点

```typescript
// nuxt.config.ts 关键配置
export default defineNuxtConfig({
	modules: ["@nuxt/content", "@pinia/nuxt", "@nuxt/fonts"],
	devtools: { enabled: true },
	compatibilityDate: "2024-04-03",
	ssr: false, // 客户端渲染模式
	app: {
		baseURL: "/blog-2.0/", // GitHub Pages 部署基础路径
	},
	content: {
		build: {
			markdown: {
				highlight: {
					langs: ["c", "cpp", "java", "properties", "python", "vue", "xml"],
					theme: "github-light",
				},
				toc: {
					depth: 2,
					searchDepth: 2,
				},
			},
		},
	},
	fonts: {
		providers: {
			google: false,
			googleicons: false,
			adobe: false,
			bunny: false,
			fontshare: false,
		},
		families: [
			{
				name: "Mars Needs Cunnilingus",
				src: "/fonts/Mars_Needs_Cunnilingus.ttf",
				weight: 500,
			},
			{
				name: "方正基础像素体",
				src: "/fonts/方正基础像素体.ttf",
				weight: 500,
			},
		],
	},
});
```

### 内容配置

```typescript
// content.config.ts
export default defineContentConfig({
	collections: {
		front_end: defineCollection({
			type: "page",
			source: "front_end/*.md",
		}),
		back_end: defineCollection({
			type: "page",
			source: "back_end/*.md",
		}),
		gms2: defineCollection({
			type: "page",
			source: "gms2/*.md",
		}),
		algorithm: defineCollection({
			type: "page",
			source: "algorithm/*.md",
		}),
		deep_learning: defineCollection({
			type: "page",
			source: "deep_learning/*.md",
		}),
	},
});
```

## 开发注意事项

### 类型安全

- 所有组件、组合式函数、状态管理都应该使用 TypeScript
- 类型定义文件位于 `app/types/` 目录
- 避免使用 `any` 类型，优先使用明确的类型定义

### 性能优化

- 使用 Nuxt 的自动导入功能，减少手动导入
- 合理使用 `defineAsyncData` 进行数据预加载
- 优化 GSAP 动画性能，避免过多的 DOM 操作
- 图片资源使用合适的格式和尺寸

### 响应式设计

- 使用现代 CSS 单位（`dvh`, `vw`, `rem`）
- 测试不同屏幕尺寸的显示效果
- 考虑移动端触摸交互体验

### 内容更新

- 新增文章只需在对应的 `content/` 子目录中添加 Markdown 文件
- 文件名会成为路由路径的一部分
- 使用 Nuxt Content 的查询 API 获取内容

## 故障排查

### 常见问题

1. **字体加载失败**: 检查 `public/fonts/` 目录中的字体文件路径
2. **内容不显示**: 确认 Markdown 文件在正确的 `content/` 子目录中
3. **动画卡顿**: 优化 GSAP 动画参数，减少同时执行的动画数量
4. **路由错误**: 检查 `pages/` 目录中的文件命名和结构

### 调试技巧

- 使用 Vue DevTools 进行组件状态调试
- 检查 Pinia 状态变化
- 使用浏览器开发者工具监控网络请求和性能
- 查看 Nuxt 开发工具的实时编译状态

## 未来扩展

### 计划中的功能

- 搜索功能集成
- 评论系统
- 文章标签系统
- 深色模式主题切换
- RSS 订阅支持
- 多语言支持

### 技术升级

- 考虑迁移到 Nuxt Content 的最新版本
- 优化构建产物大小
- 增强移动端体验
- 添加更多交互动画效果

---

## 快速参考

### 常用命令

```bash
# 开发
yarn dev

# 构建
yarn build

# 预览
yarn preview

# 静态生成
yarn generate

# 格式化代码（使用 Prettier）
yarn prettier --write .
```

### 关键文件路径

- 主配置: `nuxt.config.ts`
- 内容配置: `content.config.ts`
- 根组件: `app/app.vue`
- 首页: `app/pages/index.vue`
- 博客状态: `app/stores/blogStore.ts`
- 博客列表: `app/pages/blogs.vue`
- 物品展示: `app/pages/items.vue`
- 音乐页面: `app/pages/musics.vue`
- 内容目录: `content/`
- 公共资源: `public/`

### 重要组件引用

- 加载组件: `~/components/ui/Loading.vue`
- 博客菜单: `~/components/ui/blogUI/BlogMenu.vue`
- 音乐控制器: `~/components/ui/musicUI/MusicController.vue`
- 物品容器: `~/components/ui/itemUI/ItemContainer.vue`
- 主背景: `~/components/ui/mainUI/MainBackGround.vue`

### 代码格式化

项目使用 Prettier 进行代码格式化，配置为使用 Tab 缩进（见 `.vscode/settings.json`）。
运行 `yarn prettier --write .` 格式化所有文件。

---

本文档将根据项目发展持续更新。如需更多信息，请参考官方文档：

- [Nuxt.js 文档](https://nuxt.com)
- [Nuxt Content 文档](https://content.nuxt.com)
- [Pinia 文档](https://pinia.vuejs.org)
- [GSAP 文档](https://gsap.com)
