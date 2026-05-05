/**
 * 等待页面组件及其子资源完全加载后自动调用 loadingStore.loadingOut()
 * 使用 nextTick + requestAnimationFrame 确保 DOM 渲染和资源加载完成
 */
export function usePageReady() {
	const isReady = ref(false);
	const loadingStore = useLoadingStore();

	/**
	 * 等待页面完全加载并通知 loading store
	 */
	const init = async () => {
		// 等待当前 tick 的 DOM 更新完成
		await nextTick();
		// 等待浏览器完成渲染（下一帧）
		await new Promise(resolve => requestAnimationFrame(resolve));
		// 再等待一帧确保浏览器完成所有资源加载
		await new Promise(resolve => requestAnimationFrame(resolve));

		isReady.value = true;
		// 通知 loading store 页面已准备好
		loadingStore.loadingOut();
	};

	onMounted(() => {
		init();
	});

	return {
		isReady,
	};
}
