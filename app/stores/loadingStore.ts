import type { LoadingInstance } from "~/types/components";
import type { LoadingState, LoadingGetter, LoadingActions } from "~/types/store";

export const useLoadingStore = defineStore(
	"loading",
	(): LoadingState & LoadingGetter & LoadingActions => {
		const loadingRef = ref<LoadingInstance | null>(null);
		const isLoading = ref<boolean>(true);

		function initLoadingRef(loading: LoadingInstance) {
			loadingRef.value = loading;
		}

		function setIsLoading(state: boolean) {
			isLoading.value = state;
		}

		function loadingIn(next: () => void) {
			if (isLoading.value) return;
			isLoading.value = true;
			loadingRef.value?.loadingIn(next);
		}

		function loadingOut() {
			if (!isLoading.value) return;
			isLoading.value = false;
			loadingRef.value?.loadingOut();
		}

		return { loadingRef, isLoading, initLoadingRef, setIsLoading, loadingIn, loadingOut };
	},
);
