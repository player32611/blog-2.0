import { defineStore } from "pinia";
import type {
	BlogCollections,
	BlogContent,
	BlogState,
	BlogGetter,
	BlogActions,
} from "@/types/store";

export const useBlogStore = defineStore("blog", (): BlogState & BlogGetter & BlogActions => {
	const activeBlogCollection = ref<BlogCollections>("front_end");
	const activeBlogContent = ref<BlogContent>("html");

	const activePath = computed(() => {
		return `/${activeBlogCollection.value}/${activeBlogContent.value}`;
	});

	function setActiveBlogCollection(newCollection: BlogCollections) {
		activeBlogCollection.value = newCollection;
	}
	function setActiveBlogContent(newContent: BlogContent) {
		activeBlogContent.value = newContent;
	}
	function useBlogContent() {
		const { data: page } = useAsyncData(
			activePath.value,
			() => {
				return queryCollection(activeBlogCollection.value).path(activePath.value).first();
			},
			{
				watch: [activePath],
			},
		);
		return page;
	}
	return {
		activeBlogCollection,
		activeBlogContent,
		activePath,
		setActiveBlogCollection,
		setActiveBlogContent,
		useBlogContent,
	};
});
