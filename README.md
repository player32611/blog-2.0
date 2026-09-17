# Blog 2.0

一个基于 [Nuxt 4](https://nuxt.com/) 构建的**个人作品集与博客网站**，采用内容驱动架构（Nuxt Content 3），以**动画、交互与视觉体验**为核心。项目集成了 GSAP 平滑滚动、Three.js 着色器特效、matter-js 物理引擎、Lottie 矢量动画等一系列动效能力，并辅以自定义光标、全局音效等沉浸式细节。

## 在线演示

[GitHub Pages](https://player32611.github.io/blog-2.0/)

## ✨ 项目亮点

- **内容驱动架构** — 基于 Nuxt Content 3，Markdown 文件即内容，五大分类自动收集；提供提示框、代码组、折叠详情等自定义渲染组件，并支持 Shiki 代码高亮与目录（TOC）自动生成。
- **全局加载动画系统** — 每次路由切换都经过统一的加载过渡动画，由 `loadingStore` 状态机 + 全局中间件 + `usePageReady` 组合式函数 + `Loading` 组件协同完成，形成完整闭环。
- **GSAP 动画体系** — 使用 ScrollSmoother 实现文章页平滑滚动、ScrollTrigger 驱动滚动触发动画，配合 timeline 编排，动画自然流畅。
- **WebGL 着色器特效** — 通过 Three.js + 自定义 GLSL（VCR 扭曲、雪花飘落）实现实时 GPU 渲染的复古 CRT 故障效果。
- **物理引擎沙盒** — 使用 matter-js 实现可拖拽、带磁吸与书本约束的物理物品展示，并配套命令栏与操作指南。
- **Lottie 矢量动画** — 由 lottie-web 驱动多个 JSON 动画（加载动画、角色状态、场景过渡），动画资源与代码解耦。
- **像素风角色系统** — 以 Undertale 为灵感的像素角色（FRISK），支持发色、领结等外观组合与多种 Lottie 状态切换。
- **多媒体中心** — 音乐播放器（文件夹浏览、播放列表、进度条、旋转唱片）与图片画廊（全屏查看、详情、下载）。
- **沉浸式交互细节** — 全局自定义光标、悬停反馈、按钮音效，营造完整的体验氛围。
- **类型安全的工程化** — Vue 3 Composition API + TypeScript 全栈类型、Pinia 显式接口、严格命名规范，以及 GitHub Actions 自动化部署。

## 🧭 页面导览

| 页面 | 路由          | 说明                                       |
| ---- | ------------- | ------------------------------------------ |
| 首页 | `/`           | Undertale 主题交互主界面，暗藏通往各分类的链接 |
| 介绍 | `/details`    | 个人介绍页，含技能、作品、角色定制、着色器特效 |
| 沙盒 | `/items`      | matter-js 物理引擎物品展示                  |
| 音乐 | `/musics`     | 音乐播放器                                  |
| 图集 | `/images`     | 图片画廊                                    |
| 文章 | `/blogs/<slug>` | Markdown 文章阅读页（平滑滚动）            |

## 🛠 技术栈

### 框架与核心

- [Nuxt 4](https://nuxt.com/) — Vue 3 全栈框架
- [Vue 3](https://vuejs.org/) — Composition API + TypeScript
- [Nuxt Content 3](https://content.nuxt.com/) — 内容管理系统
- [Pinia 3](https://pinia.vuejs.org/) — 状态管理

### 动画与交互

- [GSAP 3](https://gsap.com/) — 专业级动画库（ScrollTrigger、ScrollSmoother）
- [matter-js](https://brm.io/matter-js/) — 2D 物理引擎
- [Three.js](https://threejs.org/) — WebGL 渲染与 GLSL 着色器
- [lottie-web](https://airbnb.io/lottie/) — Lottie 矢量动画
- [Sakana Widget 3](https://github.com/rocketduck/sakana-widget) — 桌面挂件组件

### 样式与字体

- [Sass](https://sass-lang.com/) — CSS 预处理器
- [@nuxt/fonts](https://github.com/nuxt/fonts) — 字体管理模块
- 自定义字体：Mars Needs Cunnilingus、方正基础像素体、Coustard Black
- iconfont — 自定义图标字体

### 数据与工程化

- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — SQLite 驱动（依赖声明）
- [Prettier](https://prettier.io/) — 代码格式化
- [GitHub Actions](https://github.com/features/actions) — 自动部署

## 🚀 快速开始

### 环境要求

- Node.js >= 20（部署环境使用 22）
- Yarn（项目使用 `yarn.lock` 锁定依赖）

### 安装

```bash
yarn install
```

### 开发

```bash
yarn dev
```

访问 http://localhost:3000

### 构建

```bash
yarn build      # 构建生产版本
yarn generate   # 生成静态站点（输出到 .output/public）
yarn preview    # 预览生产构建
```

### 代码格式化

```bash
yarn prettier --write .
```

## 📁 项目结构

```
blog-2.0/
├── .github/workflows/deploy.yml       # GitHub Actions 自动部署配置
├── app/
│   ├── app.vue                        # 根组件（加载系统入口 + 全局字体/样式）
│   ├── assets/
│   │   ├── anims/                     # Lottie 动画源文件（*.json）
│   │   ├── shaders/                   # GLSL 着色器（VCR 扭曲 / 雪花）
│   │   └── styles/                    # 全局 SCSS 变量
│   ├── components/
│   │   ├── content/                   # Markdown 自定义渲染组件（Prose*、Tip、CodeGroup...）
│   │   ├── exhibit/                   # 纯展示组件（加载动画素材、吉祥物等）
│   │   └── ui/                        # 业务 UI 组件
│   │       ├── blogUI/                # 文章页（菜单、导航、遮罩、滚动条、背景）
│   │       ├── common/                # 通用 UI（按钮、故障文字、玻璃瓶）
│   │       ├── detailUI/              # 介绍页（标题、技能、作品、着色器、角色、光标）
│   │       ├── imageUI/               # 图集页（容器、查看器、光标、背景、下载）
│   │       ├── itemUI/                # 沙盒页（容器、卡片、约束、命令栏、指南、Sakana）
│   │       ├── mainUI/                # 首页（容器、背景、光标、颜色瓶、遮罩、盒子）
│   │       ├── musicUI/               # 音乐页（控制器、文件夹、唱片、列表、进度、背景）
│   │       └── rootUI/                # 根级（加载动画、音乐卡片）
│   ├── composables/                   # 组合式函数
│   │   ├── useCanvasDrawing.ts        # Canvas 绘制
│   │   ├── usePageReady.ts            # 页面就绪控制（配合加载系统）
│   │   └── useSoundEffect.ts          # 音效控制
│   ├── middleware/
│   │   └── loading.global.ts          # 全局加载中间件（加载中阻止跳转）
│   ├── pages/
│   │   ├── blogs/[slug].vue           # 文章页动态路由（ScrollSmoother 平滑滚动）
│   │   ├── details.vue                # 介绍页
│   │   ├── images.vue                 # 图集页
│   │   ├── index.vue                  # 首页
│   │   ├── items.vue                  # 沙盒页
│   │   └── musics.vue                 # 音乐页
│   ├── stores/                        # Pinia 状态管理
│   │   ├── blogStore.ts               # 文章内容与菜单状态
│   │   ├── detailStore.ts             # 介绍页全局状态
│   │   ├── imageStore.ts              # 图集状态
│   │   ├── itemStore.ts               # 沙盒物品状态
│   │   ├── loadingStore.ts            # 全局加载动画状态
│   │   ├── mainStore.ts               # 首页状态
│   │   └── soundStore.ts              # 音频播放状态
│   ├── types/                         # TypeScript 类型定义
│   │   ├── common.ts                  # 通用类型
│   │   ├── components.ts              # 组件参数与实例类型
│   │   ├── composables.ts             # 组合式函数内部类型
│   │   ├── config.ts                  # 配置级别类型
│   │   └── store.ts                   # Pinia 状态类型
│   └── utils/                         # 工具函数
│       ├── blogs.ts                   # 文章页专用函数
│       ├── common.ts                  # 通用函数
│       ├── config.ts                  # 全局配置（链接、图片、音乐、技能等）
│       └── musics.ts                  # 音乐播放专用函数
├── content/                           # Markdown 文章内容（五大分类）
│   ├── front_end/                     # 前端技术
│   ├── back_end/                      # 后端技术
│   ├── algorithm/                     # 算法
│   ├── deep_learning/                 # 深度学习
│   └── gms2/                          # GameMaker Studio 2
├── content.config.ts                  # Content 集合定义
├── nuxt.config.ts                     # Nuxt 配置（模块、高亮、字体、预渲染）
├── public/
│   ├── fonts/                         # 自定义字体
│   ├── icons/                         # iconfont 自定义图标
│   ├── images/                        # 图片（背景、图集、文章插图、精灵图、封面）
│   ├── sounds/                        # 音效与音乐
│   └── soul.svg                       # 站点图标
├── tsconfig.json
└── package.json
```

## 📝 内容管理

### 添加新文章

在 `content/` 目录下对应的分类文件夹中新建 Markdown 文件即可：

```
content/
├── front_end/
│   └── my-new-article.md
├── back_end/
├── algorithm/
├── deep_learning/
└── gms2/
```

文件名即文章 slug，会自动成为路由的一部分（例如 `content/front_end/html.md` → `/blogs/html`）。slug 全局唯一，系统会跨分类查找对应内容。

### 支持的内容分类

| 分类          | 路径           | 说明               |
| ------------- | -------------- | ------------------ |
| front_end     | `/blogs/<slug>` | 前端技术           |
| back_end      | `/blogs/<slug>` | 后端技术           |
| algorithm     | `/blogs/<slug>` | 算法               |
| deep_learning | `/blogs/<slug>` | 深度学习           |
| gms2          | `/blogs/<slug>` | GameMaker Studio 2 |

若要新增分类，需同步修改 `content.config.ts`、`app/types/config.ts`、`app/utils/config.ts` 三处配置。

### 代码高亮

使用 Shiki 高亮，主题为 `github-dark`，支持语言包括：bash、c、cpp、css、html、http、java、javascript、json、jsx、markdown、properties、python、sql、tsx、typescript、vue、xml、yaml 等。

### Markdown 自定义组件

项目扩展了丰富的 Prose 渲染组件：

- **提示框**：`Tip`、`Warning`、`Danger`
- **代码组**：`CodeGroup`（多标签代码块）
- **折叠详情**：`Detail`

## 🏗 核心架构

### 全局加载系统

路由切换时的加载动画流程：

1. **首次加载**（`app.vue`）：挂载 `Loading` 组件，初始化 `loadingStore`，并注册 `router.beforeEach` 调用 `loadingStore.loadingIn()`
2. **全局中间件**（`loading.global.ts`）：加载动画进行中时通过 `abortNavigation()` 阻止并发路由跳转
3. **目标页面**：在 `usePageReady()` 组合式函数中等待 DOM 渲染、字体与资源加载完成后调用 `loadingStore.loadingOut()` 结束动画
4. **动画组件**：`app/components/ui/rootUI/Loading.vue` 处理进出场过渡

### 内容查询

`blogStore.useBlogContent` 使用 Nuxt Content 3 的 `queryCollection(collection).path(...)` 跨五大集合查找指定 slug 的文章，并返回首个匹配结果。

### 文章页平滑滚动

`blogs/[slug].vue` 使用 GSAP ScrollSmoother 实现平滑滚动：

```typescript
ScrollSmoother.create({
  wrapper: wrapperRef.value,
  content: contentRef.value,
  smooth: 1,
  onUpdate: navigationRef.value?.handleScroll,
});
```

### WebGL 着色器

`DetailShader.vue` 通过 Three.js 的 `ShaderMaterial` 加载 GLSL 顶点/片元着色器，实现 VCR 扭曲等实时特效，并在 `onUnmounted` 中释放渲染资源。

### 物理引擎（matter-js）

`ItemContainer.vue` 使用 matter-js 实现物理交互：

- 物品组件：`ItemPhoneCard.vue`、`ItemSwitchCard.vue`、`ItemPokerCard.vue`、`ItemEarthCard.vue` 等
- 约束系统：`ItemMagnetConstraint.vue`（磁吸）、`ItemBookConstraint.vue`（书本）
- 交互控制：`ItemCommandBar.vue`（命令栏）、`ItemGuide.vue`（操作指南）

## 🚀 部署

### GitHub Pages（自动）

1. 推送代码到 `nuxt` 分支
2. GitHub Actions 自动安装依赖、执行 `nuxi generate` 构建静态站点，并通过 `deploy-pages` 部署到 GitHub Pages

```bash
git push origin nuxt
```

部署配置位于 `.github/workflows/deploy.yml`，站点 `baseURL` 为 `/blog-2.0/`。

### 手动静态构建

```bash
yarn generate
# 输出目录：.output/public
```

## 📐 开发规范

### 代码风格

- **TypeScript**：组件、组合式函数、Store 均使用 TypeScript
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

## 📚 相关文档

- [Nuxt 文档](https://nuxt.com)
- [Nuxt Content 文档](https://content.nuxt.com)
- [Pinia 文档](https://pinia.vuejs.org)
- [GSAP 文档](https://gsap.com)
- [matter-js 文档](https://brm.io/matter-js/)
- [Three.js 文档](https://threejs.org/)

## License

MIT
