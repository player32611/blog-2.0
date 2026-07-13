import type {
	DetailBottomMoreInstance,
	DetailMaskInstance,
	DetailWorkBlogCardParams,
} from "@/types/components";
import type { DetailState, DetailGetter, DetailActions } from "@/types/store";

export const useDetailStore = defineStore(
	"detail",
	(): DetailState & DetailGetter & DetailActions => {
		const workGameCurrentHp = ref<number>(MAIN_HP);
		const workBlogCurrentCard = ref<DetailWorkBlogCardParams>(DETAIL_WORK_BLOGDATA[0]!);
		const bottomMoreInstance = ref<DetailBottomMoreInstance | null>(null);
		const maskInstance = ref<DetailMaskInstance | null>(null);
		const shaderType = ref<"none" | "VCR distortion">("none");

		const setWorkGameCurrentHp = (hp: number) => {
			workGameCurrentHp.value = hp;
		};

		const setWorkBlogCurrentCard = (params: DetailWorkBlogCardParams) => {
			workBlogCurrentCard.value = params;
		};

		const damageWorkGameHp = (damage: number) => {
			if (damage > workGameCurrentHp.value) workGameCurrentHp.value = 1;
			else workGameCurrentHp.value -= damage;
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
			workBlogCurrentCard,
			bottomMoreInstance,
			maskInstance,
			shaderType,
			setWorkGameCurrentHp,
			setWorkBlogCurrentCard,
			damageWorkGameHp,
			setBottomMoreInstance,
			setMaskInstance,
			setShaderType,
		};
	},
);
