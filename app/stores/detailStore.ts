import type { DetailBottomMoreInstance, DetailMaskInstance } from "@/types/components";
import type { DetailState, DetailGetter, DetailActions } from "@/types/store";

export const useDetailStore = defineStore(
	"detail",
	(): DetailState & DetailGetter & DetailActions => {
		const workGameCurrentHp = ref<number>(MAIN_HP);
		const bottomMoreInstance = ref<DetailBottomMoreInstance | null>(null);
		const maskInstance = ref<DetailMaskInstance | null>(null);
		const shaderType = ref<"none" | "VCR distortion">("none");

		const setWorkGameCurrentHp = (hp: number) => {
			workGameCurrentHp.value = hp;
		};

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
			workGameCurrentHp,
			bottomMoreInstance,
			maskInstance,
			shaderType,
			setWorkGameCurrentHp,
			setBottomMoreInstance,
			setMaskInstance,
			setShaderType,
		};
	},
);
