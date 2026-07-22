# Blog 2.0

一个基于 Nuxt.js 4 构建的现代个人网站系统，采用内容驱动架构，专注于展示和交互体验。

## 在线演示

[GitHub Pages](https://player32611.github.io/blog-2.0/)

## 核心特性

- **内容管理系统** - 基于 Nuxt Content 3 的 Markdown 文件内容管理，支持多个技术分类
- **全局加载动画** - 路由切换时的自定义加载过渡效果
- **GSAP 动画系统** - 流畅的页面滚动（ScrollSmoother）、滚动触发动画（ScrollTrigger）
- **多媒体支持** - 集成音乐播放器（含文件夹浏览、播放列表、进度条）和图片画廊（全屏查看、详情展示）
- **物理引擎交互** - 使用 matter-js 实现可拖拽的物品展示（卡片、约束等）
- **自定义光标** - 全局自定义光标效果与悬停交互
- **响应式设计** - 客户端渲染的单页应用（SPA），支持触摸事件

## 技术栈

### 框架与核心

- [Nuxt.js 4](https://nuxt.com/) - Vue 3 全栈框架（SPA 模式，`ssr: false`）
- [Vue 3](https://vuejs.org/) - Composition API + TypeScript
- [Nuxt Content 3](https://content.nuxt.com/) - 内容管理系统
- [Pinia 3](https://pinia.vuejs.org/) - 状态管理

### 动画与交互

- [GSAP 3](https://gsap.com/) - 专业级动画库（ScrollTrigger、ScrollSmoother 插件）
- [matter-js](https://brm.io/matter-js/) - 2D 物理引擎
- [Sakana Widget 3](https://github.com/rocketduck/sakana-widget) - 桌面挂件组件

### 样式与字体

- [Sass](https://sass-lang.com/) - CSS 预处理器
- [@nuxt/fonts](https://github.com/nuxt/fonts) - 字体管理模块
- 自定义字体：Mars Needs Cunnilingus、方正基础像素体、Coustard Black

### 数据持久化

- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - SQLite 同步驱动

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
├── .github/workflows/deploy.yml   # GitHub Actions 自动部署配置
├── app/
│   ├── app.vue                    # 根组件，全局加载系统入口
│   ├── assets/
|   |   ├── anims/                 # Lottie 动画源码
|   |   ├── shaders/               # 着色器代码
|   |   └── styles/                # SCSS 全局变量定义
│   ├── components/                # 组件
│   │   ├── content/               # Markdown 渲染组件（Prose* 系列）与自定义渲染组件
│   │   ├── exhibit/               # 仅展示组件
│   │   └── ui/                    # UI 组件库
│   │       ├── blogUI/            # 文章页 UI（菜单、导航、遮罩、滚动条、背景）
│   │       ├── common/            # 通用 UI（按钮、故障文字等）
│   │       ├── detailUI/          # 介绍页 UI（标题分区、背景、代码区）
│   │       ├── imageUI/           # 图片画廊 UI（容器、查看器、光标、背景）
│   │       ├── itemUI/            # 沙盒 UI（容器、指南、命令栏、卡片、磁吸、书约束、Sakana）
│   │       ├── mainUI/            # 主界面 UI（容器、背景、光标、颜色条、遮罩、盒子）
│   │       ├── musicUI/           # 音乐播放器 UI（控制器、文件夹、唱片、列表、进度条、背景）
│   │       └── rootUI/            # 根级 UI（加载动画、音乐卡片）
│   ├── composables/               # 组合式函数
│   │   ├── useCanvasDrawing.ts    # Canvas 绘制
│   │   ├── usePageReady.ts        # 页面就绪控制（配合加载系统）
│   │   └── useSoundEffect.ts      # 音效控制
│   ├── middleware/                # 中间件
│   ├── pages/
│   │   ├── blogs/
│   │   |   └── [slug].vue         # 文章页动态路由（ScrollSmoother 平滑滚动）
│   │   ├── details.vue            # 详情页
│   │   ├── images.vue             # 画廊页
│   │   ├── index.vue              # 首页
│   │   ├── items.vue              # 沙盒页
│   │   └── musics.vue             # 音乐播放器
│   ├── stores/                    # Pinia 状态管理
│   │   ├── blogStore.ts           # 文章集合/内容状态
│   │   ├── detailStore.ts         # 介绍页全局状态
│   │   ├── imageStore.ts          # 图片画廊状态
│   │   ├── itemStore.ts           # 沙盒物品状态
│   │   ├── loadingStore.ts        # 全局加载动画状态
│   │   ├── mainStore.ts           # 主界面状态
│   │   └── soundStore.ts          # 音频播放状态
│   ├── types/                     # TypeScript 类型定义
│   │   ├── common.ts              # 通用类型
│   │   ├── components.ts          # 组件参数与实例类型
│   │   ├── composables.ts         # 组合式函数内部类型
│   │   ├── config.ts              # 配置级别类型
│   │   └── store.ts               # Pinia 状态类型
│   └── utils/                     # 工具函数
│       ├── blogs.ts               # 文章页专用函数
│       ├── common.ts              # 通用函数
│       ├── config.ts              # 全局配置
│       └── musics.ts              # 音乐播放专用函数
├── content/                       # Markdown 文章内容
│   ├── front_end/                 # 前端技术文章 -> /blogs/front_end/
│   ├── back_end/                  # 后端技术文章 -> /blogs/back_end/
│   ├── algorithm/                 # 算法文章     -> /blogs/algorithm/
│   ├── deep_learning/             # 深度学习文章   -> /blogs/deep_learning/
│   └── gms2/                      # GMS2 文章    -> /blogs/gms2/
└── public/
    ├── fonts/                    # 自定义字体
    ├── icons/                    # iconfont 自定义图标
    ├── images/                   # 图片
    └── sounds/                   # 音效和音乐

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

文件名会自动成为路由路径的一部分（例如 `content/front_end/vue.md` -> `/blogs/front_end/vue`）。

### 支持的内容分类

| 分类          | 路径                    | 说明               |
| ------------- | ----------------------- | ------------------ |
| front_end     | `/blogs/front_end/`     | 前端技术           |
| back_end      | `/blogs/back_end/`      | 后端技术           |
| algorithm     | `/blogs/algorithm/`     | 算法               |
| deep_learning | `/blogs/deep_learning/` | 深度学习           |
| gms2          | `/blogs/gms2/`          | GameMaker Studio 2 |

若要添加新分类，需要在 `content.config.ts`、`app/type/config.ts`、`app/utils/config.ts` 中进行配置修改

### Markdown 代码高亮

支持的语言：C、C++、Java、Properties、Python、Vue、XML（主题：github-light）

### Markdown 自定义组件

项目提供了丰富的 Prose 组件扩展：

- **提示框**：`Tip`、`Warning`、`Danger`
- **代码组**：`CodeGroup`（多标签代码块）
- **折叠详情**：`Detail`

## 核心架构

### 全局加载系统

路由切换时的加载动画流程：

1. **首次加载**（`app.vue`）：检查 `document.readyState`，未完成则等待 `window.load`
2. **路由跳转前**：调用 `loadingStore.loadingIn()` 触发动画
3. **目标页面**：在 `usePageReady()` 组合式函数中调用 `loadingStore.loadingOut()` 结束动画
4. **加载组件**：`app/components/ui/rootUI/Loading.vue` 处理动画进出状态

### 文章页面滚动

`blogs.vue` 使用 GSAP ScrollSmoother 实现平滑滚动：

```typescript
ScrollSmoother.create({
	wrapper: ".blog_content",
	content: ".blog_content_container",
	smooth: 1,
});
```

### 触摸事件处理

- 模板中使用 `@touchmove.prevent` 阻止默认滚动
- 文档级监听器：需要阻止默认行为时用 `{ passive: false }`，仅需提升滚动性能时用 `{ passive: true }`

### 物理引擎（matter-js）

`ItemContainer.vue` 使用 matter-js 实现物理交互：

- 物品组件：`ItemPhoneCard.vue`、`ItemSwitchCard.vue`
- 约束系统：`ItemMagnetConstraint.vue`（磁吸）、`ItemBookConstraint.vue`（书本）
- 交互控制：`ItemCommandBar.vue`（命令栏）、`ItemGuide.vue`（操作指南）

## 部署

### GitHub Pages（自动）

1. 推送到 `nuxt` 分支
2. GitHub Actions 自动构建并部署到 GitHub Pages

```bash
git push origin nuxt
```

部署配置位于 `.github/workflows/deploy.yml`

### 手动静态构建

```bash
yarn generate
# 输出目录：.output/public
```

## 开发规范

### 代码风格

- **TypeScript**：所有组件、组合式函数、Store 必须使用 TypeScript
- **组件命名**：PascalCase（如 `BlogMenu.vue`）
- **Store 命名**：`useXxxStore` 模式
- **缩进**：Tab（`.vscode/settings.json` 配置）
- **CSS**：使用 SCSS，`<style scoped>`
- **格式化**：运行 `yarn prettier --write .`

### Store 模式

Store 使用 Pinia 和显式 TypeScript 接口：

```typescript
export const useXxxStore = defineStore("xxx", (): XxxState & XxxGetter & XxxActions => {
	// ...
});
```

### GSAP 动画注意事项

- 使用 `gsap.to()`、`gsap.timeline()` 创建动画
- **必须在 `onUnmounted()` 中销毁动画**，防止内存泄漏
- ScrollTrigger 用于滚动触发动画，ScrollSmoother 用于平滑滚动

## 相关文档

- [Nuxt.js 文档](https://nuxt.com)
- [Nuxt Content 文档](https://content.nuxt.com)
- [Pinia 文档](https://pinia.vuejs.org)
- [GSAP 文档](https://gsap.com)
- [matter-js 文档](https://brm.io/matter-js/)

## License

MIT
