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

	/**
	 * 设置当前激活的博客分类
	 * @param newCollection - 新的博客分类，类型为 BlogCollections
	 */
	function setActiveBlogCollection(newCollection: BlogCollections) {
		activeBlogCollection.value = newCollection;
	}

	/**
	 * 设置当前激活的博客内容
	 * @param newContent - 新的博客内容，类型为 BlogContent（字符串类型）
	 */
	function setActiveBlogContent(newContent: BlogContent) {
		activeBlogContent.value = newContent;
	}

	/**
	 * 获取当前激活路径对应的博客内容数据
	 *
	 * 该函数使用 useAsyncData 钩子来异步获取指定路径的博客内容，
	 * 并监听 activePath 的变化以自动重新获取数据。
	 *
	 * @returns 返回包含博客页面数据的响应式引用对象，类型为 MaybeRef<unknown>
	 */
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
