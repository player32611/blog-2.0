// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		baseURL: "/blog-2.0/",
		head: {
			link: [{ rel: "icon", type: "image/svg+xml", href: "/blog-2.0/soul.svg" }],
		},
	},
	modules: ["@nuxt/content", "@pinia/nuxt", "@nuxt/fonts"],
	devtools: { enabled: false },
	compatibilityDate: "2024-04-03",
	content: {
		build: {
			markdown: {
				highlight: {
					langs: ["c", "cpp", "java", "properties", "python", "vue", "xml"],
					theme: "github-dark",
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
			{
				name: "Coustard Black",
				src: "/fonts/Coustard_Black.woff2",
				weight: 500,
			},
		],
	},
	nitro: {
		prerender: {
			crawlLinks: true,
		},
	},
});
