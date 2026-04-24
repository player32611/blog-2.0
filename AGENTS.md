# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

# Blog 2.0 - Project Guide

## Overview

A personal blog system built with Nuxt.js 4, featuring content-driven architecture with Markdown-based articles, GSAP animations, matter-js physics engine, and multimedia support (music player, image gallery).

## Tech Stack

- **Nuxt.js 4.3.1** - Vue 3 full-stack framework (SPA mode, `ssr: false`)
- **Nuxt Content 3.11.2** - Content management system
- **Pinia 3.0.4** - State management
- **GSAP 3.14.2** - Animation library (with ScrollTrigger, ScrollSmoother plugins)
- **matter-js 0.20.0** - 2D physics engine
- **Sass 1.97.3** - CSS preprocessor
- **better-sqlite3 12.8.0** - Data persistence

## Common Commands

```bash
yarn dev              # Start dev server (http://localhost:3000)
yarn build            # Build production version
yarn preview          # Preview production build
yarn generate         # Generate static site
yarn prettier --write .  # Format code (uses Tab indentation)
```

**Environment**: Node.js 20+

## Project Structure

```
blog-2.0/
├── app/
│   ├── app.vue                    # Root component with global loading system
│   ├── components/
│   │   ├── content/               # Markdown rendering components (Prose*)
│   │   ├── exhibit/               # Exhibition components
│   │   └── ui/                    # UI component library
│   │       ├── blogUI/            # Blog-specific UI (menu, navigation, mask)
│   │       ├── imageUI/           # Image gallery components
│   │       ├── itemUI/            # Physics engine item display
│   │       ├── mainUI/            # Main interface components
│   │       └── musicUI/           # Music player components
│   ├── composables/               # Reusable functions
│   │   ├── usePageReady.ts       # Page ready hook
│   │   └── useSoundEffect.ts     # Sound effect handling
│   ├── pages/
│   │   ├── [...slug].vue          # Dynamic content routes
│   │   ├── index.vue              # Homepage
│   │   ├── blogs.vue              # Blog list with GSAP ScrollSmoother
│   │   ├── items.vue              # Physics engine showcase
│   │   ├── images.vue             # Image gallery
│   │   └── musics.vue             # Music player page
│   ├── stores/
│   │   ├── blogStore.ts          # Blog collection/content state
│   │   ├── loadingStore.ts       # Global loading animation state
│   │   └── soundStore.ts         # Audio playback state
│   ├── types/                     # TypeScript type definitions
│   └── utils/                     # Utility functions
├── content/                       # Markdown articles
│   ├── front_end/                 # -> /blogs/front_end/
│   ├── back_end/                  # -> /blogs/back_end/
│   ├── algorithm/                 # -> /blogs/algorithm/
│   ├── deep_learning/             # -> /blogs/deep_learning/
│   └── gms2/                      # -> /blogs/gms2/
├── public/
│   ├── fonts/                     # Custom fonts (Mars Needs Cunnilingus, 方正基础像素体)
│   ├── images/                    # Background, cover, UI images
│   ├── sounds/                    # Effects and music
│   └── icons/                     # iconfont custom icons
└── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
```

## Architecture

### Content System

- **Collections** defined in `content.config.ts`: front_end, back_end, algorithm, deep_learning, gms2
- **Routing**: Markdown filenames become route paths (e.g., `content/front_end/vue.md` -> `/blogs/front_end/vue`)
- **Querying**: Use `queryCollection(collectionName).path(routePath).first()` to fetch content
- **Dynamic routes**: `app/pages/[...slug].vue` handles content rendering with `ContentRenderer`

### Loading System

The app uses a global loading animation for route transitions:

1. **First load** (`app.vue`): Checks `document.readyState`, waits for `window.load` if not complete
2. **Route changes**: `loadingStore.loadingIn()` triggers animation before navigation
3. **Target page ready**: `usePageReady()` composable calls `loadingStore.loadingOut()` when resources loaded
4. **Implementation**: `Loading.vue` component handles animation in/out states

