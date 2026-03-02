// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useRef } from "react";
// import { createLoadingStore } from "@/stores/loadingStore";
// import type { RouterProviderParams } from "@/types/components";

// export default function RouterProvider({ children }: RouterProviderParams) {
// 	const router = useRouter();
// 	const { loadingIn } = createLoadingStore();
// 	const isNavigating = useRef(false);

// 	useEffect(() => {
// 		// 保存原始方法
// 		const originalPush = router.push;
// 		const originalBack = router.back;
// 		const originalForward = router.forward;

// 		// 重写 push 方法
// 		router.push = function customPush(href: string, options?: { scroll?: boolean }) {
// 			if (isNavigating.current) {
// 				return Promise.resolve(); // 避免重复导航
// 			}

// 			isNavigating.current = true;

// 			return new Promise<void>(resolve => {
// 				loadingIn(() => {
// 					originalPush.call(this, href, options);
// 					isNavigating.current = false;
// 					resolve();
// 				});
// 			});
// 		};

// 		// 重写 back 方法
// 		router.back = function customBack() {
// 			if (isNavigating.current) {
// 				return;
// 			}

// 			isNavigating.current = true;

// 			loadingIn(() => {
// 				originalBack.call(this);
// 				isNavigating.current = false;
// 			});
// 		};

// 		// 重写 forward 方法
// 		router.forward = function customForward() {
// 			if (isNavigating.current) {
// 				return;
// 			}

// 			isNavigating.current = true;

// 			loadingIn(() => {
// 				originalForward.call(this);
// 				isNavigating.current = false;
// 			});
// 		};

// 		// 监听浏览器前进后退按钮
// 		const handlePopState = () => {
// 			if (isNavigating.current) {
// 				return;
// 			}

// 			isNavigating.current = true;

// 			loadingIn(() => {
// 				// 让浏览器完成导航
// 				isNavigating.current = false;
// 			});
// 		};

// 		// 添加事件监听器
// 		window.addEventListener("popstate", handlePopState);

// 		// 清理函数
// 		return () => {
// 			router.push = originalPush;
// 			router.back = originalBack;
// 			router.forward = originalForward;
// 			window.removeEventListener("popstate", handlePopState);
// 		};
// 	}, [router, loadingIn]);

// 	return <>{children}</>;
// }
