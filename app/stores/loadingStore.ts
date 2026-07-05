import type { LoadingInstance } from "~/types/components";
import type { LoadingState, LoadingGetter, LoadingActions } from "~/types/store";

export const useLoadingStore = defineStore(
	"loading",
	(): LoadingState & LoadingGetter & LoadingActions => {
		const loadingRef = ref<LoadingInstance | null>(null);
		const isLoading = ref<boolean>(true);
		const router = useRouter();

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

		function loadingNavigate(target: string | number) {
			if (isLoading.value) return;
			if (typeof target === "string") navigateTo(target);
			else if (typeof target === "number") router.go(target);
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