### Blog Page Architecture

`blogs.vue` page uses GSAP ScrollSmoother for custom scrolling:

```typescript
ScrollSmoother.create({
  wrapper: ".blog_content",
  content: ".blog_content_container",
  smooth: 1,
});
```

Blog state management (`blogStore.ts`) handles:
- Active collection/content tracking
- Computed path generation
- Component instance management (mask, menu)

### Animation Patterns

- **GSAP animations**: Use `gsap.to()`, `gsap.timeline()` for animations
- **ScrollTrigger**: For scroll-based animations
- **ScrollSmoother**: For smooth scrolling on blog page
- **Cleanup**: Always kill animations in `onUnmounted()` to prevent memory leaks

### Touch Event Handling

For touch events that need to prevent default behavior (dragging, custom interactions):
- Use `@touchmove.prevent` in Vue templates
- For document-level listeners: `addEventListener("touchmove", handler, { passive: false })`
- If default behavior is NOT needed, use `{ passive: true }` for better scroll performance

### State Management

Stores use Pinia with explicit TypeScript interfaces:

```typescript
export const useXxxStore = defineStore(
  "xxx",
  (): XxxState & XxxGetter & XxxActions => {
    // ...
  }
);
```

- **blogStore.ts**: Blog collection/content state, component instances
- **loadingStore.ts**: Loading animation control, navigation wrapper
- **soundStore.ts**: Music playback, sound effects

### Music Player

Music system includes:
- `MusicController.vue`: Main player controls
- `MusicFolder.vue`, `MusicRecord.vue`, `MusicList.vue`: Music display components
- `MusicProgress.vue`: Progress bar with GSAP animation
- Audio files in `public/sounds/musics/`

### Physics Engine (matter-js)

`ItemContainer.vue` uses matter-js for physics-based item interactions:
- Items: `ItemPhoneCard.vue`, `ItemSwitchCard.vue`
- Physics bodies with gravity, collision detection

## Code Style

- **TypeScript**: Required for all components, composables, stores
- **Component naming**: PascalCase (`BlogMenu.vue`)
- **Store naming**: `useXxxStore` pattern
- **CSS**: SCSS with `scoped` attribute
- **Indentation**: Tabs (configured in `.vscode/settings.json`)
- **Formatting**: Run `yarn prettier --write .`

## Deployment

### GitHub Pages (Automated)

- **Trigger**: Push to `nuxt` branch
- **Config**: `.github/workflows/deploy.yml`
- **Command**: `git push origin nuxt`
- **URL**: https://player32611.github.io/blog-2.0/
- **Base URL**: Configured in `nuxt.config.ts` as `app.baseURL: "/blog-2.0/"`

### Manual Static Build

```bash
yarn generate
# Output: .output/public
```

## Key Files

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Main Nuxt configuration |
| `content.config.ts` | Content collections definition |
| `app/app.vue` | Root component, loading system setup |
| `app/pages/[...slug].vue` | Dynamic content route handler |
| `app/pages/blogs.vue` | Blog list with ScrollSmoother |
| `app/stores/blogStore.ts` | Blog state management |
| `app/stores/loadingStore.ts` | Loading animation control |
| `app/composables/usePageReady.ts` | Page ready hook for loading system |

## Adding Content

1. Create Markdown file in appropriate `content/` subdirectory
2. Filename becomes route path (e.g., `my-article.md` -> `/blogs/front_end/my-article`)
3. Supported code highlight languages: C, C++, Java, Properties, Python, Vue, XML

## Troubleshooting

- **Content not showing**: Verify Markdown is in correct `content/` subdirectory matching collection name
- **Font loading issues**: Check files exist in `public/fonts/`
- **Animation lag**: Reduce concurrent GSAP animations, kill unused animations
- **Route errors**: Check `pages/` file naming matches expected structure
- **Touch scroll performance**: Ensure passive/non-passive event listeners are set correctly
