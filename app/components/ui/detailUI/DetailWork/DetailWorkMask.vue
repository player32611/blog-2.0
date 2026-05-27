<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { DetailWorkMaskInstance } from "~/types/components";

gsap.registerPlugin(ScrollTrigger);

const maskRef = ref<HTMLDivElement | null>(null);
const activeAnim = ref<gsap.core.Timeline | null>(null);

const triggerAnim = (onComplete: () => void) => {
	if (activeAnim.value) return;
	activeAnim.value = gsap
		.timeline()
		.set(maskRef.value, { clipPath: "polygon(0 0, 0 0, 0 0, 0 0)" })
		.to(maskRef.value, {
			clipPath: "polygon(0 0, 200% 0, 100% 100%, 0 200%)",
			duration: 1,
			ease: "power1.out",
			onComplete,
		})
		.to(maskRef.value, {
			clipPath: "polygon(100% 100%, 200% 0, 100% 100%, 0 200%)",
			duration: 1,
			ease: "power1.out",
			onComplete: () => {
				activeAnim.value?.kill();
				activeAnim.value = null;
			},
		});
};

defineExpose<DetailWorkMaskInstance>({
	triggerAnim,
});
</script>

<template>
	<div class="work_mask" ref="maskRef"></div>
</template>

<style scoped lang="scss">
.work_mask {
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100%;
	background-color: red;
	clip-path: polygon(0 0, 0 0, 0 0, 0 0);
}
</style>
