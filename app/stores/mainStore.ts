import type { MainState, MainGetter, MainActions } from "~/types/store";

export const useMainStore = defineStore("main", (): MainState & MainGetter & MainActions => {
	const isDragging = ref<boolean>(false);

	const setIsDragging = (state: boolean) => {
		isDragging.value = state;
	};

	return { isDragging, setIsDragging };
});
