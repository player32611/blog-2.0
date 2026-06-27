import type { DetailBottomMoreInstance, DetailMaskInstance } from "~/types/components";
import type { DetailState, DetailGetter, DetailActions } from "@/types/store";

export const useDetailStore = defineStore(
	"detail",
	(): DetailState & DetailGetter & DetailActions => {
		const bottomMoreInstance = ref<DetailBottomMoreInstance | null>(null);
		const maskInstance = ref<DetailMaskInstance | null>(null);
		const shaderType = ref<"none" | "VCR distortion">("none");

		const setBottomMoreInstance = (instance: DetailBottomMoreInstance | null) => {
			bottomMoreInstance.value = instance;
		};

		const setMaskInstance = (mask: DetailMaskInstance | null) => {
			maskInstance.value = mask;
		};

		const setShaderType = (type: "none" | "VCR distortion") => {
			shaderType.value = type;
		};

		return {
			bottomMoreInstance,
			maskInstance,
			shaderType,
			setBottomMoreInstance,
			setMaskInstance,
			setShaderType,
		};
	},
);
