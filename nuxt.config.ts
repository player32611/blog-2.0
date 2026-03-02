// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/content", "@pinia/nuxt", "@nuxt/fonts"],
	devtools: { enabled: true },
	compatibilityDate: "2024-04-03",
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
				weight: 400,
			},
		],
	},
});
