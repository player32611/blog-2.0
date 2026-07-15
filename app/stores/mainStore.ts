import type { Point, Rectangle } from "~/types/common";
import type { MainState, MainGetter, MainActions } from "~/types/store";

export const useMainStore = defineStore("main", (): MainState & MainGetter & MainActions => {
	const isDragging = ref<boolean>(false);
	const isResized = ref<boolean>(false);
	const backgroundSize = ref<Rectangle>({ width: 0, height: 0 });
	const backgroundTransform = ref<Point>({ x: 0, y: 0 });

	const setIsDragging = (state: boolean) => {
		isDragging.value = state;
	};

	const setIsResized = (state: boolean) => {
		isResized.value = state;
	};

	const setBackgroundSize = (rect: Rectangle) => {
		backgroundSize.value = rect;
	};

	const setBackgroundTransform = (transform: Point) => {
		backgroundTransform.value = transform;
	};

	return {
		isDragging,
		isResized,
		backgroundSize,
		backgroundTransform,
		setIsDragging,
		setIsResized,
		setBackgroundSize,
		setBackgroundTransform,
	};
});
