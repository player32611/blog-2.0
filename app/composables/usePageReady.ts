/**
 * 等待页面组件及其子资源完全加载后自动调用 loadingStore.loadingOut()
 * 使用 nextTick + requestAnimationFrame 确保 DOM 渲染和资源加载完成
 */
export function usePageReady() {
	const isReady = ref(false);
	const loadingStore = useLoadingStore();

	const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

	const init = async () => {
		await nextTick();

		await nextFrame();
		await nextFrame();

		// 等待字体加载
		if (document.fonts) {
			await document.fonts.ready;
		}

		isReady.value = true;

		loadingStore.loadingOut();
	};

	onMounted(() => {
		void init();
	});

	return {
		isReady,
	};
}
