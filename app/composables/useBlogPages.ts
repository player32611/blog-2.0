import { useRoute } from "#app";
import { useAsyncData } from "#app";

export const useBlogPage = async (path: string) => {
	const route = useRoute();
	const { data: page } = await useAsyncData(route.path, () => {
		return queryCollection("content").path("/front-end/html").first();
	});
	return { page };
};
