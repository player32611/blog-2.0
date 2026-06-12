import type { DetailMaskInstance } from "~/types/components";
import type { DetailState, DetailGetter, DetailActions } from "@/types/store";

export const useDetailStore = defineStore(
	"detail",
	(): DetailState & DetailGetter & DetailActions => {
		const maskInstance = ref<DetailMaskInstance | null>(null);

		const setMaskInstance = (mask: DetailMaskInstance | null) => {
			maskInstance.value = mask;
		};

		return { maskInstance, setMaskInstance };
	},
);
