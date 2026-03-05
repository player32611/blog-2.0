// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/content", "@pinia/nuxt", "@nuxt/fonts"],
	devtools: { enabled: true },
	compatibilityDate: "2024-04-03",
	components: {
		dirs: [
			{
				path: "~/components/content",
				prefix: "Prose",
				global: true,
			},
		],
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
				src: "/fonts/Mars_Needs_Cunnilingus.ttf", // 相对于 public 目录
				weight: 500,
			},
			{
				name: "方正基础像素体",
				src: "/fonts/方正基础像素体.ttf",
				weight: 500,
			},
		],
	},
	ssr: false, // 根据需要选择 true 或 false
	app: {
		baseURL: "/blog-2.0/", // GitHub Pages 需要这个配置
	},
});
