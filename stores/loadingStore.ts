"use client";

import gsap from "gsap";
import { create } from "zustand";
import { LoadingStore } from "../types/store";

export const createLoadingStore = create<LoadingStore>((set, get) => ({
	loading: false,
	loadingRef: null,
	blocksRef: [],
	setLoading: loading => set({ loading }),
	setLoadingRef: ref => set({ loadingRef: ref }),
	setBlocksRef: ref => set({ blocksRef: ref }),
	loadingIn: next => {
		set({ loading: true });
		gsap
			.timeline()
			.set(get().blocksRef, {
				"stroke-dashoffset": () => {
					return Math.random() > 0.5 ? -100 : 100;
				},
			})
			.to(get().blocksRef, {
				"stroke-dashoffset": 1,
				"stroke-opacity": 1,
				duration: 0.4,
				ease: "power4.out",
				stagger: {
					from: "random",
					each: 0.0015,
				},
			})
			.to(get().blocksRef, {
				scale: 1,
				opacity: 1,
				duration: 0.4,
				ease: "power2.out",
				stagger: {
					from: "center",
					each: 0.003,
				},
			});
		setTimeout(() => {
			next();
			get().checkLoading();
		}, 1000);
	},
	loadingOut: () => {
		set({ loading: false });
		gsap
			.timeline()
			.set(get().blocksRef, {
				"stroke-dashoffset": () => {
					return Math.random() > 0.5 ? -100 : 100;
				},
			})
			.to(get().blocksRef, {
				"stroke-dashoffset": 0,
				"stroke-opacity": 1,
				duration: 0.5,
				ease: "power4.out",
				stagger: {
					from: "random",
					each: 0.002,
				},
			})
			.to(
				get().blocksRef,
				{
					scale: 0,
					opacity: 0,
					duration: 1,
					ease: "power2.out",
					stagger: {
						from: "center",
						each: 0.004,
					},
				},
				"<0.2",
			);
	},
	checkLoading: () => {
		const timer = setInterval(() => {
			if (document.readyState === "complete") {
				clearInterval(timer);
				get().loadingOut();
			}
		}, 300);
	},
}));
