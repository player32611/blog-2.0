export default defineNuxtRouteMiddleware((to, from) => {
	const loadingStore = useLoadingStore();

	if (!from.name) return;

	if (loadingStore.isLoading) return abortNavigation();
});
