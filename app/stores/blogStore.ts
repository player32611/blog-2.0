import { defineStore } from "pinia";
import type { BlogMaskInstance, BlogMenuInstance } from "~/types/components";
import type { BlogCollections } from "~/types/config";
import type { BlogState, BlogGetter, BlogActions } from "@/types/store";

export const useBlogStore = defineStore("blog", (): BlogState & BlogGetter & BlogActions => {
	const maskInstance = ref<BlogMaskInstance | null>(null);
	const menuInstance = ref<BlogMenuInstance | null>(null);

	/**
	 * 获取当前激活路径对应的博客内容数据
	 *
	 * 该函数使用 useAsyncData 钩子来异步获取指定路径的博客内容，
	 * 并监听 activePath 的变化以自动重新获取数据。
	 *
	 * @returns 返回包含博客页面数据的响应式引用对象，类型为 MaybeRef<unknown>
	 */
	const useBlogContent = async (content: BlogCollections) => {
		for (const collection of BLOG_COLLECTIONS) {
			try {
				const result = await queryCollection(collection).path(`/${collection}/${content}`).first();
				if (result) {
					return result;
				}
			} catch (error) {
				continue;
			}
		}
		return null;
	};

	const setBlogInstance = (mask: BlogMaskInstance | null, menu: BlogMenuInstance | null) => {
		maskInstance.value = mask;
		menuInstance.value = menu;
	};

	const changeBlogMenuState = () => {
		if (maskInstance.value && menuInstance.value) {
			maskInstance.value.changeMask();
			menuInstance.value.changeMenu();
		}
	};

	return {
		maskInstance,
		menuInstance,
		useBlogContent,
		setBlogInstance,
		changeBlogMenuState,
	};
});
