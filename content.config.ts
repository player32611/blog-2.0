import { defineContentConfig, defineCollection } from "@nuxt/content";

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
