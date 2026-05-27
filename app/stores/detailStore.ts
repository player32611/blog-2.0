import type { DetailState, DetailGetter, DetailActions } from "~/types/store";

export const useDetailStore = defineStore(
	"detail",
	(): DetailState & DetailGetter & DetailActions => {
		const smootherInstance = ref<ScrollSmoother | null>(null);

		function setSmootherInstance(smoother: ScrollSmoother | null) {
			smootherInstance.value = smoother;
		}

		return {
			smootherInstance,
			setSmootherInstance,
		};
	},
);
