/**
 * 等待页面组件及其子资源完全加载后自动调用 loadingStore.loadingOut()
 * 使用 nextTick + requestAnimationFrame 确保 DOM 渲染和资源加载完成
 */
export const usePageReady = (before?: () => void | Promise<void>) => {
	const isReady = ref(false);
	const loadingStore = useLoadingStore();

	const waitForRender = () =>
		new Promise<void>(resolve => {
			requestAnimationFrame(() => {
				// 使用 setTimeout 确保在渲染完成后执行
				setTimeout(resolve, 0);
			});
		});

	const init = async () => {
		try {
			console.log("111 - 开始初始化");

			// 等待 Vue 完成 DOM 更新
			await nextTick();
			console.log("222 - nextTick 完成");

			// 等待两次渲染帧（第一次用于布局，第二次用于绘制）
			await waitForRender();
			await waitForRender();
			console.log("333 - 渲染完成");

			// 执行用户的 before 回调（可能包含异步操作）
			if (before) {
				await before();
				console.log("444 - before 执行完成");
			}

			// 等待字体加载（带超时保护）
			if (document.fonts) {
				await Promise.race([
					document.fonts.ready,
					new Promise<void>(resolve => setTimeout(resolve, 3000)),
				]);
				console.log("555 - 字体加载完成（或超时）");
			}

			isReady.value = true;
			console.log("666 - 页面已准备就绪");
			loadingStore.loadingOut();
		} catch (error) {
			console.error("页面初始化失败:", error);
			// 确保在任何情况下都能关闭 loading
			isReady.value = false;
			loadingStore.loadingOut();
		}
	};

	onMounted(() => {
		void init();
	});

	return {
		isReady,
	};
};
