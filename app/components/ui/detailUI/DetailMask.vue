<script setup lang="ts">
import gsap from "gsap";
import type { DetailMaskInstance } from "~/types/components";

const isNavigating = ref<boolean>(false);
const maskRef = ref<HTMLDivElement | null>(null);

const maskEaseDuration: number = 1;

const maskIn = (options?: gsap.TweenVars) => {
	isNavigating.value = true;
	gsap.to(maskRef.value, {
		backgroundColor: "#ffff00ff",
		ease: "power1.out",
		duration: maskEaseDuration,
		...options,
	});
};

const maskOut = (options?: gsap.TweenVars) => {
	const originalOnComplete = options?.onComplete;

	gsap.to(maskRef.value, {
		backgroundColor: "#ffff0000",
		ease: "power1.in",
		duration: maskEaseDuration,
		onComplete: () => {
			isNavigating.value = false;
			originalOnComplete?.();
		},
		...options,
	});
};

defineExpose<DetailMaskInstance>({
	maskIn,
	maskOut,
});
</script>

<template>
	<div class="detail_mask" v-show="isNavigating" ref="maskRef"></div>
</template>

<style scoped lang="scss">
@use "../../../assets/styles/variables.scss";

.detail_mask {
	position: fixed;
	top: 0;
	height: 100vh;
	width: 100vw;
	background-color: #ffff0000;
	z-index: variables.$loading_zIndex;
}
</style>
