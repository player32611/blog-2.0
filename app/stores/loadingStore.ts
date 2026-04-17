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
			loadingRef.value?.loadingIn(next);
			isLoading.value = true;
		}

		function loadingOut() {
			if (!isLoading.value) return;
			loadingRef.value?.loadingOut();
		}

		function loadingNavigate(target: string) {
			if (isLoading.value) return;
			navigateTo(target);
		}

		return {
			loadingRef,
			isLoading,
			initLoadingRef,
			setIsLoading,
			loadingIn,
			loadingOut,
			loadingNavigate,
		};
	},
);
