"use client";

import { create } from "zustand";
import { LoadingStore } from "../types/store";

export const useLoadingStore = create<LoadingStore>(() => ({
	loading: false,
	loadingRef: null,
	blocksRef: [],
	setLoading: (loading: boolean) => useLoadingStore.setState(() => ({ loading })),
	setLoadingRef: (ref: SVGSVGElement | null) =>
		useLoadingStore.setState(() => ({ loadingRef: ref })),
	setBlocksRef: (ref: SVGUseElement[]) => useLoadingStore.setState(() => ({ blocksRef: ref })),
}));
