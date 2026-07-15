import type { Point } from "~/types/common";
import type { MainState, MainGetter, MainActions } from "~/types/store";

export const useMainStore = defineStore("main", (): MainState & MainGetter & MainActions => {
	const isDragging = ref<boolean>(false);
	const backgroundTransform = ref<Point>({ x: 0, y: 0 });

	const setIsDragging = (state: boolean) => {
		isDragging.value = state;
	};

	const setBackgroundTransform = (transform: Point) => {
		backgroundTransform.value = transform;
	};

	return { isDragging, backgroundTransform, setIsDragging, setBackgroundTransform };
});
