// "use client";

// import { useLoadingStore } from "@/stores/loadingStore";
// import { usePathname, useRouter } from "next/navigation";
// import { useCallback, useEffect, useRef } from "react";
// import { gsap } from "gsap";

// export const useLoading = () => {
// 	const pathname = usePathname();
// 	const router = useRouter();
// 	const blocksAd = useRef<GSAPAnimation>(null);

// 	const {
// 		loading,
// 		setLoading,
// 		loadingRef,
// 		setLoadingRef,
// 		blocksRef,
// 		setBlocksRef,
// 		loadingInitRef,
// 	} = useLoadingStore();

// 	// const loadingIn = useCallback(
// 	// 	(target?: string) => {
// 	// 		setLoading(true);
// 	// 		// if (blocksAd.current) blocksAd.current.kill();
// 	// 		blocksAd.current = gsap
// 	// 			.timeline()
// 	// 			.set(blocksRef, {
// 	// 				"stroke-dashoffset": () => {
// 	// 					return Math.random() > 0.5 ? -100 : 100;
// 	// 				},
// 	// 			})
// 	// 			.to(blocksRef, {
// 	// 				"stroke-dashoffset": 1,
// 	// 				"stroke-opacity": 1,
// 	// 				duration: 0.5,
// 	// 				ease: "power4.out",
// 	// 				stagger: {
// 	// 					from: "random",
// 	// 					each: 0.0015,
// 	// 				},
// 	// 			})
// 	// 			.to(blocksRef, {
// 	// 				scale: 1,
// 	// 				opacity: 1,
// 	// 				duration: 0.5,
// 	// 				ease: "power2.out",
// 	// 				stagger: {
// 	// 					from: "center",
// 	// 					each: 0.003,
// 	// 				},
// 	// 			});
// 	// 		setTimeout(() => {
// 	// 			if (target) {
// 	// 				router.push(target);
// 	// 			}
// 	// 		}, 1500);
// 	// 	},
// 	// 	[setLoading, blocksRef, router],
// 	// );

// 	// const loadingOut = useCallback(() => {
// 	// 	setLoading(false);
// 	// 	// if (blocksAd.current) blocksAd.current.kill();
// 	// 	blocksAd.current = gsap
// 	// 		.timeline()
// 	// 		.set(blocksRef, {
// 	// 			"stroke-dashoffset": () => {
// 	// 				return Math.random() > 0.5 ? -100 : 100;
// 	// 			},
// 	// 		})
// 	// 		.to(blocksRef, {
// 	// 			"stroke-dashoffset": 1,
// 	// 			"stroke-opacity": 1,
// 	// 			duration: 0.5,
// 	// 			ease: "power4.out",
// 	// 			stagger: {
// 	// 				from: "random",
// 	// 				each: 0.0015,
// 	// 			},
// 	// 		})
// 	// 		.to(
// 	// 			blocksRef,
// 	// 			{
// 	// 				scale: 0,
// 	// 				opacity: 0,
// 	// 				duration: 0.5,
// 	// 				ease: "power2.out",
// 	// 				stagger: {
// 	// 					from: "center",
// 	// 					each: 0.003,
// 	// 				},
// 	// 			},
// 	// 			"<0.2",
// 	// 		);
// 	// }, [setLoading, blocksRef]);

// 	const loadingInit = useCallback(
// 		(loadingRef: SVGSVGElement, blocksRef: SVGUseElement[]) => {
// 			setLoadingRef(loadingRef);
// 			setBlocksRef(blocksRef);
// 		},
// 		[setLoadingRef, setBlocksRef],
// 	);

// 	// const checkLoading = useCallback(() => {
// 	// 	const timer = setInterval(() => {
// 	// 		if (document.readyState === "complete") clearInterval(timer);
// 	// 		loadingOut();
// 	// 	}, 300);
// 	// }, [loadingOut]);

// 	useEffect(() => {
// 		checkLoading();
// 	}, [pathname, loadingOut, checkLoading]);

// 	// useEffect(() => {
// 	// 	const handlePopState = () => {
// 	// 		loadingIn();
// 	// 		setTimeout(() => {
// 	// 			loadingOut();
// 	// 		}, 1000);
// 	// 	};
// 	// 	window.addEventListener("popstate", handlePopState);
// 	// 	return () => {
// 	// 		window.removeEventListener("popstate", handlePopState);
// 	// 	};
// 	// }, [loadingIn, loadingOut]);

// 	return {
// 		loadingInit,
// 		loadingIn,
// 		loadingOut,
// 	};
// };
